import { useState } from "react"

import { Header } from "./components/Header"
import { TaskCreator } from "./components/TaskCreator"
import { ProgressBar } from "./components/ProgressBar"
import { ClipboardIcon } from "./components/ClipboardIcon"
import { Task } from "./components/Task"

type Task = {
  id: string;
  description: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const numberOfCompletedTasks = tasks.filter(task => task.isCompleted).length

  function handleAddTask(task: Task) {
    setTasks([...tasks, task])
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
      <Header />
      <main className="h-[calc(100vh-200px)] max-w-[736px] mx-auto flex flex-col">
        <TaskCreator addTask={handleAddTask}/>
        <section className="w-full mt-16">
          <ProgressBar totalTasks={tasks.length} completedTasks={numberOfCompletedTasks}/>

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
                  <Task 
                    key={task.id} 
                    task={task}
                    handleCheckboxClick={handleCheckboxClick}
                    deleteTask={handleDeleteTask}
                  />
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

