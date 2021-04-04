import React from "react";
import { Col } from "react-bootstrap";

export default function QueueItem({ entry }) {
  function playSong() {
    "todo";
  }

  function uriClicked() {
    console.log("clicked");
  }

  function setupArtist(artist) {
    // removes main artist in album view, keeps all artists in playlist view
    if (artist.length > 0)
      return artist.map((artist, index) => (
        <button className='btn-success' onClick={() => uriClicked(artist.uri)}>
          {" "}
          {artist.name}
          {index < artist.length - 1 ? ", " : null}
        </button>
      ));
  }

  function milToMin(milli) {
    const min = Math.floor(milli / 60000);
    const sec = Math.ceil((milli / 60000 - min) * 60);

    return `${min}:${sec.toString().length === 1 ? "0" + sec.toString() : sec}`;
  }

  console.log("queue item rendered");
  return (
    <>
      <Col>{entry.song}</Col>
      <Col>{setupArtist(entry.artist)}</Col>
      <Col>{entry.album}</Col>
      <Col sm='auto'>{milToMin(entry.duration)}</Col>
    </>
  );
}
