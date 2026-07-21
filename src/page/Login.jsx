import { useContext, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "../ContextApi/Context";
import { AuthShell } from "../components/AuthShell";

const Login = () => {
  const { signInWithGithub, signInWithGoogle, signIn, setTypedmail, notifys, notifye } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const dest = location.state || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(e.target.email.value, e.target.password.value)
      .then(() => {
        navigate(dest);
        notifys("Signed in successfully");
      })
      .catch(() => notifye("Invalid email or password"));
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to manage your bookings and cars.">
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => signInWithGoogle(navigate, location)} className="btn btn-outline btn-sm gap-2">
          <FcGoogle className="text-lg" /> Google
        </button>
        <button onClick={() => signInWithGithub(navigate, location)} className="btn btn-outline btn-sm gap-2">
          <FaGithub className="text-lg" /> GitHub
        </button>
      </div>

      <div className="divider text-xs text-base-content/40">or with email</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-base-content/50">Email</label>
          <input ref={emailRef} type="email" name="email" required placeholder="you@email.com" className="input input-bordered w-full" />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wide text-base-content/50">Password</label>
            <Link to="/passwordreset" onClick={() => setTypedmail(emailRef.current?.value)} className="text-xs text-primary hover:underline">
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <input name="password" type={showPassword ? "text" : "password"} required placeholder="••••••••" className="input input-bordered w-full pr-11" />
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-base-content/40" aria-label="Toggle password">
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
          </div>
        </div>
        <button className="btn btn-primary w-full">Sign in</button>
      </form>

      <p className="mt-6 text-center text-sm text-base-content/60">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="font-semibold text-primary hover:underline">Create one</Link>
      </p>
    </AuthShell>
  );
};

export default Login;
