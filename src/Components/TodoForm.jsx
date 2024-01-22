import React, { useState } from 'react'
import { useTodo } from '../contexts'

export default function TodoForm() {
  const [todo, setTodo] = useState("")
  const {addTodo} = useTodo()

  const handleChange = (e)=>{
    setTodo(e.target.value)
  }

  const add = (e)=>{
    e.preventDefault()
    if(!todo) return;
    addTodo({todo, completed:false})
    setTodo("")
  }

  return (
    <form className="d-flex" onSubmit={add}>
  <div className="input-group mb-3 p-2 ">
    <input type="text" className="form-control p-2" aria-label="Recipient's username" aria-describedby="button-addon2"
         placeholder='Add todo...' onChange={handleChange} value={todo} />
    <button type="submit" className="btn btn-primary" id="button-addon2"
         style={{backgroundColor:"#495057"}}>Submit</button>
  </div>
  
</form>
  )
}
// mb-3 d-flex ms-2

