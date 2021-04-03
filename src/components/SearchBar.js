import React, { useState, useEffect } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";

export default function SearchBar({
  setSearchResult,
  accessToken,
  setSearching,
  expanded,
  setExpanded,
  index,
  setIndex,
}) {
  // export default function SearchBar({ fun }) {
  //   const mine = fun();
  //   console.log(mine);
  //   const setSearchResult = mine.setSearchResult,
  //     accessToken = mine.accessToken,
  //     setSearching = mine.setSearching,
  //     expanded = mine.expanded,
  //     setExpanded = mine.setExpanded,
  //     index = mine.index,
  //     setIndex = mine.setIndex;

  const host = "http://localhost:3001/";

  let [search, setSearch] = useState("");

  function prevResult() {
    if (index > 0) setIndex(index - 1);
    else setExpanded([]);
  }

  function nextResult() {
    setIndex(index + 1);
  }

  useEffect(() => {
    const types = ["album", "artist", "track", "show", "playlist", "episode"];
    //const types = ["album"];
    const options = { limit: 6 };

    if (!accessToken) return;
    if (!search) {
      setExpanded([]);
      setIndex(0);
      setSearchResult({
        tracks: [],
        artists: [],
        albums: [],
        playlists: [],
        shows: [],
        episodes: [],
      });
      setSearching(false);
      return;
    }
    setSearching(true);
    axios
      .post(`${host}search`, { accessToken, search, types, options })
      .then((res) => {
        setSearchResult({
          tracks: res.data.tracks.items,
          albums: res.data.albums.items,
          playlists: res.data.playlists.items,
          artists: res.data.artists.items,
          episodes: res.data.episodes.items,
          shows: res.data.shows.items,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    accessToken,
    search,
    setSearching,
    setSearchResult,
    setExpanded,
    setIndex,
  ]);

  console.log("searchbar rendered");
  return (
    <div>
      <InputGroup className='p-3'>
        <FormControl
          placeholder='Search Tracks, Artists, Albums, Podcasts...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
        <InputGroup.Append>
          <Button
            variant='primary'
            className={search ? "d-block" : "d-none"}
            onClick={() => prevResult("")}
            disabled={expanded.length === 0}
          >
            {"<"}
          </Button>
        </InputGroup.Append>
        <InputGroup.Append>
          <Button
            variant='primary'
            className={search ? "d-block" : "d-none"}
            onClick={() => nextResult("")}
            disabled={index >= expanded.length - 1}
          >
            {">"}
          </Button>
        </InputGroup.Append>
        <InputGroup.Append>
          <Button
            variant='primary'
            className={search ? "d-block" : "d-none"}
            onClick={() => setSearch("")}
          >
            {"X"}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
