import React, { useState, useEffect, useContext } from "react";
import EpisodeListing from "../generic/EpisodeListing";
import { Row, Col } from "react-bootstrap";
// import useSpotifyApi from "../hooks/useSpotifyApi";
import * as spotifyFetch from "../utilities/spotifyFetch.js";
import { TokenContext } from "../context/SpotifyContext";

import ListingHeader from "../generic/ListingHeader";

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
      <Row className='bg-dark' noGutters>
        <Col className='w-100'>
          <ListingHeader image={showName} data1={showDesc} />
        </Col>
      </Row>
      {episodes.map((episode, index) => (
        <EpisodeListing
          key={index}
          setQueueQueue={setQueueQueue}
          setImmediateQueue={setImmediateQueue}
          episode={episode}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
        />
      ))}
    </>
  );
}
