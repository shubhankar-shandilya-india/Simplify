import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'
import { DarkTheme } from './darkmode'


export const Todo = ({todo, toggleComplete, deleteTodo}) => {
  const { dark } = DarkTheme()
  
  const style={
    li: `bg-${dark?'[#AA96DA]':'[#1A56DB] text-[#FFFFFF]'} rounded-md flex justify-between p-4 m-4`,
    licompleted: `bg-${dark?'[#AA96DA]':'[#1A56DB] text-[#FFFFFF]'} brightness-50 rounded-md flex justify-between p-4 m-4`,
    row: 'flex gap-[10px]',
    textcompleted: 'ml-2 cursor-pointer line-through',
  }

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
