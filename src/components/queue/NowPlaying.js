import React, { useState, useEffect } from "react";
import { Col, Row, Media } from "react-bootstrap";

export default function NowPlaying({ nowPlaying }) {
  const [image, setImage] = useState("../images/qmark.jpg");
  const [track, setTrack] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");

  useEffect(() => {
    if (!nowPlaying) return;
    setImage(nowPlaying.track_window.current_track.album.images[0].url);
    setTrack(nowPlaying.track_window.current_track.name);
    setAlbum(nowPlaying.track_window.current_track.album.name);
    setArtist(nowPlaying.track_window.current_track.artists[0].name);
  }, [setImage, setTrack, setAlbum, nowPlaying]);

  return (
    <Row className='px-5 py-2' noGutters>
      <Col>
        <Media style={{ height: "200px" }}>
          <img src={image} alt='no img' height='200px' width='200px' />
          <Media.Body className='d-flex flex-column align-items-baseline pl-4'>
            <h2 className='flex-grow-1'>{track}</h2>
            <h3>{album}</h3>
            <h3>{artist}</h3>
          </Media.Body>
        </Media>
      </Col>
    </Row>
  );
}
