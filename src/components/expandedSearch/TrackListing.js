import React from "react";
import { Row, Col } from "react-bootstrap";

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
}) {
  function playSong() {
    //to do
    const url = id;
    console.log(artists);
    return url;
  }

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
      <Row className='row-nowrap' noGutters>
        <Col xs={5}>
          <button className='btn-success'>P</button>
          <button className='btn-warning'>Q</button>
          {" " + name}
        </Col>
        <Col xs={3}> {setupArtist()} </Col>
        <Col xs={3}>{album}</Col>
        <Col xs={1}>{milToMin(ms)}</Col>
      </Row>
    );
  } else {
    return (
      <Row className='row-nowrap' noGutters>
        <Col xs={11}>
          <button className='btn-success'>P</button>
          <button className='btn-warning'>Q</button>
          {" " + name}
          {artists.length > 1 ? " - " : ""}
          {artists.length > 1 ? setupArtist() : ""}
        </Col>
        {/**       <Col xs={4}>{album}</Col>  */}
        <Col xs={1}>{milToMin(ms)}</Col>
      </Row>
    );
  }
}
