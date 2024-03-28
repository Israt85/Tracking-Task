import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useTasks = () => {
    const { data: tasks, refetch } = useQuery({
        queryKey: ['task'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/tracking')
            console.log(res.data)
            return(res.data)
           
    
        }
    })
    return [tasks,refetch]
};

export default useTasks;