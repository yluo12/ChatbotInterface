import React, { useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignInButton = () => {
  const googleSignIn = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    };

  return (
    <button onClick={googleSignIn} className="btn btn-sign-in" type="button">Sign in with google</button>
  );
};
export default SignInButton;