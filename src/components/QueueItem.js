import React from "react";
import { Row, Col } from "react-bootstrap";

export default function QueueItem({ entry }) {
  function playSong() {
    "todo";
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
      <Col sm='4'>{entry.song}</Col>
      <Col sm='3'>
        {entry.artist
          .flat()
          .filter((_artist, uri) => uri % 2 === 0)
          .join(", ")}
      </Col>
      <Col sm='3'>{entry.album}</Col>
      <Col sm='1'>{milToMin(entry.duration)}</Col>
    </Row>
  );
}
