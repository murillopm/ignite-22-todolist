interface TasksProgressProps {
  totalTasks: number;
  completedTasks: number;
}

export function ProgressBar({ totalTasks, completedTasks }: TasksProgressProps) {
  return (
    <div className={`flex items-center justify-between pb-6 ${totalTasks === 0 ? 'border-b border-b-gray-500' : ''}`}>
      <div className="flex items-center gap-2">
        <span className="font-bold text-sm text-brand-blue">
          Tarefas criadas
        </span>
        <span className="text-gray-200 text-[12px] font-bold px-2 bg-gray-400 rounded-full">
          {totalTasks}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-bold text-sm text-brand-purple">
          Concluídas
        </span>
        <span className="text-gray-200 text-[12px] font-bold px-2 bg-gray-400 rounded-full">
          {totalTasks > 0 
            ? `${completedTasks} de ${totalTasks}` 
            : '0' 
          }
        </span>
      </div>
    </div>
  )
}