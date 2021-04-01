import React from "react";
import { Row, Col } from "react-bootstrap";

export default function EpisodeListing({
  name,
  ms,
  id,
  expanded,
  setExpanded,
  index,
  setIndex,
}) {
  function playSong() {
    //to do
  }

  function milToMin(milli) {
    const min = Math.floor(milli / 60000);
    const sec = Math.ceil((milli / 60000 - min) * 60);

    return `${min}:${sec.toString().length === 1 ? "0" + sec.toString() : sec}`;
  }

  return (
    <Row className='row-nowrap' noGutters>
      <Col xs={11}>
        <button className='btn-success'>P</button>
        <button className='btn-warning'>Q</button>
        {" " + name}
      </Col>
      {/**       <Col xs={4}>{album}</Col>  */}
      <Col xs={1}>{milToMin(ms)}</Col>
    </Row>
  );
}
