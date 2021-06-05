import React, { useState, useEffect, useRef } from "react";
import useAuth from "./hooks/useAuth";
import { TokenContext } from "./context/SpotifyContext";

import { Container } from "react-bootstrap";
import SearchBar from "./search/SearchBar";
import SearchResults from "./search/SearchResults";
import Queue from "./queue/Queue";
import LinksBar from "./linksbar/LinksBar";
import * as spotifyFetch from "./utilities/spotifyFetch.js";

export default function MainApp({ code, setUser, socket, user }) {
  const accessToken = useAuth(code);
  const [searching, setSearching] = useState(false);
  const [expanded, setExpanded] = useState(["search:home:page"]);
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState({
    tracks: [],
    albums: [],
    playlists: [],
    artists: [],
    episodes: [],
    shows: [],
  });

  const [queueQueue, setQueueQueue] = useState([]);
  const [immediateQueue, setImmediateQueue] = useState([]);

  const searchContainer = useRef(null);
  const [searchContainerWidth, setSearchContainerWidth] = useState("100%");

  useEffect(() => {
    const mousemoveHandler = (e) => {
      console.log(e);
      console.log(searchContainer.current.offsetWidth);
      if (searchContainer.current.offsetWidth !== searchContainerWidth)
        setSearchContainerWidth(searchContainer.current.offsetWidth);
    };

    const mouseupHandler = () => {
      window.removeEventListener("mousemove", mousemoveHandler);
      window.removeEventListener("mouseup", mouseupHandler);
    };

    const mousedownHandler = () => {
      window.addEventListener("mousemove", mousemoveHandler);
      window.addEventListener("mouseup", mouseupHandler);
    };

    window.addEventListener("mousedown", mousedownHandler);

    return () => {
      window.removeEventListener("mousedown", mousedownHandler);
    };
  });

  useEffect(() => {
    if (!accessToken) return;
    (async function () {
      const id = await spotifyFetch.getMe(accessToken);
      setUser(id);
    })();
  }, [accessToken, setUser]);

  useEffect(() => {
    if (user) {
      socket.emit("setUser", user);
    }
  }, [user, socket]);

  return (
    <TokenContext.Provider value={accessToken}>
      <div
        className='d-flex bg-dark text-light h-100'
        style={{
          flex: "1 1 auto",
          paddingBottom: "8px",
        }}
      >
        <LinksBar
          accessToken={accessToken}
          index={index}
          setIndex={setIndex}
          expanded={expanded}
          setExpanded={setExpanded}
          setSearching={setSearching}
          setSearch={setSearch}
          user={user}
          socket={socket}
        />
        <div
          className='d-flex flex-column bg-dark text-light h-100'
          style={{ flex: "1 1 auto" }}
        >
          <SearchBar
            index={index}
            setIndex={setIndex}
            expanded={expanded}
            setExpanded={setExpanded}
            setSearching={setSearching}
            setSearchResult={setSearchResult}
            searching={searching}
            search={search}
            setSearch={setSearch}
          />
          <div className='playlist'>
            <div
              ref={searchContainer}
              style={{ height: "100%", width: "100%" }}
            >
              {searching ? (
                <Container className='playlist' fluid>
                  <SearchResults
                    index={index}
                    setIndex={setIndex}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    searchResult={searchResult}
                    socket={socket}
                    queueQueue={queueQueue}
                    setQueueQueue={setQueueQueue}
                    immediateQueue={immediateQueue}
                    setImmediateQueue={setImmediateQueue}
                    width={searchContainer.current.offsetWidth}
                  />
                </Container>
              ) : null}
            </div>
            <Queue
              queueQueue={queueQueue}
              setQueueQueue={setQueueQueue}
              immediateQueue={immediateQueue}
              setImmediateQueue={setImmediateQueue}
              setExpanded={setExpanded}
              setSearching={setSearching}
              searching={searching}
              expanded={expanded}
              socket={socket}
            />
          </div>
        </div>
      </div>
    </TokenContext.Provider>
  );
}
