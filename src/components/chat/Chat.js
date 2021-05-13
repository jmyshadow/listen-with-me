import React, { useState, useRef, useEffect } from "react";
import ChatHistory from "./ChatHistory";
import { InputGroup, FormControl, Button } from "react-bootstrap";

export default function Chat({ user, socket }) {
  const [msg, setMsg] = useState("");
  const [chatHist, setChatHist] = useState([]);
  const chatInput = useRef(null);
  const resize = useRef(null);

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

  const [origWidth, setOrigWidth] = useState(0);
  const [width, setWidth] = useState(0);
  const widthChange = useRef(0);
  const mousePos = useRef(0);

  useEffect(() => {
    setOrigWidth(resize.current.clientWidth);
  }, []);

  function handleMouseMove(e) {
    mousePos.current = e.clientX;
  }

  let interval;

  function mouseDownHandler() {
    interval = setInterval(() => {
      if (
        window.innerWidth - mousePos.current >=
        resize.current.clientWidth + 10
      ) {
        widthChange.current += 10;
        setWidth(widthChange.current);
      } else if (
        window.innerWidth - mousePos.current <=
        resize.current.clientWidth - 10
      ) {
        widthChange.current -= 10;
        setWidth(widthChange.current);
      }
    }, 10);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", mouseUpHandler);
  }

  function mouseUpHandler() {
    console.log("mouseup");
    clearInterval(interval);

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", mouseUpHandler);
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          id='resizer'
          style={{
            position: "absolute",
          }}
          onMouseDown={mouseDownHandler}
        ></div>
      </div>
      <div
        ref={resize}
        className='side-bar d-flex flex-column'
        style={{
          width: `${origWidth + width}px`,
          flex: "1 0 auto",
        }}
      >
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
