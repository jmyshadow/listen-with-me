import React, { useState, useEffect, useContext } from "react";
import EpisodeListing from "../generic/EpisodeListing";
// import useSpotifyApi from "../hooks/useSpotifyApi";
import * as spotifyFetch from "../utilities/spotifyFetch.js";
import { TokenContext } from "../context/SpotifyContext";

export default function ExpandedShow({
  uri,
  expanded,
  setExpanded,
  index,
  setIndex,
  queueQueue,
  setQueueQueue,
  immediateQueue,
  setImmediateQueue,
}) {
  const accessToken = useContext(TokenContext);
  const [episodes, setEpisodes] = useState([]);
  const [showName, setShowName] = useState("");
  const [showDesc, setShowDesc] = useState("");

  useEffect(() => {
    const splitUri = uri.split(":");
    if (splitUri[1] === "show") {
      (async function () {
        const { episodes, showName, showDesc } = await spotifyFetch.shows(
          splitUri[2],
          accessToken
        );
        setEpisodes(episodes);
        setShowName(showName);
        setShowDesc(showDesc);
      })();
    } else if (splitUri[1] === "episode") {
      (async function () {
        const { episodes, showName, showDesc } = await spotifyFetch
          .expandedEpisodes(splitUri[2], accessToken)
          .then((showId) => {
            return spotifyFetch.shows(showId, accessToken);
          });
        setEpisodes(episodes);
        setShowName(showName);
        setShowDesc(showDesc);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/**have show link to show incase viewing episode only */}
      <h1> {showName} </h1>
      <h4>{showDesc}</h4>
      {episodes.map((episode) => (
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
