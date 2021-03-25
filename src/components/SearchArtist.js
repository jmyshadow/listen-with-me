import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function SearchArtist({ artist }) {
  return (
    <Col>
      <div>
        <img
          src={artist.images[2].url}
          alt='new'
          height='100px'
          width='100px'
        />
        {artist.name}
      </div>
    </Col>
  );
}
