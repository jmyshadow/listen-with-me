import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [showId, setShowId] = useState("");
  // const [episodeId, setEpisodeId] = useState("");
  // const [episodeData, setEpisodeData] = useState([]);
  // const [showName, setShowName] = useState("");
  // const [showDesc, setShowDesc] = useState("");

  const [episodeData, showName, showDesc] = useSpotifyApi(
    "shows",
    showId,
    accessToken
  );

  useEffect(() => {
    if (!show) return;
    setShowId(show.split(":")[2]);
  }, [show]);

  // useEffect(() => {
  //   if (!episode) return;
  //   setEpisodeId(episode.split(":")[2]);
  // }, [episode]);

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
      {showName}
      {/**have show link to show incase viewing episode only */}
      <h1> {showName} </h1> <h4>{showDesc}</h4>
      {episodeData.map((episode) => (
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
