import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [showfinished, setshowfinished] = useState(true)
  const [todos, settodos] = useState([])

  const savetols = ()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  
 useEffect(() => {
   let todostring = localStorage.getItem("todos")
   if(todostring){
    let ts = JSON.parse(localStorage.getItem("todos"))
    settodos(ts)
   }
 },[])

 useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);
 
  
  const handleclick = (e)=>{
    settodo(e.target.value)
  }

  const handleedit =(e,id)=>{
  let t = todos.filter(item=>{
    return item.id==id
  })
  settodo(t[0].todo)
  let newtodos = todos.filter(item=>{
    return item.id!==id
  })
  settodos(newtodos)
  savetols()
  }

  const handleAdd = () =>{
    settodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    settodo("")
    savetols()
  }
  const handleline =(e) => {
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id==id
    })
    let newtodos = [...todos]
    newtodos[index].isCompleted = !(newtodos[index].isCompleted) 
    settodos(newtodos)
    savetols() 
  }
  const handledelete= (e,id)=> {
    let newtodos = todos.filter(item=>{
      return item.id!==id
    })
    settodos(newtodos)
    savetols()
  }
  
  

  return (
    <>
    <Navbar/>
     <div className="md:container md:mx-auto bg-violet-100 p-5 my-5 rounded-xl md:w-[35%] w-full">
        <h1 className='text-2xl font-bold text-center'>iTask - Manage your todos at one place</h1>
        <div className="addtodo my-3 flex flex-col  gap-4 items-start">
        <h2 className='text-base font-bold'>Add a Todo</h2>
        <div className="flex w-full">
        <input className='w-full rounded-full px-5 py-1' onChange={handleclick} type="text" value={todo}/>
        <button className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet px-4 py-1 text-sm font-bold text-white rounded-full mx-2' onClick={handleAdd} disabled={todo.length<=3}>Save</button>
        </div>
        </div>
        <input className='mt-3 mb-2' type="checkbox" id='show' checked={showfinished} onChange={()=>{setshowfinished(!showfinished)}}/> <label For="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-1'></div>
        <h2 className='text-base font-bold my-1'>Your todos</h2>
        <div className="todos">
          {todos.length ==0 && <div>No todos to display</div>}
         {todos.map(item=>{
           return (showfinished || !item.isCompleted) &&<div key={item.id} className="todo flex justify-between w-full my-1">
            <div className='flex gap-2 text-sm items-center'>
            <input type="checkbox" onChange={handleline} checked={item.isCompleted} name={item.id} />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex">
             <button className='bg-violet-800 hover:bg-violet-950 px-2 h-6 text-sm font-bold text-white rounded-md mx-1' name={item.id} onClick={(e)=>{handleedit(e,item.id)}}><FaEdit/></button>
             <button className='bg-violet-800 hover:bg-violet-950 px-2 h-6 text-sm font-bold text-white rounded-md mx-1' name={item.id} onClick={(e)=>{handledelete(e,item.id)}}><MdDelete /></button>
             </div>             
           </div>
            
         })}
        </div>
     </div>
    </>
  )
  
}

export default App
