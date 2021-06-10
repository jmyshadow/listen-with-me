import React, { useRef, useEffect } from "react";
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

  const mouseIn = useRef(null);
  const trackMain = useRef(null);

  useEffect(() => {
    const mouseenterHandler = (e) => {
      mouseIn.current = true;
      if (e.target.clientWidth < e.target.scrollWidth) {
        let accel = 0;
        const scrolling = setInterval(() => {
          accel += 1;
          console.log(accel);
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

    trackMain.current.addEventListener("mouseenter", mouseenterHandler);
    trackMain.current.addEventListener("mouseleave", mouseleaveHandler);

    return () => {
      trackMain.current.removeEventListener("mouseenter", mouseenterHandler);
      trackMain.current.removeEventListener("mouseleave", mouseleaveHandler);
    };
  });

  function setupArtist() {
    // removes main artist in album view, keeps all artists in playlist view
    const otherArtists = playlist ? track.artists : track.artists.slice(1);
    if (otherArtists.length > 0)
      return (
        // <div
        //   style={{
        //     display: "flex",
        //     overflow: "hidden",
        //     textOverflow: "ellipsis",
        //   }}
        //
        otherArtists.map((artist, index) => (
          <span className='clickable' onClick={() => uriClicked(artist.uri)}>
            {`${artist.name}${index < otherArtists.length - 1 ? ", " : ""}`}
          </span>
        ))
        // </div>
      );
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
        <Col
          sm={10}
          className='h-100 w-100 position-relative d-flex'
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {/* <div
            className='h-100 d-flex flex-nowrap'
            style={{
              flex: 1,
              whiteSpace: "nowrap",
              wordBreak: "break-all",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          > */}
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              scrollBehavior: "smooth",
            }}
            ref={trackMain}
          >
            {" " + track.name}
            {track.artists.length > 1 ? " - " : ""} {/* </div> */}
            {track.artists.length > 1 ? setupArtist() : ""}
          </div>
        </Col>
        <Col sm='1' className='pl-3'>
          <SongTime milli={track.duration_ms} />
        </Col>
      </>
    );
  }
}
