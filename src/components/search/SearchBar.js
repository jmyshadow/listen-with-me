import React, { useState, useEffect, useContext } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { TokenContext } from "../context/SpotifyContext";
import axios from "axios";

export default function SearchBar({
  setSearchResult,
  setSearching,
  expanded,
  setExpanded,
  index,
  setIndex,
  searching,
}) {
  const accessToken = useContext(TokenContext);

  let [search, setSearch] = useState("");

  function prevResult() {
    if (index > 0) setIndex(index - 1);
    else {
      setExpanded([]);
      if (!search) setSearching(false);
    }
  }

  function nextResult() {
    setIndex(index + 1);
  }

  function cleanupSearch() {
    setExpanded([]);
    setSearch("");
    setIndex(0);
    setSearching(false);
  }

  // useEffect(() => {
  //   setExpanded([]);
  // }, [search, setExpanded]);

  useEffect(() => {
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
      // .post(`${host}search`, { accessToken, search, types, options })
      .get(
        `https://api.spotify.com/v1/search?q=${search.replaceAll(
          " ",
          "%20"
        )}&type=artist%2Ctrack%2Calbum%2Cplaylist%2Cshow%2Cepisode&limit=6`,
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
      )
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

  useEffect(() => {
    setExpanded([]);
    setIndex(0);
  }, [search, setExpanded, setIndex]);

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
            className={searching ? "d-block" : "d-none"}
            onClick={() => prevResult("")}
            disabled={expanded.length === 0}
          >
            {"<"}
          </Button>
        </InputGroup.Append>
        <InputGroup.Append>
          <Button
            variant='primary'
            className={searching ? "d-block" : "d-none"}
            onClick={() => nextResult("")}
            disabled={index >= expanded.length - 1}
          >
            {">"}
          </Button>
        </InputGroup.Append>
        <InputGroup.Append>
          <Button
            variant='primary'
            className={searching ? "d-block" : "d-none"}
            onClick={() => cleanupSearch()}
          >
            {"X"}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
