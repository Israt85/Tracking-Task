import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useTasks = () => {
    const {user} = useContext(AuthContext)
    const { data: tasks, refetch } = useQuery({
        queryKey: ['task'],
        queryFn: async () => {
            const res = await axios.get(`https://tracking-task-server.vercel.app/tracking?email=${user.email}`)
            console.log(res.data)
            return(res.data)
    
        }
    })
    return [tasks,refetch]
};

export default useTasks;