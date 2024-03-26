import axios from "axios";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Swal from "sweetalert2";


const Card = ({Title,color}) => {

    const [tasks, setTasks]= useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/tracking')
            .then(res =>{
               console.log(res.data)
               setTasks(res.data)}) 
            .catch(error => {
                console.log(error);
              
            })
    }, [])
    
    const handleDelete = (user) => {
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
      }).then((result) => {
          if (result.isConfirmed) {
              axios.delete(`http://localhost:3000/tracking/${user._id}`)
                  .then(res => {
                      if (res.data.deletedCount > 0) {
                          Swal.fire({
                              title: "Deleted!",
                              text: "Your file has been deleted.",
                              icon: "success"
                          })
                          
                      }
                  })
          }
      });
  }  
    
    return (
        <div className="bg-white h-auto rounded-lg ">
            <div className={`${color} h-8 py-1 text-center rounded-ss-lg rounded-se-lg`}>
           {Title} 
           </div>
           {
    tasks?.map(task => (
        task.status?.toLowerCase() === Title?.toLowerCase() && (


            <div key={task?.id} className="m-2 h-auto bg-base-200 ">
  <div className="p-2 text-black">
 <div className="flex justify-between items-center my-2 border-b-2 border-black">
 <h2 className="card-title  text-sm">
                {task.title}
            </h2>
            <span className="bg-blue-900 px-1 rounded-sm text-white">{task?.priority}</span>
 </div>
    <p className="text-xs">{task?.description}</p>
    <div className="flex my-1 justify-between flex-row">
        <h2 className="text-sm">{task?.assignee}</h2>
        <h2 className="bg-blue-900 text-white p-1">
        <div className="dropdown dropdown-right">
  <div tabIndex={0}><BsThreeDotsVertical/></div>
  <ul tabIndex={0} className="dropdown-content text-black z-[1] menu p-2 bg-base-200 rounded-md font-medium w-32">
   <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>Edit</button>
<dialog id="my_modal_4" className="modal">
 <div className="modal-box rounded-none w-full p-0">
  <form className="flex px-4 items-center justify-between h-10" method="dialog">
    <h2 className="font-bold">EDIT TASK</h2>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <form className="card-body h-full bg-purple-100">
        <div className=" ">
          <label className="label w-24 ">
            <span className="label-text">Title: </span>
          </label>
          <input type="email" className="py-1 rounded-md w-full" required />
        </div>
        <div>
          <label className="label w-18 ">
            <span className="label-text">Description: </span>
          </label>
          <input type="email" className="py-3 rounded-md w-full" required />
        </div>
        <div>
          <label className="label w-24 ">
            <span className="label-text">Team: </span>
          </label>
          <input type="email" className="py-1 rounded-md w-full" required />
        </div>
        <div>
          <label className="label w-24 ">
            <span className="label-text">Assignees: </span>
          </label>
          <input type="email" className="py-1 rounded-md w-full" required />
        </div>
      <div className="flex justify-between">
      <div className=" flex w-full gap-1">
          <label className="label ">
            <span className="label-text">Piority:  </span>
          </label>
          <select className="w-10 rounded-md" name="" id="">
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
          
        </div>
        <div className=" flex w-full gap-1">
          <label className="label ">
            <span className="label-text">Status:  </span>
          </label>
         <input className="border border-black rounded-lg w-20 text-center" type="text" defaultValue='Completed' />
          
        </div>
      </div>
        
      </form>
  </div>
</dialog>


     
   




    <li><a onClick={()=>handleDelete(task)} >Delete</a></li>
  </ul>
</div>
        </h2>
    </div>
    
    <button className="bg-blue-900 px-2 py-1 text-white rounded-lg">{task.status}</button>
  </div>
</div>
           
        )
    ))
}

        </div>
    );
};

export default Card;