import React, { useRef, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import SongTime from "../utilities/SongTime";
import FASIcon from "../generic/FASIcon";

export default function TrackListing({
  track,
  expanded,
  setExpanded,
  index,
  setIndex,
  playlist = false,
  highlight = false,
  setQueueQueue,
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
    setExpanded((i) => [...i, uri]);
    setIndex((i) => i + 1);
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      trackMain.current.removeEventListener("mouseleave", mouseleaveHandler);
    };
  });

  function queueSong(track) {
    setQueueQueue((i) => [
      ...i,
      {
        song: track.name,
        artist: track.artists,
        album: track.album.name,
        duration: track.duration_ms,
        uri: track.uri,
        id: track.id,
      },
    ]);
  }

  // function setupArtist() {
  //   // removes main artist in album view, keeps all artists in playlist view
  //   if (track.artists.length > 1) {
  //     const otherArtists = track.artists.slice(1);
  //     console.log(otherArtists);
  //     console.log(otherArtists[0].name);
  //     return (
  //       " - " +
  //       otherArtists.map((artist, index) => (
  //         <span className='clickable' onClick={() => uriClicked(artist.uri)}>
  //           {`${artist.name}${index < otherArtists.length - 1 ? ", " : ""}`}
  //         </span>
  //       ))
  //     );
  //   }
  // }
  function setupArtist() {
    // removes main artist in album view, keeps all artists in playlist view
    const otherArtists = track.artists.slice(1);
    if (otherArtists.length > 0)
      return (
        <>
          {" - "}
          {otherArtists.map((artist, index) => (
            <>
              <span
                className='clickable'
                onClick={() => uriClicked(artist.uri)}
              >
                {`${artist.name}`}
              </span>
              {`${index < otherArtists.length - 1 ? ", " : ""}`}
            </>
          ))}
        </>
      );
  }

  function setupAlbum() {
    return (
      <>
        {" - "}
        <span className='clickable' onClick={() => uriClicked(track.album.uri)}>
          {track.album.name}
        </span>
      </>
    );
  }

  return (
    <Row
      className={`${
        highlight ? "nowPlayingTrack" : "nowPlaying"
      } pt-1 px-2 position-relative w-100`}
      style={{ height: "2rem", zIndex: "5" }}
      noGutters
    >
      <Col sm={1} className='text-center'>
        <FASIcon
          iClass='fas fa-plus-circle fa-lg clickable-icon'
          iFunction={() => queueSong(track)}
          iStyle={{ marginRight: "10px" }}
        />
      </Col>
      <Col
        sm={10}
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
          ref={trackMain}
        >
          {track.name}
          {playlist ? setupAlbum() : setupArtist()}
        </div>
      </Col>
      <Col sm='1' className='pl-3'>
        <SongTime milli={track.duration_ms} />
      </Col>
    </Row>
  );
}
