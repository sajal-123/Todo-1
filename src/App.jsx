import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts';
import {TodosInput,TodosItem} from './components/index'
function App() {
    const [todos,setTodos]=useState([]);
   const addTodo=(todo)=>{
    setTodos((prev)=> [{id:Date.now(),...todo},...prev]);
   }
   const updateTodo=(id,Todo)=>{
       setTodos((prev)=> prev.map((prevTodo) => ( prevTodo.id===id ? Todo : prevTodo)))
   }
   const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>(todo.id!==id)));
   }
   const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id)?{...prevTodo,completed:!prevTodo.completed}:prevTodo))
   }
   useEffect(()=>{
     setTodos(JSON.parse(localStorage.getItem('todos')));
   },[])
   useEffect(()=>{
     localStorage.setItem('todos',JSON.stringify(todos))
   },[todos])
  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
              <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                  <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                  <div className="mb-4">
                      {/* Todo form goes here */} 
                      <TodosInput />
                  </div>
                  <div className="flex flex-wrap gap-y-3">
                      {/*Loop and Add TodoItem here */}
                      {todos.map((todo) => (
                        <div key={todo.id}
                        className='w-full'
                        >
                          <TodosItem todo={todo} />
                        </div>
                      ))}
                  </div>
              </div>
          </div>
  </TodoProvider>
  )
}

export default App
