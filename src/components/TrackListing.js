import React from "react";
import { Row, Col } from "react-bootstrap";

export default function TrackListing({ name, artists, album, ms, id }) {
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

  return (
    <Row xs={5} sm={5} className='row-nowrap' noGutters>
      <Col sm='1' onClick={playSong}>
        {" "}
        [play]{" "}
      </Col>
      <Col sm='4'>{name}</Col>
      <Col sm='3'>{artists.map((artist) => artist.name).join(", ")}</Col>
      <Col sm='3'>{album}</Col>
      <Col sm='1'>{milToMin(ms)}</Col>
    </Row>
  );
}
