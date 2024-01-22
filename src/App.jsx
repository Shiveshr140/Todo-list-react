import {useEffect, useState} from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItems } from './Components'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo)=>{
    setTodos((prev)=>{
      return [...prev, {id: Date.now(), ...todo}]
    })
  }

  const updateTodo = (id,todo)=>{
    setTodos((prev)=>(
      prev.map((prevtodo)=>(prevtodo.id===id ? todo: prevtodo))
    ))
  }
  
  const deleteTodo = (id)=>{
    setTodos((prev)=>(
      prev.filter((item)=> item.id!== id)
    ))
  }

  const toggleComplete = (id)=>{
    setTodos((prev)=>(
      prev.map((todo)=>{
        if(todo.id === id){
          return {...todo, completed: !todo.completed}
        }
        return todo
      })
    ))
  }

///// we specified key pair to store data in localstorage
///// local storage stored data in string only and return string but array structure do not valid in string so we need JSON to preserv the structure
useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos && todos.length > 0) {
    setTodos(todos);
  }
}, []);

  //// u can use multiple useEffect
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="container w-90">
        <div className="card m-auto " style={{height:"80vh", width:"100vh"}}>
        <h1 className="text-center display-7 text-dark mb-4 mt-4 fw-bold">Manage Your Todos</h1>
        <div className="row">
          <div className="col">
             <TodoForm />
          </div>
        </div>

        <div className="row">
          <div className="col">
            {todos.map(todo=>  <TodoItems key={todo.id} todo={todo} />)}
          </div>
        </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
