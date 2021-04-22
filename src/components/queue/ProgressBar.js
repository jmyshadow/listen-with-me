import React, { useState, useEffect } from "react";

export default function ProgressBar({ nowPlaying, paused, player, socket }) {
  const [percent, setPercent] = useState(null);

  useEffect(() => {
    if (!nowPlaying) return;
    let position = nowPlaying.position;
    let duration = nowPlaying.duration;
    let progress = (position / duration).toFixed(3) * 100;

    setPercent(progress);
    const timer = setInterval(() => {
      if (!paused) {
        progress = ((position += 1000) / duration).toFixed(3) * 100;
        setPercent(progress);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [nowPlaying, paused, setPercent]);

  function seekTrack(e) {
    const seek = Math.floor(
      (e.clientX / e.target.clientWidth) * nowPlaying.duration
    );

    player.seek(seek);
    socket.emit("seek", seek);
  }
  useEffect(() => {
    socket.on("allSeek", (seek) => player.seek(seek));
  }, [player, socket]);

  return (
    <div onClick={(e) => seekTrack(e)} style={{ width: "100%", zIndex: 200 }}>
      <div
        className='trackBar'
        style={{ backgroundColor: "white", width: "100%" }}
      >
        {" "}
      </div>
      <div
        className='trackBar progressBar'
        style={{ backgroundColor: "green", width: `${percent}%`, zIndex: 100 }}
      >
        {" "}
      </div>
    </div>
  );
}
