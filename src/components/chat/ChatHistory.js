import React, { useRef, useEffect } from "react";

export default function ChatHistory({ chatHist }) {
  const chatBox = useRef(null);

  useEffect(() => {
    if (
      chatBox.current.scrollHeight >=
      chatBox.current.scrollTop + chatBox.current.clientHeight
    )
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    function scrollEffect(e) {
      e.target.classList.remove("disable-scrollbars");

      setTimeout(() => {
        e.target.classList.add("disable-scrollbars");
      }, 1000);
    }

    chatBox.current.addEventListener("scroll", scrollEffect);

    return () => {
      chatBox.current.removeEventListener("scroll", scrollEffect);
    };
  });

  return (
    <div
      ref={chatBox}
      className='h-100 chatbox bg-white mx-2 my-2 rounded disable-scrollbars'
    >
      {chatHist.map((msg) => (
        <div> {msg} </div>
      ))}
    </div>
  );
}
