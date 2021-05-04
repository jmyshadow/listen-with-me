import { useState, useEffect } from "react";
import axios from "axios";

export default function useSpotifyConnect(accessToken) {
  const [player, setPlayer] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (player) return;
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

      axios
        .put(
          `https://api.spotify.com/v1/me/player`,
          { device_ids: [device_id] },
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .catch(() => {
          return axios.put(
            `https://api.spotify.com/v1/me/player/play`,
            {},
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
              params: {
                device_id: device_id,
              },
            }
          );
        })
        .catch(() => {
          alert("Spotify error: Transfer playback manually from Spotify");
        });
    });

    spotify.addListener("player_state_changed", (state) => {
      if (state) {
        setPaused(state.paused);
        setNowPlaying({
          position: state.position,
          duration: state.duration,
          track_window: state.track_window,
        });
      }
    });

    spotify
      .connect()
      .then((success) => {
        if (success) console.log("connected to Spotify");
      })
      .catch((err) => {
        console.log(err);
      });

    setPlayer(spotify);
  }, [accessToken, setNowPlaying, player]);

  return { player, nowPlaying, paused };
}
