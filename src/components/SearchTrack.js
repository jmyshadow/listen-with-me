import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function SearchTrack({ track }) {
  return (
    <Container key={track.id} className='bg-dark pb-1 px-0' fluid>
      <Row noGutters>
        <Col sm='4' className='bg-primary'>
          <img src={track.album.images[2].url} alt='new' width='100px' />
        </Col>
        <Col sm='8' className='bg-secondary'>
          {track.name}
          <br></br>
          {track.artists[0].name}
        </Col>
      </Row>
    </Container>
  );
}
