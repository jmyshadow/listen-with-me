import React from "react";
import { Col } from "react-bootstrap";

export default function TrackListing({
  name,
  artists,
  album,
  ms,
  id,
  expanded,
  setExpanded,
  index,
  setIndex,
  playlist,
  accessToken,
}) {
  /**
      format for song queue
      {
        song: track.name,
        artist: artist,
        album: track.album.name,
        duration: track.duration_ms,
        uri: track.uri,
        id: track.id,
      },
   */

  function milToMin(milli) {
    const min = Math.floor(milli / 60000);
    const sec = Math.ceil((milli / 60000 - min) * 60);

    return `${min}:${sec.toString().length === 1 ? "0" + sec.toString() : sec}`;
  }

  function uriClicked(uri) {
    setExpanded([...expanded, uri]);
    setIndex(index + 1);
  }

  function setupArtist() {
    // removes main artist in album view, keeps all artists in playlist view
    const otherArtists = playlist ? artists : artists.slice(1);
    if (otherArtists.length > 0)
      return otherArtists.map((artist, index) => (
        <button className='btn-success' onClick={() => uriClicked(artist.uri)}>
          {" "}
          {artist.name}
          {index < otherArtists.length - 1 ? ", " : null}
        </button>
      ));
  }
  if (playlist) {
    return (
      <>
        <Col>{name}</Col>
        <Col> {setupArtist()} </Col>
        <Col>{album}</Col>
        <Col sm='auto'>{milToMin(ms)}</Col>
      </>
    );
  } else {
    return (
      <>
        <Col>
          {" " + name}
          {artists.length > 1 ? " - " : ""}
          {artists.length > 1 ? setupArtist() : ""}
        </Col>
        {/**       <Col xs={4}>{album}</Col>  */}
        <Col sm='auto'>{milToMin(ms)}</Col>
      </>
    );
  }
}
