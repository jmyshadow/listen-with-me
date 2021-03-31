import React from "react";
import { Row, Col } from "react-bootstrap";

export default function TrackListing({ name, artists, album, ms, id, expanded, setExpanded, index, setIndex }) {
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
    setExpanded([...expanded, uri])
    setIndex(index + 1)
  }

  function setupArtist() {
    const otherArtists = artists.slice(1);
    if (otherArtists.length > 0)
      return otherArtists.map((artist) => <a onClick={() => uriClicked(artist.uri)}> {artist.name}</a >)
  }

  return (<>

    <Row xs={2} sm={5} className='row-nowrap' noGutters>
      <Col sm='1' onClick={playSong}>
        <div className='d-flex'>
          <div>[play]</div>
          <div>[ + ]</div>
        </div>
      </Col>
      <Col sm='4'>{name}</Col>
      <Col sm='3'>{setupArtist()}</Col>
      <Col sm='3'>{album}</Col>
      <Col sm='1'>{milToMin(ms)}</Col>
    </Row>
  </>
  );
}
