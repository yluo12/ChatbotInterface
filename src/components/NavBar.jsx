import React, { useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignInButton from "./SignInButton";

const NavBar = () => {
  const [user] = useAuthState(auth);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className="nav-bar">
      <h1>Akidev</h1>
      {user ? (
        <button onClick={signOut} className="btn btn-sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <SignInButton />
      )}
    </nav>
  );
};
export default NavBar;