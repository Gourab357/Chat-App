"use client";
import React, { useState } from 'react'; // Import useState from React
import { useSocket } from '../context/SocketProvider';
import classes from './page.module.css';
import { link } from 'fs';

export default function Page() {
  const { sendMessage,  messages } = useSocket();
  const [message, setMessage] = useState(""); // Initialize message state

  return (
    <div>
      {/* <div>
        <h1>All Messages will appear here!</h1>
      </div> */}
      <div>
        <input
          type="text"
          onChange={e => setMessage(e.target.value)}
          className={classes["chat-input"]}
          placeholder="Message..."
        />
        <button onClick={e => sendMessage(message)} className={classes["button"]}>
          Send
        </button>
      </div>
      <div>
      {messages.map((e) => (<li>{e}</li>)
         )}
      </div>
    </div>
  );
}
