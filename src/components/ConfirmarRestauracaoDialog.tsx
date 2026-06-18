"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

/**
 * Prompt de confirmação antes de restaurar tarefa excluída.
 *
 * @param titulo - título da tarefa que será restaurada
 * @param onConfirm - callback para executar restaurarTarefa
 */
export const ConfirmarRestauracaoDialog = ({
  titulo,
  onConfirm,
}: {
  titulo: string;
  onConfirm: () => void;
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="outline" size="sm">
        Restaurar
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirmar restauração</AlertDialogTitle>
        <AlertDialogDescription>
          Tem certeza que deseja restaurar a tarefa "{titulo}"? Ela voltará para a lista de tarefas ativas.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);