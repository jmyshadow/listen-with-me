import React, { useEffect, useState, useRef } from "react";
import ProgressBar from "./ProgressBar";
import FASIcon from "../generic/FASIcon";
import Device from "../generic/Device";
import NowPlaying from "./NowPlaying";

export default function SPlayer({
  play,
  next,
  prev,
  muted,
  nowPlaying,
  paused,
  player,
  socket,
  searching,
  connect,
  setMuted,
  devices,
  setDevices,
}) {
  const oldVol = useRef(null);
  const [playerVol, setPlayerVol] = useState(100);

  useEffect(() => {
    if (!player) return;
    if (muted) {
      oldVol.current = playerVol;
      setPlayerVol(0);
    } else if (oldVol.current) {
      const vol = oldVol.current;
      setPlayerVol(vol);
      oldVol.current = 0;
    }
  }, [muted, player, playerVol]);

  useEffect(() => {
    if (!player) return;
    player.setVolume(playerVol / 100);
  }, [player, playerVol]);

  return (
    <div className='fixed-bottom' style={{ height: "68px", zIndex: "10000" }}>
      <ProgressBar
        nowPlaying={nowPlaying}
        paused={paused}
        player={player}
        socket={socket}
      />
      <div
        className='d-flex justify-content-center flex-nowrap'
        style={{
          position: "absolute",
          top: "8px",
          height: "60px",
          width: "100%",
        }}
      >
        <div style={{ flex: "1 1 auto", width: "100%" }}>
          {nowPlaying && searching ? (
            <NowPlaying nowPlaying={nowPlaying} mini={true} />
          ) : null}
        </div>
        <div
          style={{
            flex: "1 1 auto",
            width: "100%",
            display: "flex",
            justifyContent: "center",
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
            iClass={`rounded-circle text-center player-button fas ${
              paused ? "fa-play" : "fa-pause"
            }`}
            iFunction={play}
            iStyle={{
              padding: `12px ${paused ? "0" : "5px"} 0px 4px`,
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

        <div
          className='w-100 d-flex align-items-center'
          style={{
            display: "flex",
            flex: "1 1 auto",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <FASIcon
            iClass={"clickable rounded-circle text-center fas fa-tv"}
            iFunction={connect}
            iStyle={{
              height: "45px",
              width: "45px",
              marginTop: "25px",
              fontSize: "20px",
            }}
          />
          <div className='position-relative'>
            {devices.length > 0 ? (
              <>
                <div
                  style={{
                    position: "absolute",
                    padding: "0 1em",
                    right: "-15px",
                    bottom: "38px",
                    whiteSpace: "nowrap",
                    // bottom: `38px`,
                    backgroundColor: "#1db954",
                    borderRadisu: "10px",
                    // color: "black",
                    // borderRadius: "10px 10px 0 0 ",
                    // transition: "all .8s ease-out",
                    // transform: `translateY(${devices.length === 0 ? "100%" : 0})`,
                  }}
                >
                  {devices.map((device) => (
                    <Device device={device} setDevices={setDevices} />
                  ))}
                </div>
                <div
                  style={{
                    width: 0,
                    height: 0,
                    position: "absolute",
                    right: "33px",
                    bottom: "15px",
                    borderLeft: "20px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: "25px solid #1db954",
                  }}
                ></div>
              </>
            ) : null}
          </div>
          <FASIcon
            iClass={`clickable rounded-circle text-center fas ${
              muted
                ? "fa-volume-mute"
                : playerVol < 50
                ? "fa-volume-down"
                : "fa-volume-up"
            }`}
            iFunction={() => setMuted(!muted)}
            iStyle={{
              paddingLeft: "10px",
              height: "45px",
              width: "45px",
              marginTop: "25px",
              fontSize: "20px",
            }}
          />
          <div className='px-3 w-50 d-flex align-items-center'>
            <input
              type='range'
              min='1'
              max='100'
              value={playerVol}
              className='vol-slider'
              onInput={(e) => setPlayerVol(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
