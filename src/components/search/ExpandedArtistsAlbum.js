import React, { useState, useEffect } from "react";
import { Col, Card } from "react-bootstrap";

export default function ExpandedArtistsAlbum({
  album,
  expanded,
  setExpanded,
  index,
  setIndex,
  socket,
  queueQueue,
  setQueueQueue,
  immediateQueue,
  setImmediateQueue,
}) {
  const [albumImage, setAlbumImage] = useState("");
  const [albumName, setAlbumName] = useState("");

  useEffect(() => {
    if (album.images) setAlbumImage(album.images[0].url);
    if (album.name) setAlbumName(album.name);
  }, [album]);

  function expandSearch() {
    setExpanded([...expanded, album.uri]);
    setIndex(index + 1);
  }

  return (
    <Card
      key={album.id}
      className='p-2 m-3'
      style={{
        backgroundColor: "black",
        flex: "1 1 150px",
        maxWidth: "200px",
      }}
    >
      <Card.Img variant='top' src={albumImage} />
      <Card.Body
        className='clickable-icon'
        style={{ padding: "1rem .5rem" }}
        onClick={expandSearch}
      >
        <Card.Text
          style={{
            display: "inline-block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            paddingTop: "10px",
            maxWidth: "calc(100%)",
          }}
        >
          {albumName}
        </Card.Text>
      </Card.Body>
    </Card>
    // <div
    //   key={album.id}
    //   className='p-2 m-3'
    //   style={{
    //     backgroundColor: "black",
    //     display: "inline-block",
    //     maxWidth: "200px",
    //   }}
    // >
    //   <img src={albumImage} alt='' />
    //   <p
    //     style={{
    //       display: "inline-block",
    //       overflow: "hidden",
    //       whiteSpace: "nowrap",
    //       textOverflow: "ellipsis",
    //       maxWidth: "200px",
    //     }}
    //   >
    //     {albumName}
    //   </p>
    // </div>
  );
}
