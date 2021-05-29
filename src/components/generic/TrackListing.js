import React from "react";
import { Col } from "react-bootstrap";
import SongTime from "../utilities/SongTime";

export default function TrackListing({
  track,
  expanded,
  setExpanded,
  index,
  setIndex,
  playlist,
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
    const otherArtists = playlist ? track.artists : track.artists.slice(1);
    if (otherArtists.length > 0)
      return otherArtists.map((artist, index) => (
        <span className='clickable' onClick={() => uriClicked(artist.uri)}>
          {" "}
          {artist.name}
          {index < otherArtists.length - 1 ? ", " : null}
        </span>
      ));
  }
  if (playlist) {
    return (
      <>
        <Col>{track.name}</Col>
        <Col> {setupArtist()} </Col>
        <Col>{track.album.name}</Col>
        <Col sm='auto'>
          <SongTime milli={track.duration_ms} />
        </Col>
      </>
    );
  } else {
    return (
      <>
        <Col className='track-listing col-xs-8 col-sm-10'>
          {" " + track.name}
          {track.artists.length > 1 ? " - " : ""}
          {track.artists.length > 1 ? setupArtist() : ""}
        </Col>
        {/**       <Col xs={4}>{album}</Col>  */}
        <Col className='col-xs-2 col-sm-1'>
          <SongTime milli={track.duration_ms} />
        </Col>
      </>
    );
  }
}
