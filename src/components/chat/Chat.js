import React, { useState, useRef, useEffect } from "react";
import ChatHistory from "./ChatHistory";
import { InputGroup, FormControl, Button } from "react-bootstrap";

export default function Chat({ user, socket }) {
  const [msg, setMsg] = useState("");
  const [chatHist, setChatHist] = useState([]);
  const chatInput = useRef(null);
  const resize = useRef(null);

  function sendMessage() {
    setChatHist([...chatHist, [`${user}`, `${msg}`]]);
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
      setChatHist([...chatHist, [`${otherUser}`, `${msg}`]]);
    });

    socket.on("otherUserJoined", (otherUser) => {
      setChatHist([...chatHist, ["join", `${otherUser} joined the session`]]);
    });

    return () => {
      socket.off("getNewMsg");
      socket.off("otherUserJoined");
    };
  });

  //resize functions
  const [width, setWidth] = useState(window.innerWidth / 4);

  function handleMouseMove(e) {
    const newWidth = window.innerWidth - e.clientX - 8;
    const maxWidth = window.innerWidth / 2 - 20;
    console.log(window.innerWidth);
    console.log(newWidth, maxWidth);
    setWidth(newWidth < maxWidth ? newWidth : maxWidth);
  }

  function mouseDownHandler() {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", mouseUpHandler);
  }

  function mouseUpHandler() {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", mouseUpHandler);
  }

  return (
    <>
      <div
        className='resizer'
        onMouseDown={mouseDownHandler}
        style={{ flex: "0 0 auto" }}
      ></div>

      <div
        ref={resize}
        className='side-bar d-flex flex-column'
        style={{
          flex: `0 0 ${width}px`,
        }}
      >
        <ChatHistory chatHist={chatHist} user={user} />
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
              variant='success'
              onClick={(e) => sendMessage("")}
              disabled={msg.length === 0}
            >
              {"Send"}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    </>
  );
}
