import { useState ,useEffect} from 'react';
import './App.css';
import { AiOutlinePlus } from 'react-icons/ai'
import { Todo } from './Todo';
import {db} from './firebase'
import {query,collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'
const style = {
  bg: 'h-screen w-screen p-4 bg-[#FFFFD2]',
  container: ' bg-[#C5FAD5] max-w-[500px] w-full m-auto rounded-md',
  heading: 'text-3xl text-center font-bold text-gray-800 p-4',
  form: 'p-4 flex justify-around gap-[10px] h-[70px]',
  input: 'w-full rounded-md', 
  button: 'bg-[#AA96DA] hover:bg-[#FFFFD2] rounded-md w-[40px] flex items-center justify-center',
  count:'text-center p-2',

};
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
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
