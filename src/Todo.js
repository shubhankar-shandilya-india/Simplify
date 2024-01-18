import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'
const style={
    li: 'bg-[#AA96DA] rounded-md flex justify-between p-4 m-4',
    licompleted: 'bg-[#AA96DA] brightness-50 rounded-md flex justify-between p-4 m-4',
    row: 'flex gap-[10px]',
    textcompleted: 'ml-2 cursor-pointer line-through',
}
export const Todo = ({todo, toggleComplete, deleteTodo}) => {
  return (
    <li className={todo.completed?style.licompleted:style.li}>
        <div className={style.row}>
            <input onChange={()=>toggleComplete(todo)} type="checkbox" checked = {todo.completed} />
            <p onClick={()=>toggleComplete(todo)} className={todo.completed?style.textcompleted:style.text}>{todo.text}</p>
        </div>
        <button onClick={()=>deleteTodo(todo.id)}>{<FaRegTrashAlt/>}</button>
    </li>
  )
}
