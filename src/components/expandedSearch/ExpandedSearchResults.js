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
  socket,
}) {
  const [type, setType] = useState("");

  useEffect(() => {
    setType(expanded[index].split(":")[1]);
  }, [expanded, index]);

  console.log("ex search results rendered");

  switch (type) {
    default:
      return null;
    case "track":
      return (
        <>
          <ExpandedAlbum
            key={expanded[index].split(":")[2]}
            uri={expanded[index]}
            expanded={expanded}
            setExpanded={setExpanded}
            index={index}
            setIndex={setIndex}
            socket={socket}
          />
        </>
      );
    case "album":
      return (
        <>
          <ExpandedAlbum
            key={expanded[index].split(":")[2]}
            uri={expanded[index]}
            expanded={expanded}
            setExpanded={setExpanded}
            index={index}
            setIndex={setIndex}
            socket={socket}
          />
        </>
      );

    case "artist":
      return (
        <>
          <ExpandedArtist
            key={expanded[index].split(":")[2]}
            uri={expanded[index]}
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
            key={expanded[index].split(":")[2]}
            uri={expanded[index]}
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
            key={expanded[index].split(":")[2]}
            uri={expanded[index]}
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
            key={expanded[index].split(":")[2]}
            uri={expanded[index]}
            expanded={expanded}
            setExpanded={setExpanded}
            index={index}
            setIndex={setIndex}
          />
        </>
      );
  }
}
