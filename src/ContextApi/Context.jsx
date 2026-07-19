import React, { createContext, useEffect, useState } from "react";
import app from "../GoogleAuth/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_BASE } from "../api";


export const AuthContext = createContext();

// Without real Firebase env vars configured on this deployment, getAuth() throws
// (auth/invalid-api-key) — and since nothing here is wrapped in an error boundary,
// an uncaught throw at module scope takes down the entire app (blank page). Falling
// back to null lets the site render in a browse-only mode instead of crashing.
let auth = null;
try {
  auth = getAuth(app);
} catch (e) {
  console.error("Firebase Auth failed to initialize — is VITE_apiKey etc. configured?", e);
}
const googleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();

const authUnavailable = () =>
  Promise.reject(new Error("Sign-in isn't configured on this deployment yet."));

export const AuthProviderAndContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [typedMail, setTypedmail] = useState(null);


  // toast notification Success
  const notifys = (x) =>
    toast.success(x, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  // toast notification Error
  const notifye = (x) =>
    toast.error(x, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });


  // useEffect for auth state change
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if(user){
        axios.post(`${API_BASE}/jwt`, {user:user.email},{withCredentials:true})
        .then((response) => {
          console.log(response);
        })
      }else{
        axios.post(`${API_BASE}/logout`,{},{withCredentials:true})
          .then((response) => {
            console.log(response);
          })
          console.log("no user");
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // password reset
  const passwordreset = (email) => {
    if (!auth) return authUnavailable();
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // update user
  const updateuser = (user) => {
    if (!auth) return authUnavailable().catch(notifye);
    setLoading(true);
    updateProfile(auth.currentUser, user)
      .then(() => {
        notifys("Profile Updated");
      })
      .catch((error) => {
        notifye(error);
      });
  };
  // signInWithGithub
  const signInWithGithub = (x, y) => {
    if (!auth) return authUnavailable().catch(notifye);
    setLoading(true);
    return signInWithPopup(auth, GithubProvider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const setCurrentUser = result.user;
        x(y.state ? y.state : "/");
        notifys("Login Successfull");

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GithubAuthProvider.credentialFromError(error);

      });
  };
  //  signInWithGoogle
  const signInWithGoogle = (x, y) => {
    if (!auth) return authUnavailable().catch(notifye);
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const setCurrentUser = result.user;
        x(y.state ? y.state : "/");
        notifys("Login Successfull");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  //  signInWithGoogle
  const signIn = (email, password) => {
    if (!auth) return authUnavailable();
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // create user with email and password
  const signUp = (x, y) => {
    if (!auth) return authUnavailable();
    setLoading(true);
    return createUserWithEmailAndPassword(auth, x, y);
  };

  // sign out
  const SignOut = (x) => {
    if (!auth) return authUnavailable().catch(() => {
      setCurrentUser(null);
      x("/login");
    });
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setCurrentUser(null);
        x("/login");
      })
  }


  const value = {
    currentUser,
    loading,
    setCurrentUser,
    signIn,
    signUp,
    SignOut,
    signInWithGoogle,
    updateuser,
    passwordreset,
    notifys,
    notifye,
    setTypedmail,
    typedMail,
    signInWithGithub,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};
