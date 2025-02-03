import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Bubble from "./Bubble";
import Greeting from "./Greeting";
import { ArrowUpCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';


const Chatbot = () => {
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {text: 'Hello! How can I assist you today?', sender: 'bot'}
  ]);
  const containerRef = useRef(null);

  const closeHandler = () => {
    setStarted(false);
    setInput('');
    setMessages([
      {text: 'Hello! How can I assist you today?', sender: 'bot'}
    ]);
    setLoading(false);
  };

  const inputChangeHandler = (e) => {
    console.log('change handler is invoked');
    setInput(e.target.value);
  };

  const enterKeyHandler = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // connect to LLM, wait for responses, update states
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {text: input, sender: 'user'};
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const data = await axios.post('https://mayihelp.onrender.com/conversation/4/thread_nFVS1WrTj8QUPwaN3pWsjG9Z', {customer_prompt: input}, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
      const res = data.data.message;
      console.log('data from api', res);
      setMessages((prev) => [...prev, {text: res, sender: 'bot'}]);
    } catch (err) {
      console.log('Error fetching response', err);
      setMessages((prev) => [...prev, {text: 'Oops! Something went wrong. Try again.', sender: 'bot'}]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className='chatbot'>
      <div className='chatbot-title'>
        <p>Akidev Chatbot</p>
        <XMarkIcon onClick={closeHandler} className='icon icon-close'/>
      </div>
      {!started && <Greeting setStarted={setStarted}/>}
      {started &&
        <div className='chat-page'>
          <div className='container-body'>
            <ul className='container-bubble' ref={containerRef}>
              {messages.map((message, i) =>
                <Bubble key={i} message={message} loading={loading}/>)}
            </ul>
            <div className='footer'>
              {loading && <span className='loading'>Bot typing...</span>}
              <div className='container-input'>
                <input
                  value={input}
                  onChange={inputChangeHandler}
                  onKeyDown={enterKeyHandler}
                  placeholder='Type a message...'
                  disabled={loading}/>
                <button className='btn btn-send' onClick={sendMessage} disabled={loading}>
                  <ArrowUpCircleIcon className='icon'/>
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </section>
  );
};
export default Chatbot;