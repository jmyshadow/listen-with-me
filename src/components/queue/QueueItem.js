/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import SearchResults from "../search/SearchResults";
import SongTime from "../utilities/SongTime";

import FASIcon from "../generic/FASIcon";

export default function QueueItem({
  entry,
  setExpanded,
  setSearching,
  expanded,
  removeItem,
  playItem,
}) {
  const [clicked, setClicked] = useState(false);
  const mouseIn = useRef(null);
  const trackRef = useRef(null);
  const artistRef = useRef(null);

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

  useEffect(() => {
    const mouseenterHandler = (e) => {
      mouseIn.current = true;
      if (e.target.clientWidth < e.target.scrollWidth) {
        let accel = 0;
        const scrolling = setInterval(() => {
          accel += 1;
          if (e.target.scrollLeft >= e.target.scrollLeftMax - 5)
            e.target.style.textOverflow = "clip";
          if (!mouseIn.current) clearInterval(scrolling);
          else e.target.scrollLeft += 15 + accel;
        }, 100);
      }
    };

    const mouseleaveHandler = (e) => {
      mouseIn.current = false;
      if (e.target.style.textOverflow !== "ellipsis")
        e.target.style.textOverflow = "ellipsis";
      e.target.scrollLeft = 0;
    };

    trackRef.current.addEventListener("mouseenter", mouseenterHandler);
    trackRef.current.addEventListener("mouseleave", mouseleaveHandler);
    artistRef.current.addEventListener("mouseenter", mouseenterHandler);
    artistRef.current.addEventListener("mouseleave", mouseleaveHandler);

    return () => {
      trackRef.current.removeEventListener("mouseenter", mouseenterHandler);
      trackRef.current.removeEventListener("mouseleave", mouseleaveHandler);
      artistRef.current.removeEventListener("mouseenter", mouseenterHandler);
      artistRef.current.removeEventListener("mouseleave", mouseleaveHandler);
    };
  });

  return clicked ? (
    // <Row
    //           key={entry.id + Math.floor(Math.random() * 100000)}
    //           className='row-nowrap nowPlaying pt-1 track-listing'
    //           style={{ height: "2rem" }}
    //           noGutters
    //         >
    //           <Col sm='auto'>
    //             <FASIcon
    //               iClass='fas fa-play fa-lg clickable-icon rounded-circle'
    //               iFunction={() =>
    //                 playItem(currentTrackRef.current + 1 + index)
    //               }
    //               iStyle={{ marginRight: "10px" }}
    //             />
    //           </Col>
    <SearchResults expanded={expanded} setExpanded={setExpanded} />
  ) : (
    //     <Col sm='auto'>
    //     <FASIcon
    //       iClass='fas fa-times-circle fa-lg clickable-icon rounded-circle'
    //       iFunction={() =>
    //         removeItem(currentTrackRef.current + 1 + index)
    //       }
    //       iStyle={{ marginLeft: "10px" }}
    //     />
    //   </Col>
    // </Row>
    <Row
      key={entry.id + Math.floor(Math.random() * 100000)}
      className='nowPlaying pt-1 px-2 position-relative w-100'
      style={{ height: "2rem", zIndex: "5" }}
      noGutters
    >
      <Col sm='1' className='text-center'>
        <FASIcon
          iClass='fas fa-play fa-lg clickable-icon rounded-circle'
          iFunction={playItem}
          iStyle={{ marginRight: "10px" }}
        />
      </Col>
      <Col
        sm={5}
        className='h-100 w-100 position-relative d-flex'
        style={{
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            scrollBehavior: "smooth",
          }}
          ref={trackRef}
        >
          {entry.song}
        </div>
      </Col>
      <Col
        sm={4}
        className='h-100 w-100 position-relative d-flex'
        style={{
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            scrollBehavior: "smooth",
          }}
          ref={artistRef}
        >
          {setupArtist(entry.artist)}
        </div>
      </Col>

      <Col sm='1' className='text-center'>
        <SongTime milli={entry.duration} />
      </Col>
      <Col sm='1' className='text-center'>
        <FASIcon
          iClass='fas fa-times-circle fa-lg clickable-icon rounded-circle'
          iFunction={removeItem}
          iStyle={{ marginLeft: "10px" }}
        />
      </Col>
    </Row>
  );
}
