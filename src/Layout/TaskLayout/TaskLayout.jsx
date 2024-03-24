import Card from "../Card/Card";



const TaskLayout = () => {
    return (
        <div className="border-2 border-white p-4 rounded-lg h-96 m-6">
           <div className="flex justify-between my-2">
            <div>
            <p>Filter By :</p>
            </div>
            <div className="bg-blue-900 text-white px-10 py-2 rounded-md">
            
<button onClick={()=>document.getElementById('my_modal_3').showModal()}>Add New Task</button>
</div>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box rounded-none w-full p-0">
    <form className="flex px-4 items-center justify-between h-10" method="dialog">
    <h2 className="font-bold">CREATE A TASK</h2>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <form className="card-body h-full bg-purple-100">
        <div className=" flex w-full gap-2 justify-between">
          <label className="label w-24 ">
            <span className="label-text">Title: </span>
          </label>
          <input type="email" className="py-1 rounded-md w-full" required />
        </div>
        <div className=" flex w-full gap-2 justify-between">
          <label className="label w-18 ">
            <span className="label-text">Description: </span>
          </label>
          <input type="email" className="py-3 rounded-md w-full" required />
        </div>
        <div className=" flex w-full gap-2 justify-between">
          <label className="label w-24 ">
            <span className="label-text">Team: </span>
          </label>
          <input type="email" className="py-1 rounded-md w-full" required />
        </div>
        <div className=" flex w-full gap-2 justify-between">
          <label className="label w-24 ">
            <span className="label-text">Assignees: </span>
          </label>
          <input type="email" className="py-1 rounded-md w-full" required />
        </div>
        <div className=" flex w-full gap-2">
          <label className="label w-20">
            <span className="label-text">Piority:  </span>
          </label>
          <select className="w-10 rounded-md" name="" id="">
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
          
        </div>
        
      </form>
  </div>
</dialog>
     
   



            
            
           </div>
           <p className="to-blue-950">Sort By :</p>

           <div className="grid grid-cols-5 text-white mt-4 gap-4">
            <Card color={'bg-gray-400'} Title={'Pending'}></Card>
            <Card color={'bg-yellow-600'} Title={'In progress'}/>
            <Card color={'bg-green-500'} Title={'completed'}/>
            <Card color={'bg-blue-950'} Title={'deployed'}/>
            <Card color={'bg-red-300'} Title={'Deferred'}/>
           </div>
        </div>
    );
};

export default TaskLayout;