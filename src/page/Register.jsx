import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AuthContext } from "../ContextApi/Context";
import {  FaCheckCircle, FaGithubSquare } from "react-icons/fa";

const Register = () => {
  const {signInWithGoogle,signInWithGithub, signUp, notifys,notifye,setCurrentUser,updateuser} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [requerment, setRequerment] = useState(false);
  const [upercase, setUpercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  // handel submit
  const handelsubmit = (e) => {
    e.preventDefault();
    const registerform = new FormData(e.target);
    const name = registerform.get("name");
    const email = registerform.get("email");
    const password = registerform.get("password");
    const photo = registerform.get("photo");
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (password.length >= requerment && hasUpperCase && hasLowerCase && hasNumber) {
      // create user with email and password
      signUp(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // update user profile
          setCurrentUser(user);
          updateuser({ displayName: name, photoURL: photo })
          navigate(location?.state ? location?.state : "/");
          notifys("Login Successfull")
        })
        .catch((error) => {
          notifye(error)
        });

      }else{
        notifye("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number")
      }




  }

          //  password check
  const passwordCheck = (e) => {
    const { value } = e.target;
    setRequerment (value.length >= 8);
    setUpercase (/[A-Z]/.test(value));
    setNumber (/[0-9]/.test(value));
    setLowercase (/[a-z]/.test(value));

  };



  return (
    <>
      <div className="hero bg-base-100 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center  w-1/2 h-[400px] lg:text-left ">
            <DotLottieReact
              src="https://lottie.host/c8a3ec6e-8789-48bc-809a-5a5ba711c4e2/ERWLJuQ1ob.lottie"
              loop
              autoplay
            />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="p-8 -mb-5">
              <p className="text-4xl text-center mb-5">Registration</p>
              <button className="btn mb-3 btn-sm btn-block"
              onClick={() => {
                signInWithGoogle(navigate, location);
              }}>
                
                <FcGoogle /> Continue With Google
              </button>
              <button
                className="btn  btn-sm btn-block mb-2"
                onClick={() => {
                  signInWithGithub(navigate, location);
                }}
              >
                <FaGithubSquare /> Continue With Github
              </button>
              <div className="divider">or</div>
            </div>
            <form
              onSubmit={(e) => {
                handelsubmit(e);
              }}
              className="card-body -mt-10"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  name="photo"
                  placeholder="www.example.com"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type={`email`}
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
                  type={showPassword ? "text" : "password"}
                  onChange={passwordCheck}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <p
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-4 top-12 w-5 h-5 text-2xl"
                >
                  {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                </p>
                <p>Your password must contain:</p>
                <ul>
                <li className={`${requerment?"text-green-500":""} flex items-center gap-1`}><FaCheckCircle />At least 8 characters</li>
                <li className={`${number?"text-green-500":""} flex items-center gap-1`}><FaCheckCircle />
                  At least one number</li>
                <li className={`${upercase?"text-green-500":""} flex items-center gap-1`}><FaCheckCircle />
                At least one uppercase letter</li>
                <li className={`${lowercase?"text-green-500":""} flex items-center gap-1`}><FaCheckCircle />
                At least one lowercase letter</li>

                </ul>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <p className="text-xs">
                By clicking the "Register" button and "Create your account",
                Agree to Terms of Service and Privacy Policy.
              </p>
              <p>
                Already Have an account?{" "}
                <Link to="/login">
                  <span className="text-red-500 ">Login</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
