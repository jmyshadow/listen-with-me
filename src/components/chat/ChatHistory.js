import React from "react";

export default function ChatHistory({ chatHist }) {
  return (
    <div className='h-100 chatbox bg-white mx-2 my-2 rounded'>
      {chatHist.map((msg) => (
        <div> {msg} </div>
      ))}
    </div>
  );
}
