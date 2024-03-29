import axios from "axios";
// import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsThreeDotsVertical } from "react-icons/bs";
import Swal from "sweetalert2";
import useTasks from "../../Hooks/useTasks";
import { useState } from "react";


const Card = ({Title,color,displayData}) => {
  
 const [tasks,refetch]= useTasks([])
 const [editTask, setEditTask] = useState(null)
  
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // submitting the form for post
  const handleEditSubmit= (e,data) =>{ 
    e.preventDefault()
    const title = e.target.title.value;
    const description= e.target.description.value;
    const team= e.target.team.value;
    const assignee = e.target.assignee.value;
    const piority= e.target.piority.value;
    const status = e.target.status.value;

  const obj ={
    title: title,
    description:description,
    team:team,
    assignee: assignee,
    piority:piority,
    status: status
  }
  console.log(obj);
  
  axios.put(`http://localhost:3000/tracking/${data?._id}`, obj)
  .then(res=>{
  console.log(res.data)
  if(res.data.modifiedCount>0){
    Swal.fire({
      position: "top-Center",
      icon: "success",
      title: "Your task has been updated",
      showConfirmButton: false,
      timer: 1500
    });
  }
  refetch()
  })
  
  .catch(error=>{
  console.log(error);
  })

 
}


    
    const handleDelete = (user) => {
      Swal.fire({
        width:'250px',
          title: "Do you wish to delete task?",
          text: `${user?.title}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0c426e",
          cancelButtonColor: "#0c426e",
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
                      refetch()
                  })
          }
      });
  }  
    
const handleEdit = (task)=>{
 document.getElementById(`my_modal_${task._id}`).showModal()
 setEditTask(task)
}



    return (
        <div className="bg-white h-auto rounded-lg ">
            <div className={`${color} h-8 py-1 text-center rounded-ss-lg rounded-se-lg`}>
           {Title} 
           </div>
               { displayData?.map((task) => (
              // console.log(task)
                task?.status?.toLowerCase() === Title?.toLowerCase() && 
                ( <div key={task?.id} className="m-2 h-auto bg-base-200 ">
          <div className="p-2 text-black">
         <div className="flex justify-between items-center my-2 border-b-2 border-black">
         <h2 className="card-title  text-sm">
                        {task.title}
                    </h2>
                    <p className="bg-blue-900 px-1 rounded-sm text-white">{task?.priority}</p>
         </div>
            <p className="text-xs">{task?.description}</p>
            <div className="flex my-1 justify-between flex-row">
                <h2 className="text-sm">{task?.assignee}</h2>
                <h2 className="bg-blue-900 text-white p-1">
                <div className="dropdown dropdown-right">
          <div tabIndex={0}><BsThreeDotsVertical/></div>
          <ul tabIndex={0} className="dropdown-content text-black z-[1] menu p-2 bg-base-200 rounded-md font-medium w-32">
           <button className="btn" onClick={()=>handleEdit(task)}>Edit</button>
        <dialog id={`my_modal_${task._id}`} className="modal">
         <div className="modal-box rounded-none w-60 lg:w-full p-0">
          <form className="flex px-4 items-center justify-between h-10" method="dialog">
            <h2 className="font-bold">EDIT TASK</h2>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <form onSubmit={(e)=>handleEditSubmit(e,editTask)}
            className="card-body h-full text-black bg-purple-100">
                <div className=" ">
                  <label className="label w-24 ">
                    <span className="label-text">Title: </span>
                  </label>
                  <input type="text" name="title" defaultValue={editTask?.title} className="py-1 px-2 rounded-md w-full"  required />
                </div>
                <div>
                  <label className="label w-18 ">
                    <span className="label-text">Description: </span>
                  </label>
                  <input type="text" name="description" defaultValue={editTask?.description} className="py-3 px-2 rounded-md w-full" required />
                </div>
                <div>
                  <label className="label w-24 ">
                    <span className="label-text">Team: </span>
                  </label>
                  <input type="text" name="team" defaultValue={editTask?.team} className="py-1 px-2 rounded-md w-full" required />
                </div>
                <div>
                  <label className="label w-24 ">
                    <span className="label-text">Assignees: </span>
                  </label>
                  <input type="text" name="assignee" defaultValue={editTask?.
assignees} className="py-1 px-2 rounded-md w-full" required />
                </div>
              <div className="flex flex-col lg:flex-row gap-2 justify-between">
              <div className=" flex w-full gap-1">
                  <label className="label ">
                    <span className="label-text">Piority:  </span>
                  </label>
                  <select {...register("piority")} defaultValue={editTask?.priority} className="w-10 rounded-md" name="piority" id="">
                    <option value="P0">P0</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                  </select>
                  
                </div>
                <div className=" flex w-full gap-1">
                  <label className="label ">
                    <span className="label-text">Status:  </span>
                  </label>
                  <input className="border border-black rounded-lg w-20 text-center" type="text" name="status" defaultValue={editTask?.status} />
        
                  
                </div>
              </div>
        
             <div className="max-w-[content] mx-auto">
             <button className="bg-blue-800 p-2 text-white rounded-lg">Update</button>
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