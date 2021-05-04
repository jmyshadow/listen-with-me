import React, { useState } from "react";
import { Col } from "react-bootstrap";
import ExpandedSearchResults from "../expandedSearch/ExpandedSearchResults";
import SongTime from "../utilities/SongTime";

export default function QueueItem({
  entry,
  setExpanded,
  setSearching,
  expanded,
}) {
  const [clicked, setClicked] = useState(false);
  function uriClicked(uri) {
    setSearching(true);
    setExpanded([uri]);
    setClicked(true);
  }

  function setupArtist(artist) {
    // removes main artist in album view, keeps all artists in playlist view
    if (artist.length > 0)
      return artist.map((artist, index) => (
        <span className='clickable' onClick={() => uriClicked(artist.uri)}>
          {" "}
          {artist.name}
          {index < artist.length - 1 ? ", " : null}
        </span>
      ));
  }

  return clicked ? (
    <ExpandedSearchResults expanded={expanded} setExpanded={setExpanded} />
  ) : (
    <>
      <Col>{entry.song}</Col>
      <Col>{setupArtist(entry.artist)}</Col>
      <Col>{entry.album}</Col>
      <Col sm='auto'>
        <SongTime milli={entry.duration} />
      </Col>
    </>
  );
}
