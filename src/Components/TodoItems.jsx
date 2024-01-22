import React, { useState } from 'react'
import { useTodo } from '../contexts'

export default function TodoItems({todo}) {
  
  const [isTodoEditable, setisTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const {deleteTodo, updateTodo, toggleComplete} = useTodo()

  
  const editTodo = (id) => {
     updateTodo(id, {...todo, todo: todoMsg})
     setisTodoEditable(false)
    
  };

  const toggleCompleted = (id)=>{
      toggleComplete(id)
  }

  const handleTodoMsg = (evt)=>{
      setTodoMsg(evt.target.value)
  }

  const handleEditTodo = (id)=>{
    if(todo.completed) return;
    if(isTodoEditable){
      editTodo(id)
    }else{
      setisTodoEditable(prev=> !prev)
    }
  }

  const onDelete = (id)=>{
      deleteTodo(id)
  }

  return (
    <div className="card d-flex flex-row justify-content-between align-items-center p-1 mb-2 ms-2 me-2"
       style = {{backgroundColor: todo.completed ? "#aec1ae" : "whitesmoke"}}
    >
      <div>
      <input className="form-check-input ms-2" type="checkbox" value="" checked={todo.completed} 
            onChange={()=>toggleCompleted(todo.id)} />
      
      <input className='ms-2'  type="text"  value={todoMsg} readOnly={!isTodoEditable} onChange={handleTodoMsg}
       style={{ outline:"none", textDecoration: todo.completed? "line-through": 'none', border:"none" ,
                backgroundColor: todo.completed? "#aec1ae": "transparent" }}
      />
      </div>
    <div>
    <button type="submit" className='btn  btn-outline-success  me-2' onClick={()=>handleEditTodo(todo.id)} disabled={todo.completed}>
             {isTodoEditable? "💾" : '✍🏻' }</button>
    
    <button className="btn btn-outline-danger  ps-3 pe-3" onClick={()=>onDelete(todo.id)}> X </button>
    </div>
  </div>
  )
}
