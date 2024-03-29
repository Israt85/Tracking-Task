import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import banner from '../../assets/task1.png'
import Navbar from '../Navbar/Navbar';

const Home = () => {
    const {user}= useContext(AuthContext)
    return (
        <div>
            <Navbar></Navbar>
            <div className="w-full py-20 mx-auto h-96">
            <div className='flex flex-col lg:flex-row gap-4  lg:mx-20 mx-10 justify-center items-center'>
            <div className='mx-4'>
                <h1 className='text-xl  text-blue-900 font-bold'> Navigate Your Goals with Precision Task Management</h1>
                <p>Unleash the power of efficient task management, turning your ideas into action and transforming your to-dos into accomplishments. Elevate your daily routine, reduce stress, and make every task count with our simplified and smart approach to task management. Your journey to productivity begins here!</p>
                <div className='w-[max-content] mx-auto'>{
                      !user? <Link to='/signup'><button className='btn btn-outline bg-blue-900 text-white'>Let' Explore</button></Link> : <Link to='/'><button className='btn btn-outline bg-blue-900 text-white'>Let' Explore</button></Link>

                }
                </div>
            </div>
           <img className='w-60 h-60' src={banner} alt="" />
            </div>
        </div>
        </div>
        
    );
};

export default Home;