import React from "react";

export default function FASIcon({
  iClass = "",
  iStyle = "",
  iFunction = null,
}) {
  // also replace SPlayerButton
  return <i className={iClass} style={iStyle} onClick={iFunction}></i>;
}
