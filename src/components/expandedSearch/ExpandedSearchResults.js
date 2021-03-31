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
  const [type, setType] = useState("track");

  useEffect(() => {
    console.log(expanded, index);
    console.log("use effect called")
    setType(expanded[index].split(":")[1]);
  }, [index, type, expanded]);

  switch (type) {
    default:
      return null;
    case "track":
      return (
        <>
          <ExpandedTrack
            type={type}
            accessToken={accessToken}
            track={expanded[index]}
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
            type={type}
            accessToken={accessToken}
            artist={expanded[index]}
          />
        </>
      );

    case "album":
      return (
        <>
          <ExpandedAlbum
            type={type}
            accessToken={accessToken}
            album={expanded[index]}
          />
        </>
      );

    case "playlist":
      return (
        <>
          <ExpandedPlaylist
            type={type}
            accessToken={accessToken}
            playlist={expanded[index]}
          />
        </>
      );

    case "episode":
      return (
        <>
          <ExpandedEpisode
            type={type}
            accessToken={accessToken}
            episode={expanded[index]}
          />
        </>
      );

    case "show":
      return (
        <>
          <ExpandedShow
            type={type}
            accessToken={accessToken}
            show={expanded[index]}
          />
        </>
      );
  }
}
