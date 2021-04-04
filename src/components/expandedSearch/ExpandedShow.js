import React, { useState, useEffect, useContext } from "react";
import EpisodeListing from "./EpisodeListing";
import useSpotifyApi from "../hooks/useSpotifyApi";
import { TokenContext } from "../context/SpotifyContext";

export default function ExpandedShow({
  show,
  expanded,
  setExpanded,
  index,
  setIndex,
  episode,
}) {
  const accessToken = useContext(TokenContext);
  const [id, setId] = useState("");
  const [endPoint, setEndPoint] = useState("");
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
