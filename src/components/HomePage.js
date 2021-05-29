import React, { useState, useEffect, useRef } from "react";
import MainApp from "./MainApp";
import Chat from "./chat/Chat";
import io from "socket.io-client";

export default function HomePage({ code }) {
  const [user, setUser] = useState("");

  // const [room, setRoom] = useState("");
  const socket = io.connect("/");

  // useEffect(() => {
  //   if (!user) return;
  //   socket.user = user;
  //   //socket.emit("userJoined", user);
  // });

  // useEffect(() => {
  //   if (room) {
  //     console.log(room);
  //     socket.emit("userJoined", user, room);
  //   }

  //   return () => {
  //     if (room) console.log("user left");
  //   };
  // }, [room, socket, user]);

  return (
    <div
      className='homepage d-flex h-100 w-100'
      style={{ backgroundColor: "black", paddingBottom: "60px" }}
    >
      <MainApp code={code} setUser={setUser} socket={socket} user={user} />
      <Chat user={user} socket={socket} />
    </div>
  );
}
