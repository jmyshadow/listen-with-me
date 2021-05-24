import React, { useState, useRef, useEffect } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import * as spotifyFetch from "../utilities/spotifyFetch.js";
import LinksBarPlaylist from "./LinksBarPlaylist";

export default function LinksBar({
  accessToken,
  index,
  setIndex,
  expanded,
  setExpanded,
  setSearching,
  setSearch,
}) {
  const resize = useRef(null);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    (async () => {
      const fetchedPlaylists = await spotifyFetch.myPlaylists(accessToken);
      console.log(fetchedPlaylists);
      setPlaylists(fetchedPlaylists);
    })();
  }, [accessToken]);

  //resize functions
  const [width, setWidth] = useState(window.innerWidth / 4);

  function handleMouseMove(e) {
    const newWidth = e.clientX - 8;
    const maxWidth = window.innerWidth / 3 - 20;
    console.log(window.innerWidth);
    console.log(newWidth, maxWidth);
    setWidth(newWidth < maxWidth ? newWidth : maxWidth);
  }

  function mouseDownHandler() {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", mouseUpHandler);
  }

  function mouseUpHandler() {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", mouseUpHandler);
  }

  function joinRoom() {}

  return (
    <>
      <div
        ref={resize}
        className='side-bar d-flex flex-column'
        style={{
          flex: `0 0 ${width}px`,
          backgroundColor: "black",
        }}
      >
        <div className='p-3'>
          <h2>You're listening in: "ROOM"</h2>
        </div>
        <div className='p-3 clickable' onClick={joinRoom}>
          <div className='d-flex'>
            <h4>Join new room</h4>
          </div>
          <div className='d-none'>
            <InputGroup className='px-2 pb-3'>
              <FormControl placeholder='Enter Room Name' value={"msg"} />
              <InputGroup.Append>
                <Button variant='success' onClick={""}>
                  {"Join"}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
        <div className='my-playlists h-100 p-3'>
          {playlists.map((playlist) => (
            <LinksBarPlaylist
              key={playlist.id}
              playlist={playlist}
              index={index}
              setIndex={setIndex}
              expanded={expanded}
              setExpanded={setExpanded}
              setSearching={setSearching}
              setSearch={setSearch}
            />
          ))}{" "}
        </div>
      </div>
      <div
        className='resizer'
        onMouseDown={mouseDownHandler}
        style={{ flex: "0 0 auto" }}
      ></div>
    </>
  );
}
