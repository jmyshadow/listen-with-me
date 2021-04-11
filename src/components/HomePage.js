import React, { useState, useEffect } from "react";
import MainApp from "./MainApp";
import Chat from "./chat/Chat";

export default function HomePage({ code, socket }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (!user) return;
    socket.user = user;
    socket.emit("userJoined", user);
  });

  console.log("homepage rendered");
  return (
    <div className='homepage d-flex h-100 w-100 pb-5'>
      <div className='side-bar bg-dark w-25'>links</div>
      <MainApp className='w-50' code={code} setUser={setUser} />
      <Chat user={user} socket={socket} />
    </div>
  );
}
