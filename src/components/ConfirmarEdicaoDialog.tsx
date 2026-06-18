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
 * Mostra um AlertDialog pedindo confirmação antes de salvar a edição.
 *
 * @param tituloAtual - título atual da tarefa para exibir na mensagem
 * @param novoTitulo - novo título a ser salvo
 * @param onConfirm - callback que deve ser executado após confirmação
 * @param onCancel - callback opcional quando o usuário cancelar
 */
export const ConfirmarEdicaoDialog = ({
  tituloAtual,
  novoTitulo,
  onConfirm,
  onCancel,
}: {
  tituloAtual: string;
  novoTitulo: string;
  onConfirm: () => void;
  onCancel?: () => void;
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="outline" size="sm">
        Editar
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirmar alteração</AlertDialogTitle>
        <AlertDialogDescription>
          Tem certeza que deseja salvar a alteração no título da tarefa "{tituloAtual}" para
          "{novoTitulo}"?
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);