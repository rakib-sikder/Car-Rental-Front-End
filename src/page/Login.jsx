import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FaGithubSquare } from 'react-icons/fa';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { AuthContext } from '../ContextApi/Context';

const Login = () => {
  const { signInWithGithub, signInWithGoogle, signIn, setTypedmail, notifys, notifye } = useContext(AuthContext);

  const navigate = useNavigate();
  const ref =useRef()
  const[showPassword,setShowPassword]=useState(false)
  const clickfuntion = (e) => {
    setTypedmail(ref.current.value);
  }

  const handelsubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIn(email, password)
      .then(() => {
        navigate('/');
        notifys("Login Successfull");

      })
      .catch((error) => {
        notifye("Invalid email or password");
      });
   

  };

  return (
    <div className="hero pt-20 bg-base-100 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center w-1/2 h-[400px] lg:text-left ">
                  <DotLottieReact
                    src="https://lottie.host/9f8a6bb2-5947-4f37-ac6a-b903132bdcef/SNYQAK2Tjq.lottie"
                    loop
                    autoplay
                  />
                </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="p-8 -mb-8">
            <p className="text-4xl text-center mb-5">Login</p>
            <button
              className="btn  btn-sm btn-block mb-2"
              onClick={() => {signInWithGithub(navigate,location)}}
            >
              <FaGithubSquare /> Continue With Github
            </button>
            <button
              className="btn  btn-sm btn-block"
              onClick={() => {signInWithGoogle(navigate,location)}}
            >
              <FcGoogle /> Continue With Google
            </button>
            <p>
              Don't Have an account?{" "}
              <Link to="/register">
                <span className="text-red-500 ">Register</span>
              </Link>
            </p>

            <div className="divider">or</div>
          </div>
          <form onSubmit={handelsubmit} className="card-body -mt-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"

                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                required
              />
              <p onClick={()=>{setShowPassword(!showPassword)}} className="absolute right-4 top-12 w-5 h-5 text-2xl">{showPassword ? <IoMdEye /> : <IoMdEyeOff />}</p>
              <label className="label">
                <Link to="/passwordreset" onClick={clickfuntion} className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label>
            </div>
          <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
