import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import * as spotifyFetch from "../utilities/spotifyFetch.js";
import { TokenContext } from "../context/SpotifyContext";
import SongTime from "../utilities/SongTime";
import FASIcon from "../generic/FASIcon";
import ListingHeader from "../generic/ListingHeader";
export default function ExpandedEpisode({
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
  const [episode, setEpisode] = useState([]);
  const [showName, setShowName] = useState("");
  const [episodeDesc, setEpisodeDesc] = useState("");
  const [showUri, setShowUri] = useState("");
  const [image, setImage] = useState("");

  function uriClicked(uri) {
    setExpanded((i) => [...i, uri]);
    setIndex((i) => i + 1);
  }

  function queueEpisode(track) {
    setQueueQueue((i) => [
      ...i,
      {
        song: track.name,
        artist: track.artists,
        album: track.album.name,
        duration: track.duration_ms,
        uri: track.uri,
        id: track.id,
      },
    ]);
  }

  useEffect(() => {
    (async function () {
      const episodeData = await spotifyFetch.episodes(
        uri.split(":")[2],
        accessToken
      );
      setEpisode(episodeData.name);
      setShowName(episodeData.show.name);
      setEpisodeDesc(episodeData.description);
      setShowUri(episodeData.show.uri);
      setImage(episodeData.images[0].url);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row className='bg-dark' noGutters>
        <Col className=' w-100' onClick={() => uriClicked(showUri)}>
          <ListingHeader image={image} data1={showName} />
        </Col>
      </Row>
      <Row
        className='nowPlaying pt-1 position-relative w-100'
        style={{ zIndex: "5" }}
        noGutters
      >
        <Col sm={1} className='text-center'>
          <FASIcon
            iClass='fas fa-plus-circle fa-lg clickable-icon'
            iFunction={() => queueEpisode(episode)}
            iStyle={{ marginRight: "10px" }}
          />
        </Col>
        <Col
          sm={10}
          className='h-100 w-100 position-relative d-flex'
          style={{
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              scrollBehavior: "smooth",
            }}
          >
            {episode}
            <div>{episodeDesc}</div>
          </div>
        </Col>
        <Col sm='1' className='pl-3'>
          <SongTime milli={episode.duration_ms} />
        </Col>
      </Row>
    </>
  );
}
