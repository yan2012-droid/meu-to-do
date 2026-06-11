import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Tarefa {
  id: string;
  user_id: string;
  titulo: string;
  status: string;
  created_at: string;
}

/**
 * Centraliza a lógica de tarefas: listagem, criação,
 * atualização de status e exclusão.
 * O RLS do Supabase garante que cada usuário só acessa as próprias tarefas.
 */
export const useTarefas = () => {
  const queryClient = useQueryClient();

  // LISTAGEM — sem filtro por user_id no código: o RLS já filtra
  const {
    data: tarefas = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tarefas"],
    queryFn: async (): Promise<Tarefa[]> => {
      const { data, error } = await supabase
        .from("tarefas")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data ?? [];
    },
  });

  // CRIAÇÃO — não envia user_id (preenchido pelo default auth.uid() no banco)
  const createMutation = useMutation({
    mutationFn: async (titulo: string) => {
      const { error } = await supabase.from("tarefas").insert({ titulo });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      toast.success("Tarefa criada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao criar tarefa: ${error.message}`);
    },
  });

  // ATUALIZAÇÃO DE STATUS
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("tarefas")
        .update({ status })
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      toast.success("Status atualizado!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar status: ${error.message}`);
    },
  });

  // EXCLUSÃO
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tarefas").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      toast.success("Tarefa excluída!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao excluir tarefa: ${error.message}`);
    },
  });

  return {
    tarefas,
    isLoading,
    isError,
    error,
    createTarefa: (titulo: string) => createMutation.mutateAsync(titulo),
    updateStatus: (id: string, status: string) =>
      updateStatusMutation.mutateAsync({ id, status }),
    deleteTarefa: (id: string) => deleteMutation.mutateAsync(id),
  };
};