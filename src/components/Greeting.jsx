import React, { useState } from "react";
import botImage from '../assets/bot.webp';

const Greeting = ({setStarted}) => {

  const startClickHandler = () => {
    setStarted(true);
  };

  return (
    <div className='container-greeting'>
      <img src={botImage} alt='bot' className='img-bot'/>
      <p>Hi, I'm Akidev chatbot. Feel free to ask me anything about the following topics:</p>
      <ul>
        <li>Customer Support</li>
        <li>Account Management</li>
        <li>Billing Enquiries</li>
        <li>Meal Suggestions</li>
        <li>Food Processor</li>
      </ul>
      <button onClick={startClickHandler} className='btn btn-start'>Start Now</button>
    </div>
  );
};
export default Greeting;