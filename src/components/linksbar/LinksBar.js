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
  socket,
  user,
}) {
  const resize = useRef(null);
  const room = useRef(null);
  const roomField = useRef(null);
  const [playlists, setPlaylists] = useState([]);
  const [joiningRoom, setJoiningRoom] = useState(false);
  const [tInput, setTInput] = useState("");

  useEffect(() => {
    if (!accessToken) return;
    (async () => {
      const fetchedPlaylists = await spotifyFetch.myPlaylists(accessToken);
      setPlaylists(fetchedPlaylists);
    })();
  }, [accessToken]);

  //resize functions
  const [width, setWidth] = useState(window.innerWidth / 6);

  function mouseDownHandler() {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", mouseUpHandler);
  }

  function mouseUpHandler() {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", mouseUpHandler);
  }

  function updateRoom() {
    room.current = tInput;
    socket.emit("joinRoom", room.current);
    setJoiningRoom(false);
  }

  function handleText(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      updateRoom();
    }
  }

  function handleMouseMove(e) {
    const newWidth = e.clientX - 8;
    const maxWidth = window.innerWidth / 3 - 20;
    setWidth(newWidth < maxWidth ? newWidth : maxWidth);
  }

  useEffect(() => {
    if (joiningRoom) {
      roomField.current.focus();
      roomField.current.select();
    }
  }, [joiningRoom]);

  return (
    <>
      <div
        ref={resize}
        className='side-bar d-flex flex-column align-items-center'
        style={{
          flex: `0 0 ${width}px`,
          backgroundColor: "black",
        }}
      >
        <div
          className='p-3 d-flex flex-column align-items-center nowPlaying'
          style={{ marginTop: "1rem", padding: ".5rem", width: "90%" }}
        >
          <h3>Listening in: </h3>
          <h2 style={{ fontWeight: "bold" }}>
            {room.current ? room.current : "The Void"}
          </h2>
        </div>
        <div className='p-3 clickable'>
          <div
            className={
              joiningRoom
                ? "d-none"
                : `d-flex justify-content-center ${
                    !room.current ? "attention-text" : ""
                  }`
            }
            onClick={() =>
              joiningRoom ? setJoiningRoom(false) : setJoiningRoom(true)
            }
          >
            <h5>Join new room</h5>
          </div>
          <div className={joiningRoom ? "d-flex" : "d-none"}>
            <InputGroup>
              <FormControl
                ref={roomField}
                placeholder='Enter Room Name'
                value={tInput}
                onChange={(e) => setTInput(e.target.value)}
                onKeyDown={(e) => handleText(e)}
              />
              <InputGroup.Append>
                <Button variant='success' onClick={updateRoom}>
                  {"Join"}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
        <div className='my-playlists h-100 p-3'>
          <h4>Playlists:</h4>
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
