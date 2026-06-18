"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Schema de validação do título da tarefa.
 */
const schema = z.object({
  titulo: z.string().min(1, "Título obrigatório"),
});

type FormData = z.infer<typeof schema>;

interface EditarTarefaDialogProps {
  /** Título atual da tarefa */
  tituloAtual: string;
  /** Id da tarefa a ser atualizada */
  id: string;
  /** Callback que recebe o novo título após confirmação */
  onSalvar: (novoTitulo: string) => Promise<void>;
}

/**
 * Dialog de edição de tarefa com 2 etapas:
 * 1️⃣ Edição do texto
 * 2️⃣ Confirmação de salvar
 *
 * Todo estado fica dentro do componente e não abre componentes externos:
 * - Falta de validação termina na tela de edição,
 * - Usuário pode "Cancelar" na confirmação para voltar à edição
 * - confirmação final chama onSalvar(id, novoTitulo) e fecha o Dialog.
 */
export const EditarTarefaDialog: React.FC<EditarTarefaDialogProps> = ({
  tituloAtual,
  id,
  onSalvar,
}) => {
  // Estado interno que controla a etapa atual
  const [etapa, setEtapa] = React.useState<"editar" | "confirmar">("editar");
  const [pendingTitulo, setPendingTitulo] = React.useState<string>(tituloAtual);
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { titulo: tituloAtual },
  });

  // Exportado pelo Dialog para abrir / fechar
  const [open, setOpen] = React.useState(false);

  // Função que migra do modo de edição para confirmação
  const iniciarConfirmacao = async (data: FormData) => {
    setPendingTitulo(data.titulo);
    setEtapa("confirmar");
  };

  // Função que confirma a alteração realmente
  const confirmarAlteracao = async () => {
    setLoading(true);
    try {
      await onSalvar(pendingTitulo);
      // Re‑inicializa estado para próximo uso
      setEtapa("editar");
      setLoading(false);
      setOpen(false);
      reset({ titulo: pendingTitulo }); // Seta o valor padrão para a próxima vez
    } catch (e) {
      setLoading(false);
      // Se precisar exibir algum erro, pode usar toast ou estado
    }
  };

  // Botão que volta para edição sem alterar dados
  const voltarParaEdicao = () => {
    setEtapa("editar");
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
          <DialogTitle>
            {etapa === "editar" ? "Editar tarefa" : "Confirmar alteração"}
          </DialogTitle>
        </DialogHeader>

        {etapa === "editar" ? (
          <form
            onSubmit={handleSubmit(iniciarConfirmacao)}
            className="space-y-4"
            onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
          >
            <div>
              <Input
                {...register("titulo")}
                placeholder="Novo título"
                disabled={loading}
              />
              {errors.titulo && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.titulo.message}
                </p>
              )}
            </div>

            <DialogFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Avançar"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm">
              Tem certeza que deseja salvar essa alteração no título da tarefa?{" "}
              <strong>{pendingTitulo}</strong>
            </p>
            <DialogFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="ghost"
                onClick={voltarParaEdicao}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={confirmarAlteracao}
                disabled={loading}
              >
                {loading ? "Confirmando..." : "Confirmar"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};