import React from "react";
import { Col, Row, Media } from "react-bootstrap";

export default function NowPlaying({ nowPlaying }) {
  return (
    <>
      <Row className='px-5 py-2' noGutters>
        <Col>
          <h1>Now Playing: </h1> <br />
        </Col>
      </Row>
      <Row className='px-5 py-2' noGutters>
        <Col>
          <Media>
            <img
              src={
                nowPlaying.current_track.album.images[0].url
                  ? nowPlaying.current_track.album.images[0].url
                  : "../images/qmark.jpg"
              }
              alt='no img'
              height='250px'
              width='250px'
            />
            <Media.Body
              className='d-flex flex-column align-items-baseline p-5'
              style={{ height: "250px" }}
            >
              <h2 className='flex-grow-1'>{nowPlaying.current_track.name}</h2>
              <h3>{nowPlaying.current_track.album.name}</h3>
              <h3>{nowPlaying.current_track.artist[0].name}</h3>
            </Media.Body>
          </Media>
        </Col>
      </Row>
    </>
  );
}
