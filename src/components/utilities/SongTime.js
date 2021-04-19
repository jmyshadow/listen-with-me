import React from "react";

export default function SongTime({ milli }) {
  function milToMin(milli) {
    const min = Math.floor(milli / 60000);
    const sec = Math.ceil((milli / 60000 - min) * 60);

    return `${min}:${sec.toString().length === 1 ? "0" + sec.toString() : sec}`;
  }

  return <span>{milToMin(milli)}</span>;
}
