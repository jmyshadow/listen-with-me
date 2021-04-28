import React from "react";
import { Col } from "react-bootstrap";
import SongTime from "../utilities/SongTime";

export default function TrackListing({
  name,
  artists,
  album,
  ms,
  id,
  expanded,
  setExpanded,
  index,
  setIndex,
  playlist,
  accessToken,
}) {
  /**
      format for song queue
      {
        song: track.name,
        artist: artist,
        album: track.album.name,
        duration: track.duration_ms,
        uri: track.uri,
        id: track.id,
      },
   */

  function uriClicked(uri) {
    const oldIndex = index;
    setExpanded([...expanded, uri]);
    setIndex(oldIndex + 1);
  }

  function setupArtist() {
    // removes main artist in album view, keeps all artists in playlist view
    const otherArtists = playlist ? artists : artists.slice(1);
    if (otherArtists.length > 0)
      return otherArtists.map((artist, index) => (
        <button className='btn-success' onClick={() => uriClicked(artist.uri)}>
          {" "}
          {artist.name}
          {index < otherArtists.length - 1 ? ", " : null}
        </button>
      ));
  }
  if (playlist) {
    return (
      <>
        <Col>{name}</Col>
        <Col> {setupArtist()} </Col>
        <Col>{album}</Col>
        <Col sm='auto'>
          <SongTime milli={ms} />
        </Col>
      </>
    );
  } else {
    return (
      <>
        <Col>
          {" " + name}
          {artists.length > 1 ? " - " : ""}
          {artists.length > 1 ? setupArtist() : ""}
        </Col>
        {/**       <Col xs={4}>{album}</Col>  */}
        <Col sm='auto'>
          <SongTime milli={ms} />
        </Col>
      </>
    );
  }
}
