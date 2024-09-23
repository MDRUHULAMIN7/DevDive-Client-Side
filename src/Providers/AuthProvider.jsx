/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";

import app from "../Firebase/Firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const gitHubAuthProvider = new GithubAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const googleSigin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const gitHubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, gitHubAuthProvider);
  };

  const updateuserprofile = (name, photo) => {
    setLoading(true);

    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(async () => {
        setLoading(false);
        await auth.currentUser.reload();
        setUser(auth.currentUser);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  const updateUser = (u) => {
    setUser(u);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const passwordResetEmail = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("effeect", currentUser);

      if (currentUser) {
        const userInfo = { email: currentUser.email };
        console.log(userInfo);
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    logout,
    updateuserprofile,
    googleSigin,
    updateUser,
    isModalOpen,
    setIsModalOpen,
    gitHubLogin,
    passwordResetEmail,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
