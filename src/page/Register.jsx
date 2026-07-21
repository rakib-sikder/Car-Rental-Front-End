import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaGithub, FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../ContextApi/Context";
import { AuthShell } from "../components/AuthShell";

const Register = () => {
  const { signInWithGoogle, signInWithGithub, signUp, notifys, notifye, setCurrentUser, updateuser } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [checks, setChecks] = useState({ len: false, upper: false, lower: false, num: false });

  const passwordCheck = (e) => {
    const v = e.target.value;
    setChecks({
      len: v.length >= 8,
      upper: /[A-Z]/.test(v),
      lower: /[a-z]/.test(v),
      num: /[0-9]/.test(v),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const password = f.get("password");
    if (!(password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password))) {
      notifye("Password must be 8+ chars with upper, lower, and a number");
      return;
    }
    signUp(f.get("email"), password)
      .then((cred) => {
        setCurrentUser(cred.user);
        updateuser({ displayName: f.get("name"), photoURL: f.get("photo") });
        navigate(location?.state || "/");
        notifys("Account created!");
      })
      .catch(() => notifye("Email already in use"));
  };

  return (
    <AuthShell title="Create your account" subtitle="Join Overdrive — book cars or list your own.">
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => signInWithGoogle(navigate, location)} className="btn btn-outline btn-sm gap-2">
          <FcGoogle className="text-lg" /> Google
        </button>
        <button onClick={() => signInWithGithub(navigate, location)} className="btn btn-outline btn-sm gap-2">
          <FaGithub className="text-lg" /> GitHub
        </button>
      </div>

      <div className="divider text-xs text-base-content/40">or with email</div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <input name="name" type="text" required placeholder="Full name" className="input input-bordered w-full" />
        <input name="photo" type="url" placeholder="Photo URL (optional)" className="input input-bordered w-full" />
        <input name="email" type="email" required placeholder="you@email.com" className="input input-bordered w-full" />
        <div className="relative">
          <input name="password" onChange={passwordCheck} type={showPassword ? "text" : "password"} required placeholder="Password" className="input input-bordered w-full pr-11" />
          <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-base-content/40" aria-label="Toggle password">
            {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
          </button>
        </div>

        <ul className="grid grid-cols-2 gap-1.5 text-xs">
          <Req ok={checks.len}>8+ characters</Req>
          <Req ok={checks.num}>A number</Req>
          <Req ok={checks.upper}>Uppercase</Req>
          <Req ok={checks.lower}>Lowercase</Req>
        </ul>

        <button className="btn btn-primary w-full">Create account</button>
        <p className="text-center text-xs text-base-content/50">
          By registering you agree to our Terms & Privacy Policy.
        </p>
      </form>

      <p className="mt-5 text-center text-sm text-base-content/60">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
};

function Req({ ok, children }) {
  return (
    <li className={`flex items-center gap-1.5 ${ok ? "text-success" : "text-base-content/40"}`}>
      <FaCheckCircle /> {children}
    </li>
  );
}

export default Register;
