import React from "react";

export default function FASIcon({
  iClass = "",
  iStyle = "",
  iFunction = null,
}) {
  return <i className={iClass} style={iStyle} onClick={iFunction}></i>;
}
