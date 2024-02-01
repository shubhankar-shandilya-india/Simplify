 import { useState ,useEffect} from 'react';
import './App.css';
import { AiOutlinePlus } from 'react-icons/ai'
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { Todo } from './Todo';
import {db} from './firebase'
import {query,collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'
import { DarkTheme } from './darkmode';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //Dark theme context
  const {dark,setDark} = DarkTheme()
  const style = {
   bg: `h-screen w-screen p-4 bg-${dark?'[#FFFFD2]':'[#000000]'}`,
   container:  `bg-${dark?'[#C5FAD5]':'[#4B5563]'} max-w-[500px] w-full m-auto rounded-md`,
   heading: `text-3xl text-center font-bold text-${dark?'gray-800':'[#FFFFFF]'} p-4`,
   form: 'p-4 flex justify-around gap-[10px] h-[70px]',
   input: `w-full rounded-md ${dark?'':'bg-[#000000] text-[#FFFFFF]'}`, 
   button: 'bg-[#AA96DA] hover:bg-[#FFFFD2] rounded-md w-[40px] flex items-center justify-center',
   toggleButton:`text-2xl ${dark?'bg-[#AA96DA]':'text-[#FFFFFF] bg-[#000]'}   hover:bg-[#AA96DA] hover:text-yellow-200 rounded-full w-8 m-3  p-1 `,
   count:`text-center  p-2 text-${dark?'':'[#FFFFFF]'}`,
   ul: 'overflow-auto max-h-[65vh]',

};

  const switchTheme = ()=>{
    setDark(!dark)
  }

  //create todo
  const createTodo = async(e)=>{
    e.preventDefault(e)
    if(input===''){
      alert('enter a valid Goal')
      return
    }
    await addDoc(collection(db,'simplify'),{
      text:input,
      completed:false,
    })
    setInput('');
  }
  //read todo
  useEffect(() => {
    const q = query(collection(db, 'simplify'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);
  //update todo
  const toggleComplete = async (todo)=>{
    await updateDoc(doc(db,'simplify', todo.id),{
      completed : !todo.completed
    })
  }
  //delete todo
  const deleteTodo = async (id)=>{
    await deleteDoc(doc(db, 'simplify',id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className='flex justify-end'>
        <button className={style.toggleButton} onClick={switchTheme}>{dark?<IoMdSunny/>:<FaMoon/>}</button>
        </div>
        <h3 className={style.heading}>Simplify</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input value={input} onChange={(e)=>setInput(e.target.value)} className={style.input} type="text" name="" id="" placeholder='Add your Goals' />
          <button className={style.button} ><AiOutlinePlus size = {30} /></button>
        </form>
        <ul className={style.ul}>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
          ))}
        </ul>
        {todos.length<1? null: <p className={style.count}>{`You have ${todos.length} Todos`}</p>}
      </div>
    </div>
  );
}

export default App;
