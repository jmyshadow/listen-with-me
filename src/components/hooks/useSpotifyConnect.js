import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(accessToken) {
  const [player, setPlayer] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    console.log("spotify useeffect running");
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
        .catch(() => console.log("no song in queue"));
    });

    spotify.addListener(
      "player_state_changed",
      ({ position, duration, track_window, paused, context }) => {
        setPaused(paused);
        setNowPlaying({ position, duration, track_window });
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
  }, [accessToken, setNowPlaying, player]);

  return { player, nowPlaying, paused };
}
