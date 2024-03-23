import Home from "../Layout/Home/Home";
import TaskLayout from "../Layout/TaskLayout/TaskLayout";

const MainLayout = () => {
    return (
       <div className="w-full min-h-screen  bg-pink-100">
        <Home/>
        <TaskLayout/>
       </div>
    );
};

export default MainLayout;