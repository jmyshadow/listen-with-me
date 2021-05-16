import React, { useRef, useEffect } from "react";

export default function ChatHistory({ chatHist, user }) {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      chatBox.current.removeEventListener("scroll", scrollEffect);
    };
  });

  return (
    <div
      ref={chatBox}
      className='h-100 chatbox bg-secondary text-light mx-2 my-2 px-2 rounded disable-scrollbars'
    >
      {chatHist.map(([msgUser, msg]) => (
        <div>
          {msgUser === "join" ? (
            <span> {msg} </span>
          ) : (
            <>
              <span className={msgUser === user ? "myMsg" : "yourMsg"}>
                {msgUser}
              </span>{" "}
              : <span className='msgText'>{msg}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
