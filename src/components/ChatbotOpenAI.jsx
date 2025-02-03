import React, { useState } from "react";
import axios from 'axios';
import Bubble from "./Bubble";
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const ChatbotOpenAI = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {text: 'Hello! How can I assist you today?', sender: 'bot'}
  ]);

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {text: input, sender: 'user'};
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // console.log('open ai token', process.env.REACT_APP_OPEN_API_KEY);
      const data = await axios.post('https://api.openai.com/v1/chat/completions',  {model: "gpt-3.5-turbo", messages: [{ role: "user", content: input }], temperature: 0.7}, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPEN_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
      const res = data.data.choices[0].message.content;
      console.log('data from api', res);
      setMessages((prev) => [...prev, {text: res, sender: 'bot'}]);
    } catch (err) {
      console.log('Error fetching response', err);
      setMessages((prev) => [...prev, {text: 'Oops! Something went wrong. Try again.', sender: 'bot'}]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <ul>
        {messages.map((message, i) =>
          <Bubble key={i} message={message}/>)}
        {loading && <li>Bot typing...</li>}
      </ul>
      <div>
        <input
          value={input}
          onChange={inputChangeHandler}
          placeholder='Type a message...'
          disabled={loading}/>
        <button onClick={sendMessage} disabled={loading}>
          <PaperAirplaneIcon />
        </button>
      </div>
    </section>
  );
};
export default ChatbotOpenAI;