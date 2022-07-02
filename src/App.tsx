import { useState } from "react"
import { v4 as uuid } from "uuid"
import { CheckCircle, Circle, PlusCircle, Trash } from "phosphor-react"

import { Logo } from "./components/Logo"
import { ClipboardIcon } from "./components/ClipboardIcon"

enum UncheckedBoxWeight {
  default = 'bold',
  hover = 'duotone'
}

enum CheckedBoxBackgroundColor {
  default = '#5E60CE',
  hover = '#8284FA'
}

type Task = {
  id: string;
  description: string;
  isCompleted: boolean;
}

function App() {
  const [uncheckedBoxWeightState, setUncheckedBoxWeightState] = useState<UncheckedBoxWeight>(UncheckedBoxWeight.default)
  const [checkedBoxBgColorState, setCheckedBoxBgColorState] = useState<CheckedBoxBackgroundColor>(CheckedBoxBackgroundColor.default)
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const numberOfCompletedTasks = tasks.filter(task => task.isCompleted).length

  function handleAddNewTask() {
    setTasks([...tasks, { id: uuid(), description: newTask, isCompleted: false }])
    setNewTask('')
  }

  function handleCheckboxHoverState(isCompleted: boolean) {
    if(isCompleted) {
      if(checkedBoxBgColorState === CheckedBoxBackgroundColor.default) {
        setCheckedBoxBgColorState(CheckedBoxBackgroundColor.hover)
      } else {
        setCheckedBoxBgColorState(CheckedBoxBackgroundColor.default)
      }
    } else {
      if(uncheckedBoxWeightState === UncheckedBoxWeight.default) {
        setUncheckedBoxWeightState(UncheckedBoxWeight.hover)
      } else {
        setUncheckedBoxWeightState(UncheckedBoxWeight.default)
      }
    }
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
                            onMouseEnter={() => handleCheckboxHoverState(task.isCompleted)}
                            onMouseLeave={() => handleCheckboxHoverState(task.isCompleted)}
                            onClick={() => handleCheckboxClick(task.id)}
                          >
                            <CheckCircle size={24} color={checkedBoxBgColorState} weight="fill"/>
                          </button>
                        ) : (
                          <button
                            onMouseEnter={() => handleCheckboxHoverState(task.isCompleted)}
                            onMouseLeave={() => handleCheckboxHoverState(task.isCompleted)}
                            onClick={() => handleCheckboxClick(task.id)}
                          >
                            <Circle size={24} color="#4EA8DE" weight={uncheckedBoxWeightState} />
                          </button>
                        )}
                      </>

                      <p className="flex-1 text-sm text-gray-100 text-justify">{task.description}</p>

                      <button className="p-[2px] hover:rounded-[4px] hover:bg-gray-400">
                        <Trash size={24} color="#808080" />
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

