import React from "react";

export default function SongTime({ milli }) {
  function milToMin(milli) {
    //leaving hour as number for truthy check
    const hour = Math.floor((milli / 3600000) % 24);
    const min = Math.floor((milli / 60000) % 60).toString();
    const sec = Math.ceil((milli / 100) % 60).toString();

    if (hour)
      return `${hour}:${min.length === 1 ? "0" + min : min}:${
        sec.length === 1 ? "0" + sec : sec
      }`;
    else return `${min}:${sec.length === 1 ? "0" + sec : sec}`;
  }

  return <>{milToMin(milli)}</>;
}
