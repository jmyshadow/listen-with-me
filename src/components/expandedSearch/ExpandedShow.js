import React, { useState, useEffect } from "react";
import EpisodeListing from "./EpisodeListing";
import useSpotifyApi from "../hooks/useSpotifyApi";

export default function ExpandedShow({
  show,
  accessToken,
  expanded,
  setExpanded,
  index,
  setIndex,
  episode,
}) {
  // eslint-disable-next-line no-unused-vars
  const [id, setId] = useState("");
  const [endPoint, setEndPoint] = useState("");
  // const [episodeData, setEpisodeData] = useState([]);
  // const [showName, setShowName] = useState("");
  // const [showDesc, setShowDesc] = useState("");

  const data = useSpotifyApi(endPoint, id, accessToken);

  useEffect(() => {
    if (!show) return;
    setId(show.split(":")[2]);
    setEndPoint("shows");
  }, [show]);

  useEffect(() => {
    if (!episode) return;
    setId(episode.split(":")[2]);
    setEndPoint("episodes");
  }, [episode]);

  // useEffect(() => {
  //   if (!episodeId) return;
  //   axios
  //     .get(`https://api.spotify.com/v1/episodes/${episodeId}`, {
  //       headers: {
  //         Authorization: "Bearer " + accessToken,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setEpisodeData([res.data]);
  //       setShowName(res.data.show.name);
  //       setShowDesc(res.data.show.description);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [episodeId, accessToken]);

  // useEffect(() => {
  //   if (!showId) return;
  //   axios
  //     .get(`https://api.spotify.com/v1/shows/${showId}`, {
  //       headers: {
  //         Authorization: "Bearer " + accessToken,
  //       },
  //     })
  //     .then((res) => {
  //       setEpisodeData(res.data.episodes.items);
  //       setShowName(res.data.name);
  //       setShowDesc(res.data.description);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [showId, accessToken]);

  return (
    <>
      {/**have show link to show incase viewing episode only */}
      <h1> {data.showName} </h1>
      <h4>{data.showDesc}</h4>
      {data.episodeData.map((episode) => (
        <EpisodeListing
          key={episode.id + Math.random()}
          name={episode.name}
          description={episode.description}
          ms={episode.duration_ms}
          id={episode.id}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
        />
      ))}
    </>
  );
}
