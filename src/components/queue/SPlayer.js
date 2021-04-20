import React from "react";
import ProgressBar from "./ProgressBar";

export default function SPlayer({
  play,
  next,
  prev,
  nowPlaying,
  paused,
  player,
  socket,
}) {
  return (
    <div className='fixed-bottom' style={{ height: "48px" }}>
      <ProgressBar
        nowPlaying={nowPlaying}
        paused={paused}
        player={player}
        socket={socket}
      />
      <div
        className='d-flex justify-content-center'
        style={{
          position: "absolute",
          top: "8px",
          height: "40px",
          width: "100%",
        }}
      >
        {" "}
        <button
          className='btn btn-success'
          style={{ borderRadius: "50px" }}
          onClick={prev}
        >
          {" "}
          Prev{" "}
        </button>{" "}
        <button
          className='btn btn-success'
          style={{ borderRadius: "50px" }}
          onClick={play}
        >
          {" "}
          play/pause{" "}
        </button>
        <button
          className='btn btn-success'
          style={{ borderRadius: "50px" }}
          onClick={next}
        >
          {" "}
          Next{" "}
        </button>{" "}
      </div>
    </div>
  );
}
