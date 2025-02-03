import React, { useState } from "react";
import SignInButton from "./SignInButton";

const Welcome = () => {


  return (
    <section className="welcome">
      <h2>Welcome to Akidev Chatbot</h2>
      <p>Sign in with Google to find help with the following topics: </p>
      <ul>
        <li>Customer Support</li>
        <li>Account Management</li>
        <li>Billing Enquiries</li>
        <li>Meal Suggestions</li>
        <li>Food Processor</li>
      </ul>
      <SignInButton />
    </section>
  );
};
export default Welcome;