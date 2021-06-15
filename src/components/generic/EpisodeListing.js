import React, { useRef, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import SongTime from "../utilities/SongTime";
import FASIcon from "../generic/FASIcon";

export default function EpisodeListing({
  episode,
  setQueueQueue,
  setImmediateQueue,
  expanded,
  setExpanded,
  setIndex,
}) {
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

  // function setupArtist() {
  //   // removes main artist in album view, keeps all artists in playlist view
  //   const otherArtists = playlist ? track.artists : track.artists.slice(1);
  //   if (otherArtists.length > 0)
  //     return (
  //       " - " +
  //       otherArtists.map((artist, index) => (
  //         <span className='clickable' onClick={() => uriClicked(artist.uri)}>
  //           {`${artist.name}${index < otherArtists.length - 1 ? ", " : ""}`}
  //         </span>
  //       ))
  //     );
  // }

  return (
    // <Row className='row-nowrap' noGutters>
    //   <Col xs={11}>
    //     <button className='btn-success'>P</button>
    //     <button className='btn-warning'>Q</button>
    //     {" " + name}
    //   </Col>
    //   {/**       <Col xs={4}>{album}</Col>  */}
    //   <Col xs={1}>{milToMin(ms)}</Col>
    // </Row>

    <Row
      className='nowPlaying pt-1 position-relative w-100'
      style={{ height: "10rem", zIndex: "5" }}
      noGutters
    >
      <Col sm={1} className='text-center'>
        <FASIcon
          iClass='fas fa-plus-circle fa-lg clickable-icon'
          iFunction={() => queueEpisode(episode)}
          iStyle={{ marginRight: "10px" }}
        />
      </Col>
      <Col sm={10} className='h-100 w-100 position-relative d-flex'>
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            scrollBehavior: "smooth",
          }}
          onClick={() => uriClicked(episode.uri)}
        >
          {episode.name}
          <div>{episode.description}</div>
        </div>
      </Col>
      <Col sm='1' className='pl-3'>
        <SongTime milli={episode.duration_ms} />
      </Col>
    </Row>
  );
}
