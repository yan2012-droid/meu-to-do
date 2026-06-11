import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useTarefas } from "@/hooks/useTarefas";

const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    pendente: { label: "Pendente", classes: "bg-gray-200 text-gray-800" },
    em_andamento: {
      label: "Em Andamento",
      classes: "bg-yellow-200 text-yellow-800",
    },
    concluida: { label: "Concluída", classes: "bg-green-200 text-green-800" },
  };
  const { label, classes } = config[status] || {};
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        classes
      )}
    >
      {label}
    </span>
  );
};

export const TarefaItem = ({ tarefa }: { tarefa: any }) => {
  const { updateStatus, deleteTarefa } = useTarefas();

  const handleStatusChange = async (novoStatus: string) => {
    await updateStatus(tarefa.id, novoStatus);
  };

  const handleDelete = async () => {
    await deleteTarefa(tarefa.id);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center">
        <div className="flex-1">
          <h3 className="font-medium text-lg">{tarefa.titulo}</h3>
          <StatusBadge status={tarefa.status} />
          <p className="text-gray-500">{tarefa.created_at}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={tarefa.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="em_andamento">Em andamento</SelectItem>
              <SelectItem value="concluida">Concluída</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="h-8 text-sm"
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};
</dyad-chat-summary>
<dyad-write path="src/components/TarefaItem.tsx" description="Corrigindo Select para usar padrão shadcn/ui (SelectContent, SelectItem, etc)"> import { cn } from "@/lib/utils"; import { Button } from "@/components/ui/button"; import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; import { toast } from "sonnerie"; import { useTarefas } from "@/hooks/useTarefas"; const StatusBadge = ({ status }: { status: string }) => { const config = { pendente: { label: "Pendente", classes: "bg-gray-200 text-gray-800" }, em_andamento: { label: "Em Andamento", classes: "bg-yellow-200 text-yellow-800" }, concluida: { label: "Concluída", classes: "bg-green-200 text-green-800" }, }; const { label, classes } = config[status] || {}; return ( <span className={cn( "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", classes )} > {label} </span> ); }; export const TarefaItem = ({ tarefa }: { tarefa: any }) => { const { updateStatus, deleteTarefa } = useTarefas(); const handleStatusChange = async (novoStatus: string) => { await updateStatus(tarefa.id, novoStatus); }; const handleDelete = async () => { await deleteTarefa(tarefa.id); }; return ( <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow"> <div className="flex items-center"> <div className="flex-1"> <h3 className="font-medium text-lg">{tarefa.titulo}</h3> <StatusBadge status={tarefa.status} /> <p className="text-gray-500">{tarefa.created_at}</p> </div> <div className="flex items-center space-x-4"> <Select value={tarefa.status} onValueChange={handleStatusChange}> <SelectTrigger className="w-[150px]"> <SelectValue placeholder="Status" /> </SelectTrigger> <SelectContent> <SelectItem value="pendente">Pendente</SelectItem> <SelectItem value="em_andamento">Em andamento</SelectItem> <SelectItem value="concluida">Concluída</SelectItem> </SelectContent> </Select> <Button onClick={handleDelete} variant="destructive" className="h-8 text-sm" > Excluir </Button> </div> </div> </div> );