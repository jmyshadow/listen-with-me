import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SPlayer({ accessToken, setNowPlaying }) {
  const [player, setPlayer] = useState(null);
  const [devId, setDevId] = useState("");

  useEffect(() => {
    if (!accessToken) return;
    const spotify = new window.Spotify.Player({
      name: "Listen With Me",
      getOAuthToken: (callback) => {
        callback(accessToken);
      },
      volume: 1,
    });

    spotify.addListener("ready", ({ device_id }) => {
      console.log("Connected with Device ID", device_id);

      setDevId(device_id);

      axios.put(
        `https://api.spotify.com/v1/me/player`,
        { device_ids: [device_id] },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
    });

    spotify.addListener(
      "player_state_changed",
      ({ position, duration, track_window }) => {
        console.log("Currently Playing", track_window);
        console.log("Position in Song", position);
        console.log("Duration of Song", duration);

        setNowPlaying(track_window);
      }
    );

    spotify
      .connect()
      .then((success) => {
        if (success) console.log("connected");
      })
      .catch((err) => {
        console.log(err);
      });

    setPlayer(spotify);
  }, [accessToken, setNowPlaying]);

  function playSong() {
    player.togglePlay();
  }

  function prevSong() {
    player.previousTrack().then(() => {
      console.log("Set to previous track!");
    });
  }

  function nextSong() {
    player.nextTrack().then(() => {
      console.log("Skipped to next track!");
    });
  }
  // function queueSong() {
  //   console.log(devId);
  //   axios({
  //     method: "put",
  //     url: "https://api.spotify.com/v1/me/player/play",
  //     params: {
  //       device_id: devId,
  //     },
  //     headers: {
  //       Authorization: "Bearer " + accessToken,
  //     },
  //     data: {
  //       uris: [
  //         "spotify:track:7lPN2DXiMsVn7XUKtOW1CS",
  //         "spotify:track:2Zy7XVdxyZQB8xp5xbpJdl",
  //         "spotify:track:285pBltuF7vW8TeWk8hdRR",
  //         "spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
  //       ],
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  return (
    <div className='fixed-bottom' style={{ height: "48px" }}>
      <div style={{ backgroundColor: "white", height: "8px" }}> </div>
      <div className='d-flex' style={{ height: "40px" }}>
        {" "}
        <button
          className='btn btn-success'
          style={{ borderRadius: "50px" }}
          onClick={prevSong}
        >
          {" "}
          Prev{" "}
        </button>{" "}
        <button
          className='btn btn-success'
          style={{ borderRadius: "50px" }}
          onClick={playSong}
        >
          {" "}
          play/pause{" "}
        </button>
        <button
          className='btn btn-success'
          style={{ borderRadius: "50px" }}
          onClick={nextSong}
        >
          {" "}
          Next{" "}
        </button>{" "}
      </div>
    </div>
  );
}
