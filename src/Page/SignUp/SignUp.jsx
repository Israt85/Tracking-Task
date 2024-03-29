import { useForm } from 'react-hook-form';
// import registerImg from '../../src/assets/sign.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const SignUp = () => {
  const navigate = useNavigate()
  const {createUser,userProfile,googleLogin} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
        .then(result =>{
          console.log(result.user)
          userProfile(data.name, data.photo)
          .then(() =>{
            const userInfo ={
              name: data.name,
              email : data.email
           }
           axios.post('http://localhost:3000/users', userInfo)
           .then(res =>{
            if(res.data.insertedId){
              console.log('user added');
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created succesfully",
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate('/dashboard')
          }
           })
          })
          .catch(error=>{
            console.log(error);
          })
        })
        .catch(error =>{
          console.log(error);
        })
      }
      const handleGoogle=()=>{
        googleLogin()
        .then(result =>{
            console.log(result.user);
            navigate('/dashboard')
            const userInfo ={
                name: result.user?.displayName,
                email: result.user?.email
            }
            axios.post('http://localhost:3000/users',userInfo)
            .then(res=>{
                console.log(res.data);
                
            })
        })
      }
    return (
        <div>
            <h1 className="text-5xl text-center mt-4 font-bold">Sign Up!</h1>
            <div className="hero min-h-screen">
            
  <div className="hero-content flex-col gap-10 lg:flex-row">
  
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name")} placeholder="Your name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo url</span>
          </label>
          <input type="url" {...register("photo")} placeholder="Your photo url" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password")} placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-outline text-white bg-blue-900">Sign Up</button>
          <button onClick={handleGoogle} className="btn my-2 btn-outline btn-error">
            <FcGoogle/>
  Google Login
</button>
        </div>
         <p>Already have an account? please <Link className='text-blue-900 font-bold underline' to='/login'>Sign In</Link>. </p>

      </form>
    </div>
    
    {/* <div className="text-center lg:text-left">
      <img className='w-96 h-96' src={registerImg} alt="" />
      
    </div> */}
  </div>
</div>
        </div>
    );
};

export default SignUp;