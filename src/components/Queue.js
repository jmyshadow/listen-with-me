import React from "react";

export default function Queue({ playQueue }) {
  console.log("queue rendered");
  console.log(playQueue);
  return (
    <div>
      Now Playing: <br />
      {playQueue.map((entry) => entry.song + "\n")}
    </div>
  );
}
