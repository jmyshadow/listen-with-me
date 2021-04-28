import React, { useState, useRef, useEffect } from "react";
import ChatHistory from "./ChatHistory";
import { InputGroup, FormControl, Button } from "react-bootstrap";

export default function Chat({ user, socket }) {
  const [msg, setMsg] = useState("");
  const [chatHist, setChatHist] = useState([]);
  const chatInput = useRef(null);

  function sendMessage() {
    setChatHist([...chatHist, ` ${user}: ${msg}`]);
    setMsg("");
    chatInput.current.focus();
    socket.emit("newMsg", user, msg);
  }

  function handleText(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      sendMessage();
    }
  }
  useEffect(() => {
    socket.on("getNewMsg", (otherUser, msg) => {
      setChatHist([...chatHist, `${otherUser}: ${msg}`]);
    });

    socket.on("otherUserJoined", (otherUser) => {
      setChatHist([...chatHist, `${otherUser} joined the session`]);
    });

    return () => {
      socket.off("getNewMsg");
      socket.off("otherUserJoined");
    };
  });

  return (
    <div className='side-bar bg-dark d-flex flex-column w-25'>
      <ChatHistory chatHist={chatHist} />
      <InputGroup className='px-2 pb-3'>
        <FormControl
          placeholder='Enter Message'
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => handleText(e)}
          ref={chatInput}
        />
        <InputGroup.Append>
          <Button
            variant='primary'
            onClick={(e) => sendMessage("")}
            disabled={msg.length === 0}
          >
            {"Send"}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
