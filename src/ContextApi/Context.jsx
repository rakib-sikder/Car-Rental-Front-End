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

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // password reset
  const passwordreset = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // update user
  const updateuser = (user) => {
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
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // create user with email and password
  const signUp = (x, y) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, x, y);
  };

  // sign out
  const SignOut = (x) => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        x("/login");
      })
      .catch((error) => {
      });
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
