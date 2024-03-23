import Card from "../Card/Card";



const TaskLayout = () => {
    return (
        <div className="border-2 border-white p-4 rounded-lg h-96 m-6">
           <div className="flex justify-between my-2">
            <div>
            <p>Filter By :</p>
            </div>
            <div className="bg-blue-900 text-white px-10 py-2 rounded-md">
                Add New Task
            </div>
            
           </div>
           <p className="to-blue-950">Sort By :</p>

           <div className="grid grid-cols-5 text-white mt-4 gap-4">
            <Card color={'bg-gray-400'} title={'Pending'}></Card>
            <Card color={'bg-yellow-600'} title={'In progress'}/>
            <Card color={'bg-green-500'} title={'Completed'}/>
            <Card color={'bg-blue-950'} title={'Deployed'}/>
            <Card color={'bg-red-300'} title={'Deferred'}/>
           </div>
        </div>
    );
};

export default TaskLayout;