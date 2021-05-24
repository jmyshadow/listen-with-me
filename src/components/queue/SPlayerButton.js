import React from "react";

export default function SPlayerButton({
  icon,
  btnFunction,
  size = "45px",
  btnMargin = "7px 10px 0px",
}) {
  return (
    <i
      className={`${icon} rounded-circle text-center player-button`}
      style={{
        height: size,
        width: size,
        margin: btnMargin,
      }}
      onClick={btnFunction}
    ></i>
  );
}
