type Task = {
  id: string;
  description: string;
  isCompleted: boolean;
}

interface TaskProps {
  task: Task;
  handleCheckboxClick: (id: string) => void;
  deleteTask: (id: string) => void;
}

export function Task({ task, handleCheckboxClick, deleteTask }: TaskProps) {
  return (
    <div className="w-full p-4 rounded-lg bg-gray-500 min-h-[72px] flex gap-3 items-center">
      <button 
        onClick={() => handleCheckboxClick(task.id)}
        className="flex items-center justify-center"
      >
        <i 
          className={
            `text-2xl ${!task.isCompleted ? 
            'ph-circle-bold text-2xl text-brand-blue hover:text-brand-blue-dark' : 
            'ph-check-circle-fill text-brand-purple-dark hover:text-brand-purple'}`
          }
        />
      </button>

      <p className={`flex-1 text-sm text-justify ${task.isCompleted ? 'text-gray-300 line-through' : 'text-gray-100'}`}>
        {task.description}
      </p>

      <button 
        className="group p-[3px] flex items-center justify-center rounded-[4px] hover:bg-gray-400"
        onClick={() => deleteTask(task.id)}
      >
        <i className="ph-trash-bold text-2xl text-gray-300 group-hover:text-brand-danger" />
      </button>
    </div>
  )
}