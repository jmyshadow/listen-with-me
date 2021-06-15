import React, { useState, useRef, useEffect } from "react";
import ChatHistory from "./ChatHistory";
import { InputGroup, FormControl, Button } from "react-bootstrap";

export default function Chat({ user, socket }) {
  const [msg, setMsg] = useState("");
  const [chatHist, setChatHist] = useState([]);
  const chatInput = useRef(null);
  const resize = useRef(null);
  // saving list of users for a 'see who is chatting ' button?
  const [usersInSession, setUsersInSession] = useState([]);

  const [width, setWidth] = useState(window.innerWidth / 4);

  function sendMessage() {
    setMsg("");
    chatInput.current.focus();
    usersInSession.length === 0
      ? setChatHist([...chatHist, ["join", "No one hears you..."]])
      : socket.emit("newMsg", msg);
  }

  function handleText(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      sendMessage();
    }
  }
  useEffect(() => {
    socket.on("getNewMsg", (user, msg) => {
      setChatHist([...chatHist, [`${user}`, `${msg}`]]);
    });

    socket.on("otherUserJoined", (id, otherUser) => {
      socket.emit("imHereToo", id);
      setUsersInSession([...usersInSession, otherUser]);
      setChatHist([...chatHist, ["join", `${otherUser} joined the session`]]);
    });

    socket.on("otherUserLeft", (otherUser) => {
      const newList = usersInSession.filter((user) => user !== otherUser);
      setUsersInSession(newList);
      setChatHist([...chatHist, ["join", `${otherUser} left the session`]]);
    });

    socket.on("currentUsers", (otherUser) => {
      setUsersInSession([...usersInSession, otherUser]);
      setChatHist([...chatHist, ["join", `${otherUser} is listening`]]);
    });

    return () => {
      socket.off("getNewMsg");
      socket.off("otherUserJoined");
      socket.off("otherUserLeft");
      socket.off("currentUsers");
    };
  });

  useEffect(() => {
    //resize functions

    function handleMouseMove(e) {
      const newWidth = window.innerWidth - e.clientX - 8;
      const maxWidth = window.innerWidth / 2;
      setWidth(newWidth < maxWidth ? newWidth : maxWidth);
    }

    function mousedownHandler(e) {
      if (e.target.id === "resizer") {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", mouseUpHandler);
      }
    }

    function mouseUpHandler() {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", mouseUpHandler);
    }

    function resizeHandler() {
      const maxWidth = window.innerWidth / 2 - 20;
      if (maxWidth < width) setWidth(maxWidth);
    }

    window.addEventListener("mousedown", mousedownHandler);
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("mousedown", mousedownHandler);
      window.removeEventListener("resize", resizeHandler);
    };
  });

  return (
    <>
      <div id='resizer' className='resizer' style={{ flex: "0 0 auto" }}></div>
      <div
        ref={resize}
        className='side-bar d-flex flex-column'
        style={{
          flex: `0 0 ${width}px`,
          paddingBottom: "8px",
        }}
      >
        <ChatHistory chatHist={chatHist} user={user} />
        <InputGroup
          className='px-2'
          style={{ position: "relative", paddingBottom: "8px" }}
        >
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
              onClick={() => sendMessage()}
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
