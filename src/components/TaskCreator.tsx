import { PlusCircle } from "phosphor-react";
import { useState } from "react"
import { v4 as uuid } from "uuid"

type Task = {
  id: string;
  description: string;
  isCompleted: boolean;
}

interface TaskCreatorProps {
  addTask: (task: Task) => void;
}

export function TaskCreator({ addTask }: TaskCreatorProps) {
  const [newTask, setNewTask] = useState('')
  
  function handleAddNewTask() {
    if(newTask.length === 0) return
    addTask({ id: uuid(), description: newTask, isCompleted: false })
    setNewTask('')
  }
  
  return (
    <div className="flex items-center justify-between w-full gap-2 translate-y-[-50%]">
      <input 
        type="text" 
        value={newTask}
        className="h-[54px] p-4 flex-1 bg-gray-500 rounded-lg text-base text-gray-100 font-normal placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-purple-dark"
        placeholder="Adicione uma nova tarefa"
        onChange={event => setNewTask(event.target.value)}
      />
      <button 
        className="flex justify-center p-4 items-center gap-2 w-[90px] h-[52px] bg-brand-blue-dark rounded-lg text-white text-sm font-bold hover:bg-brand-blue transition-colors"
        onClick={handleAddNewTask}
      >
        Criar
        <PlusCircle size={22} weight="bold"/>
      </button>
    </div>
  )
}