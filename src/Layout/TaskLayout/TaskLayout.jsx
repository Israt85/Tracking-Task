import axios from "axios";
import Card from "../Card/Card";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import { useState, useMemo } from "react"; // Import useState and useMemo
import useTasks from "../../Hooks/useTasks";

const TaskLayout = () => {
  const defaultDate = new Date().toISOString().slice(0, 10);
  const [tasks, refetch] = useTasks();
  const [sort, setSort] = useState('Priority'); // Initialize sort state
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Define handleSort function to update sort state
  const handleSort = (e) => {
    setSort(e.target.value);
  };

// applying useMemo
  const sortedData = useMemo(() => {
    if (sort === 'Priority') {
      return tasks;
    } else {
      return tasks.filter(task => task.priority === sort);
    }
  }, [sort, tasks]);

  console.log('sorted',sortedData);
  

  const onSubmit = (data) => {
    console.log(data)
    const obj = {
      title: data.title,
      description: data.description,
      team: data.team,
      assignees: data.assignees,
      piority: data.piority,
      startDate: data.startDate,
      endDate: null,
      status: 'Pending'
    };
    axios.post('http://localhost:3000/tracking', obj)
      .then(res => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your Task has been saved.",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(error => {
        console.log(error);
      });

    document.getElementById('my_modal_3').close();
  };

    return (
        <div className="border-2 border-white p-4 rounded-lg h-auto m-6">
           <div className="flex flex-col gap-2 lg:flex-row justify-between my-2">
            <div>
            <p className="flex flex-col lg:flex-row gap-2">Filter By :
            <div>
            <input className="w-20 ml-2 text-center" type="text" name="" id="" placeholder="Assignee"/>
            </div>
            <div>
              <select name="" id="">
                <option value="Priority">Priority</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </div>
              <div>
                <input type="date" name="" id="" />
              </div>
            </p>
           
            </div>
            <div className="bg-blue-900 text-white px-10 py-2 rounded-md">
{/* Add Task button */}
<button onClick={()=>document.getElementById('my_modal_3').showModal()}>Add New Task</button>
</div>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box rounded-none w-60 lg:w-full p-0">
    <form className="flex px-4 items-center justify-between h-10" method="dialog">
    <h2 className="font-bold">CREATE A TASK</h2>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    {/* Task form */}
    <form onSubmit={handleSubmit(onSubmit)} className="card-body h-full bg-purple-100">
        <div className=" flex flex-col lg:flex-row w-full gap-2 justify-between">
          <label className="label w-24 ">
            <span className="label-text">Title: </span>
          </label>
          <input type="text" {...register("title")} className="py-1 rounded-md w-full" required />
        </div>
        <div className=" flex flex-col lg:flex-row w-full gap-2 justify-between">
          <label className="label w-18 ">
            <span className="label-text">Description: </span>
          </label>
          <input type="text" {...register("description")} className="py-3 rounded-md w-full" required />
        </div>
        <div className=" flex flex-col lg:flex-row w-full gap-2 justify-between">
          <label className="label w-24 ">
            <span className="label-text">Team: </span>
          </label>
          <input type="text"  {...register("team")} className="py-1 rounded-md w-full" required />
        </div>
        <div className=" flex flex-col lg:flex-row w-full gap-2 justify-between">
          <label className="label w-24 ">
            <span className="label-text">Assignees: </span>
          </label>
          <input type="text"  {...register("assignees")} className="py-1 rounded-md w-full" required />
        </div>
        <div className=" flex w-full gap-2">
          <label className="label w-20">
            <span className="label-text">Piority:  </span>
          </label>
          <select {...register("piority")} className="w-10 rounded-md" name="piority" id="">
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
          
        </div>
        <input
  type="date"
  {...register("startDate")}
  defaultValue={defaultDate}
  className="py-1 rounded-md w-full"
  required
/>

        <div className="max-w-[content] mx-auto">
        <button className="btn bg-blue-600 p-2 rounded-lg text-white">Submit</button>
        </div>
        
      </form>
  </div>
</dialog>
     
   



            
            
           </div>
           <p className="flex gap-2 to-blue-950">
  Sort By :
  <div>
    <select name="" id="" onChange={handleSort} defaultValue="Priority">
      <option value="Priority">Priority</option>
      <option value="P0">P0</option>
      <option value="P1">P1</option>
      <option value="P2">P2</option>
    </select>
  </div>
</p>

          

           <div className="grid grid-cols-2 lg:grid-cols-5 text-white mt-4 gap-4">
            <Card displayData={sortedData} color={'bg-gray-400'} Title={'Pending'}></Card>
            <Card displayData={sortedData} color={'bg-yellow-600'} Title={'In progress'}/>
            <Card displayData={sortedData} color={'bg-green-500'} Title={'Completed'}/>
            <Card displayData={sortedData} color={'bg-blue-950'} Title={'Deployed'}/>
            <Card displayData={sortedData} color={'bg-red-300'} Title={'Deferred'}/>
           </div>
        </div>
    );
};

export default TaskLayout;