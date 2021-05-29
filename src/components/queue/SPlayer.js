import React from "react";
import ProgressBar from "./ProgressBar";
import FASIcon from "../generic/FASIcon";

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
        <FASIcon
          iClass={"rounded-circle text-center player-button fas fa-backward"}
          iFunction={prev}
          iStyle={{
            padding: "7px 4px 0 0",
            height: "45px",
            width: "45px",
            margin: "7px 10px 0",
          }}
        />
        <FASIcon
          iClass={`rounded-circle text-center player-button ${
            paused ? "fas fa-play" : "fas fa-pause"
          }`}
          iFunction={play}
          iStyle={{
            padding: "12px 0 0 4px",
            margin: "2px 10px 0px",
            height: "55px",
            width: "55px",
          }}
        />
        <FASIcon
          iClass={"rounded-circle text-center player-button fas fa-forward"}
          iFunction={next}
          iStyle={{
            padding: "7px 0 0 4px",
            height: "45px",
            width: "45px",
            margin: "7px 10px 0",
          }}
        />
      </div>
    </div>
  );
}
