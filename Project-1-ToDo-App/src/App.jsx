import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'


const saveTols = () => {
  let mylists = localStorage.getItem('lists');
  // console.log(mylists)
  if(mylists){
    return JSON.parse(localStorage.getItem('lists'));
  }
  else{
    return [];
  }
}


function App() {

  const [inputvalue, setinputValue] = useState("");
  const [todos, setTodos] = useState(saveTols());

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(todos));
  }, [todos])


  const handleInput = (e) => {
    setinputValue(e.target.value);
  }


  const handleClick = () => {
    if (inputvalue == "") {
      toast.error("please enter the task");
      return;
    }
    else {

      setTodos([...todos,{ inputvalue , iscompleted : false }]);
      // console.log(todos);
      setinputValue("");
      toast.success("task added successfully");
    }
  }


  const handleDelete = (index) => {
    const deleting = [...todos];
    deleting.splice(index, 1);
    setTodos(deleting);
    saveTols();
    toast.error("task deleted successfully");

  }

  const handleEdit = (index) => {
    const editing = [...todos];
    let editedtodo = prompt("edit the task");
    if (editedtodo) {
      editing[index].inputvalue = editedtodo;
      setTodos(editing);
      saveTols();
      toast.success("task edited successfully");
    }
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto my-5 rounded-xl p-3 bg-violet-200 w-3/5'>
        <div className='addtodo text-center'>
          <h1 className='font-bold text-2xl my-4 text-center'>Create your tasks</h1>
          <input className='input w-1/2 p-2 rounded-xl mx-4'
            type="text"
            placeholder='create a new task...'
            onChange={handleInput} value={inputvalue} />
          <button onClick={handleClick} className='addbtn bg-violet-400 p-2 w-20 rounded-2xl text-black text-lg hover:bg-violet-600'>Add</button>
        </div>

        <h2 className=' font-medium ml-36 my-5'>Your ToDos</h2>


        <div className="todos ml-48 ">

          {todos.map((item, index) => {

            return <div key={index} className="todo flex w-5/6 gap-10 justify-around bg-violet-300 p-1 rounded-2xl items-center m-3" >
              <input className={inputvalue.iscompleted} type="checkbox" name="" id="" />
              <div  >{item.inputvalue}</div>
              <div className="btns flex justify-center items-center ">
                <button onClick={() => {
                  handleEdit(index)
                }} className='editbtn font-semibold m-0.5 p-2 hover:bg-slate-500 rounded-xl' >Edit</button>
                <button onClick={() => {
                  handleDelete(index)
                }} className='delbtn font-semibold m-0.5 p-2 hover:bg-slate-500 rounded-xl'>Delete</button>
              </div>
            </div>
          })}
        </div>


      </div>
      <ToastContainer />
    </>
  )
}

export default App
