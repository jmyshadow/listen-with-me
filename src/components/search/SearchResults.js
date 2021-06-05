import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import ExpandedAlbum from "./ExpandedAlbum";
import ExpandedArtist from "./ExpandedArtist";
import ExpandedPlaylist from "./ExpandedPlaylist";
import ExpandedShow from "./ExpandedShow";
import SearchItem from "./SearchItem";
// import SearchFactory from "./SearchFactory";

const order = {
  tracks: 0,
  artists: 1,
  albums: 2,
  playlists: 3,
  episodes: 4,
  shows: 5,
};

function calcWidth(w) {
  if (w >= 750) return { titleCol: "50%", itemCol: "50%" };
  if (w >= 400) return { titleCol: "100%", itemCol: "50%" };
  return { titleCol: "100%", itemCol: "100%" };
}

export default function SearchResults({
  searchResult,
  expanded,
  setExpanded,
  index,
  setIndex,
  socket,
  queueQueue,
  setQueueQueue,
  immediateQueue,
  setImmediateQueue,
  width,
}) {
  const type = expanded[index].split(":")[1];

  const { titleCol, itemCol } = width
    ? calcWidth(width)
    : { titleCol: "50%", itemCol: "50%" };

  switch (type) {
    default:
      return (
        <Row noGutters>
          {Object.entries(searchResult).map(([key, value]) =>
            value.length > 0 ? (
              <Col
                className={`order-${order[key]}`}
                style={{ minWidth: titleCol }}
              >
                <Row
                  className='bg-dark justify-content-center py-2'
                  style={{
                    textShadow: "-1px -1px 10px black, 1px 1px 20px black",
                  }}
                >
                  <Col>
                    <h4>{key[0].toUpperCase() + key.substring(1)}</h4>
                  </Col>
                </Row>
                <Row noGutters>
                  {value.map((item) =>
                    // check for item since Spotify returned null values in middle of some arrays
                    item ? (
                      <SearchItem
                        key={item.id + Math.random()}
                        item={item}
                        expanded={expanded}
                        setExpanded={setExpanded}
                        setIndex={setIndex}
                        queueQueue={queueQueue}
                        setQueueQueue={setQueueQueue}
                        immediateQueue={immediateQueue}
                        setImmediateQueue={setImmediateQueue}
                        width={itemCol}
                      />
                    ) : null
                  )}
                </Row>
              </Col>
            ) : null
          )}
        </Row>
      );
    case "track":
      return (
        <ExpandedAlbum
          key={expanded[index].split(":")[2]}
          uri={expanded[index]}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
          socket={socket}
          queueQueue={queueQueue}
          setQueueQueue={setQueueQueue}
          immediateQueue={immediateQueue}
          setImmediateQueue={setImmediateQueue}
        />
      );
    case "album":
      return (
        <ExpandedAlbum
          key={expanded[index].split(":")[2]}
          uri={expanded[index]}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
          socket={socket}
          queueQueue={queueQueue}
          setQueueQueue={setQueueQueue}
          immediateQueue={immediateQueue}
          setImmediateQueue={setImmediateQueue}
        />
      );

    case "artist":
      return (
        <ExpandedArtist
          key={expanded[index].split(":")[2]}
          uri={expanded[index]}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
          queueQueue={queueQueue}
          setQueueQueue={setQueueQueue}
          immediateQueue={immediateQueue}
          setImmediateQueue={setImmediateQueue}
        />
      );

    case "playlist":
      return (
        <ExpandedPlaylist
          key={expanded[index].split(":")[2]}
          uri={expanded[index]}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
          queueQueue={queueQueue}
          setQueueQueue={setQueueQueue}
          immediateQueue={immediateQueue}
          setImmediateQueue={setImmediateQueue}
        />
      );

    case "episode":
      return (
        <ExpandedShow
          key={expanded[index].split(":")[2]}
          uri={expanded[index]}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
          queueQueue={queueQueue}
          setQueueQueue={setQueueQueue}
          immediateQueue={immediateQueue}
          setImmediateQueue={setImmediateQueue}
        />
      );

    case "show":
      return (
        <ExpandedShow
          key={expanded[index].split(":")[2]}
          uri={expanded[index]}
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
          queueQueue={queueQueue}
          setQueueQueue={setQueueQueue}
          immediateQueue={immediateQueue}
          setImmediateQueue={setImmediateQueue}
        />
      );
  }
}
