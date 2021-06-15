import React, { useContext } from "react";

import { TokenContext } from "../context/SpotifyContext";
import * as spotifyFetch from "../utilities/spotifyFetch.js";

export default function Device({ device, setDevices }) {
  const accessToken = useContext(TokenContext);

  const clickHandler = () => {
    spotifyFetch.setDevice(device.id, accessToken);
    setDevices([]);
  };

  return (
    <div className='py-2 font-weight-bold clickable' onClick={clickHandler}>
      {device.name}
    </div>
  );
}
