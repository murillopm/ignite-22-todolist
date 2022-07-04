import { useState } from "react"
import { v4 as uuid } from "uuid"
import { PlusCircle } from "phosphor-react"

import { Logo } from "./components/Logo"
import { ClipboardIcon } from "./components/ClipboardIcon"

type Task = {
  id: string;
  description: string;
  isCompleted: boolean;
}

function App() {
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const numberOfCompletedTasks = tasks.filter(task => task.isCompleted).length

  function handleAddNewTask() {
    setTasks([...tasks, { id: uuid(), description: newTask, isCompleted: false }])
    setNewTask('')
  }

  function handleDeleteTask(id: string) {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  function handleCheckboxClick(id: string) {
    const newTasks = tasks.map(task => {
      if(task.id !== id) {
        return task
      } else {
        return { ...task, isCompleted: !task.isCompleted }
      }
    })
    setTasks(newTasks)
  }


  return (
    <div className="h-screen w-screen">
      <header className="h-[200px] w-full bg-gray-700 flex justify-center items-center">
        <Logo />
      </header>
      <main className="h-[calc(100vh-200px)] max-w-[736px] mx-auto flex flex-col">
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
        <section className="w-full mt-16">
            <div className={`flex items-center justify-between pb-6 ${tasks.length === 0 ? 'border-b border-b-gray-500' : ''}`}>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-brand-blue">
                  Tarefas criadas
                </span>
                <span className="text-gray-200 text-[12px] font-bold px-2 bg-gray-400 rounded-full">
                  {tasks.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-brand-purple">
                  Concluídas
                </span>
                <span className="text-gray-200 text-[12px] font-bold px-2 bg-gray-400 rounded-full">
                  {tasks.length > 0 
                    ? `${numberOfCompletedTasks} de ${tasks.length}` 
                    : '0' 
                  }
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {tasks.length === 0 ? (
                <div className="w-full py-16 flex flex-col justify-center items-center gap-4">
                  <ClipboardIcon />
                  <p className="text-gray-300 text-center">
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <br/> Crie tarefas e organize seus itens a fazer
                  </p>
                </div>
              ) : (
                <>
                  {tasks.map(task => (
                    <div 
                      key={task.id}
                      className="w-full p-4 rounded-lg bg-gray-500 min-h-[72px] flex gap-3 items-center"
                    >
                      <>
                        {task.isCompleted ? (
                          <button 
                            onClick={() => handleCheckboxClick(task.id)}
                            className="flex items-center justify-center"
                          >
                            <i className="ph-check-circle-fill text-2xl text-brand-purple-dark hover:text-brand-purple" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleCheckboxClick(task.id)}
                            className="flex items-center justify-center"
                          >
                            <i className="ph-circle-bold text-2xl text-brand-blue hover:text-brand-blue-dark" />
                          </button>
                        )}
                      </>

                      <p className="flex-1 text-sm text-gray-100 text-justify">{task.description}</p>

                      <button 
                        className="group p-[3px] flex items-center justify-center rounded-[4px] hover:bg-gray-400"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <i className="ph-trash-bold text-2xl text-gray-300 group-hover:text-brand-danger" />
                      </button>
                    </div>
                  ))}                
                </>
              )}
            </div>
          </section>
      </main>
    </div>
  )
}

export default App

