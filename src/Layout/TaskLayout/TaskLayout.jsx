import axios from "axios";
import Card from "../Card/Card";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import { useState, useMemo } from "react"; // Import useState and useMemo
import useTasks from "../../Hooks/useTasks";
import DateRangeInput from "../DateRangePicker/DateRangePicker";

const TaskLayout = () => {
  const defaultDate = new Date().toISOString().slice(0, 10);
  const [tasks, refetch] = useTasks([]);
  const [sort, setSort] = useState('Priority');
  const [filterdItem, setFilterdItem] = useState("") 
  const [PriorityItem, setPriorityItem] = useState("Priority")
  const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();






  // Define handleSort function to update sort state
  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const filterdData = useMemo(() => {
    if (!filterdItem || !PriorityItem || !startDate && !endDate) {
      return tasks;
    }
  
    return tasks?.filter(task => {
      const assignee = task?.assignee;
      const priority = task?.priority;
      const taskDate = new Date(task.startDate);
      
      // Check if assignee or priority match the filter criteria
      const assigneeMatch = !filterdItem || (assignee && assignee.toLowerCase().includes(filterdItem.toLowerCase().trim()));
      const priorityMatch = !PriorityItem || (priority && priority.toLowerCase().includes(PriorityItem.toLowerCase().trim()));
      
      // Check if task falls within the specified date range
      const dateInRange = !startDate || !endDate || (taskDate >= new Date(startDate) && taskDate <= new Date(endDate));
      
   
      return assigneeMatch && priorityMatch && dateInRange;
    });
  }, [tasks, filterdItem, PriorityItem, startDate, endDate]);
  


  

// applying useMemo for sorting
const sortedData = useMemo(() => {
  if (sort === 'Priority') {
    return filterdData;
  } else {
    return [...filterdData]?.filter(task => task.priority === sort);
  }
}, [sort,filterdData]);
  

  const onSubmit = (data) => {
    console.log(data)
    const obj = {
      title: data.title,
      description: data.description,
      team: data.team,
      startDate: data.startDate,
      endDate: null,
      status: 'Pending',
      assignees: data.assignees,
      priority: data.priority,
    };
    axios.post('https://tracking-task-server.vercel.app/tracking', obj)
      .then(res => {
        console.log(res.data);
        refetch()
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
    reset()
    document.getElementById('my_modal_3').close();
  };
  const handleReset =()=>{
    const form = document.getElementById('myForm');
    if (form) {
      form.reset();
    }
  }

    return (
        <div className="border-2 border-white p-4 rounded-lg h-auto m-6">
           <div className="flex flex-col gap-2 lg:flex-row justify-between my-2">
            <div>
            <p className="flex flex-col lg:flex-row gap-2">Filter By :
            <div>
            <input
                type="text"
                name="assignee"
                value={filterdItem}
               onChange={(e) => setFilterdItem(e.target.value)}
                placeholder="Assignee"
              />
            </div>
            <div>
            <select
                name="priority"
                value={PriorityItem}
                onChange={(e) => setPriorityItem(e.target.value)}
              >
                <option value="Priority">Priority</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </div>
            <div>
  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    placeholder="Start Date (yyyy-mm-dd)"
  />
  <input
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    placeholder="End Date (yyyy-mm-dd)"
  />
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
    <form id="myForm" onSubmit={handleSubmit(onSubmit)} className="card-body h-full bg-purple-100">
        <div className=" flex flex-col lg:flex-row w-full gap-2 justify-between">
          <label className="label w-24 ">
            <span className="label-text">Title: </span>
          </label>
          <input type="text" {...register("title")} className="py-1 px-2 rounded-md w-full" required />
        </div>
        <div className=" flex flex-col lg:flex-row w-full gap-2 justify-between">
          <label className="label w-18 ">
            <span className="label-text">Description: </span>
          </label>
          <input type="text" {...register("description")} className="py-3 px-2 rounded-md w-full" required />
        </div>
        <div className=" flex flex-col lg:flex-row w-full gap-2 justify-between">
          <label className="label w-24 ">
            <span className="label-text">Team: </span>
          </label>
          <input type="text"  {...register("team")} className="py-1 px-2 rounded-md w-full" required />
        </div>
        <div className=" flex flex-col lg:flex-row w-full gap-2 justify-between">
          <label className="label w-24 ">
            <span className="label-text">Assignees: </span>
          </label>
          <input type="text"  {...register("assignees")} className="py-1 px-2 rounded-md w-full" required />
        </div>
        <div className=" flex w-full gap-2">
          <label className="label w-20">
            <span className="label-text">priority:  </span>
          </label>
          <select {...register("priority")} className="w-10 rounded-md" name="priority" id="">
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

        <div className="flex justify-end">
        <button className="btn bg-blue-600 p-2 rounded-lg text-white">Submit</button>
        <button onClick={handleReset} className="btn bg-blue-600 p-2 rounded-lg text-white">Reset</button>
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