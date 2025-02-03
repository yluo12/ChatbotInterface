import React, { useState } from "react";

  // helper function to format the text message
  const formatter = (text) => {
    const textArr = text.split(/\*\*(.*?)\*\*/g);
    return textArr.map((part, index) =>
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part);
  };

const Bubble = ({message, loading}) => {

  return (
    <li className={message.sender === 'bot' ?
      'bubble bubble-bot' : 'bubble bubble-user'}>
      {message.sender === 'bot' &&
        <div className='container-bot'>
          <span className="material-symbols-outlined">smart_toy</span>
        </div>
      }
      <pre>{formatter(message.text)}</pre>
    </li>
  );
};
export default Bubble;