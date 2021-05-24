import React from "react";
import ProgressBar from "./ProgressBar";
import SPlayerButton from "./SPlayerButton";

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
    <div className='fixed-bottom' style={{ height: "68px" }}>
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
          height: "60px",
          width: "100%",
        }}
      >
        <SPlayerButton icon={"fas fa-backward"} btnFunction={prev} />
        {/* padding: "8px 4px 0 0" */}
        <SPlayerButton
          icon={paused ? "fas fa-play" : "fas fa-pause"}
          btnFunction={play}
          size={"55px"}
          btnMargin={"2px 10px 0px"}
        />
        {/* padding: "13px 0 0 4px" */}
        <SPlayerButton icon={"fas fa-forward"} btnFunction={next} />
        {/* "padding: 8px 0 0 4px" */}
      </div>
    </div>
  );
}
