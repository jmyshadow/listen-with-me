import React, { useState, useEffect } from "react";
import ExpandedAlbum from "./ExpandedAlbum";
import ExpandedArtist from "./ExpandedArtist";
import ExpandedPlaylist from "./ExpandedPlaylist";
import ExpandedShow from "./ExpandedShow";

export default function ExpandedSearchResults({
  expanded,
  setExpanded,
  index,
  setIndex,
}) {
  const [type, setType] = useState("");

  useEffect(() => {
    setType(expanded[index].split(":")[1]);
  }, [index, type, expanded]);

  console.log("ex search results rendered");

  switch (type) {
    default:
      return null;
    case "track":
      return (
        <>
          <ExpandedAlbum
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
