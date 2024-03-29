import empty from '../../assets/emptyicon.png'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const Home = () => {
    const navigate = useNavigate()
  const {user,userlogout} = useContext(AuthContext)
  const handlelogout = ()=>{
    userlogout()
    .then(result => {
      navigate('/signup')
      console.log(result.user);
      
    })
  }
    return (
        <div className='flex px-16 py-4 justify-between '>
        <div className="text-xl font-semibold">
        Task Board
        </div>
        <div>
        {
    user?  <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 bg-white rounded-full">
        <img src={empty}/>
      </div>
    </div>
    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 text-black rounded-box w-52">
    <Link to='/'><li><a>Home</a></li></Link>
      <li><a onClick={handlelogout}>Logout</a></li>
    </ul>
  </div> : ""
   }
        </div>

       
     </div>
    );
};

export default Home;