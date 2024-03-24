import { useEffect, useState } from "react";


const Card = ({Title,color}) => {

    const [tasks, setTasks]= useState([])
    useEffect(() => {
        fetch('/Task.json')
            .then(res => res.json()) 
            .then(data => {
                console.log(data);
                setTasks(data);
            })
    }, [])
    
    
    return (
        <div className="bg-white h-auto rounded-lg ">
            <div className={`${color} h-8 py-1 text-center rounded-ss-lg rounded-se-lg`}>
           {Title} 
           </div>
           {
    tasks?.map(task => (
        task.status.toLowerCase() === Title.toLowerCase() && (
            <h2 className="p-2 text-black" key={task.id}>
                {task.title}
            </h2>
        )
    ))
}

        </div>
    );
};

export default Card;