import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ExpandedTrack from "./ExpandedTrack";
import ExpandedAlbum from "./ExpandedAlbum";
import ExpandedArtist from "./ExpandedArtist";
import ExpandedPlaylist from "./ExpandedPlaylist";
import ExpandedShow from "./ExpandedShow";
import ExpandedEpisode from "./ExpandedEpisode";

export default function ExpandedSearchResults({
  expanded,
  setExpanded,
  accessToken,
  setSearching,
  index,
  setIndex,
}) {
  const [type, setType] = useState("");

  useEffect(() => {
    setType(expanded[index].split(":")[1]);
    console.log(expanded);
  }, [index, type, expanded]);

  switch (type) {
    default:
      return null;
    case "track":
      return (
        <>
          <ExpandedAlbum
            accessToken={accessToken}
            track={expanded[index]}
            expanded={expanded}
            setExpanded={setExpanded}
            index={index}
            setIndex={setIndex}
          />
        </>
      );
    case "album":
      return (
        <>
          <ExpandedAlbum
            accessToken={accessToken}
            album={expanded[index]}
            expanded={expanded}
            setExpanded={setExpanded}
            index={index}
            setIndex={setIndex}
          />
        </>
      );

    case "artist":
      return (
        <>
          <ExpandedArtist
            accessToken={accessToken}
            artist={expanded[index]}
            expanded={expanded}
            setExpanded={setExpanded}
            index={index}
            setIndex={setIndex}
          />
        </>
      );

    case "playlist":
      return (
        <>
          <ExpandedPlaylist
            accessToken={accessToken}
            playlist={expanded[index]}
            expanded={expanded}
            setExpanded={setExpanded}
            index={index}
            setIndex={setIndex}
          />
        </>
      );

    case "episode":
      return (
        <>
          <ExpandedShow
            accessToken={accessToken}
            episode={expanded[index]}
            expanded={expanded}
            setExpanded={setExpanded}
            index={index}
            setIndex={setIndex}
          />
        </>
      );

    case "show":
      return (
        <>
          <ExpandedShow
            accessToken={accessToken}
            show={expanded[index]}
            expanded={expanded}
            setExpanded={setExpanded}
            index={index}
            setIndex={setIndex}
          />
        </>
      );
  }
}
