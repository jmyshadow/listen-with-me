import { useState, useEffect } from "react";
import axios from "axios";

export default function useSpotifyApi(endPoint, id, accessToken) {
  const data = [];

  const [episodeData, setEpisodeData] = useState([]);
  const [showName, setShowName] = useState("");
  const [showDesc, setShowDesc] = useState("");

  useEffect(() => {
    console.log(endPoint);
    if (endPoint !== "shows") return;
    axios
      .get(`https://api.spotify.com/v1/shows/${id}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setEpisodeData(res.data.episodes.items);
        setShowName(res.data.name);
        setShowDesc(res.data.description);
        console.log(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, endPoint, accessToken]);

  return [episodeData, showName, showDesc];
}
