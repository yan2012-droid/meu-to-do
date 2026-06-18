"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  titulo: z.string().min(1, "Título obrigatório"),
});

type FormData = z.infer<typeof schema>;

interface EditarTarefaDialogProps {
  /** Título atual da tarefa */
  tituloAtual: string;
  /** Callback para salvar o novo título */
  onSalvar: (novoTitulo: string) => Promise<void>;
}

/**
 * Botão que abre um Dialog para editar o título da tarefa.
 * Exibe campo pré‑preenchido, validação via Zod e feedback de loading.
 */
export const EditarTarefaDialog: React.FC<EditarTarefaDialogProps> = ({
  tituloAtual,
  onSalvar,
}) => {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { titulo: tituloAtual },
  });

  const onSubmit = async (data: FormData) => {
    await onSalvar(data.titulo);
    setOpen(false);
    reset({ titulo: data.titulo });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register("titulo")}
              placeholder="Novo título"
              disabled={isSubmitting}
            />
            {errors.titulo && (
              <p className="text-sm text-red-500 mt-1">{errors.titulo.message}</p>
            )}
          </div>
          <DialogFooter className="flex justify-end space-x-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};