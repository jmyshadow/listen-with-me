import React, { useState, useEffect } from "react";
import MainApp from "./MainApp";
import Chat from "./chat/Chat";
import io from "socket.io-client";

export default function HomePage({ code }) {
  const [user, setUser] = useState("");
  const socket = io.connect("/");

  useEffect(() => {
    if (!user) return;
    socket.user = user;
    socket.emit("userJoined", user);
  });

  return (
    <div
      className='homepage d-flex h-100 w-100'
      style={{ backgroundColor: "black", paddingBottom: "60px" }}
    >
      <MainApp code={code} setUser={setUser} socket={socket} />
      <Chat user={user} socket={socket} />
    </div>
  );
}
