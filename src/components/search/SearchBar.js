import React, { useState, useEffect, useContext, useRef } from "react";
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
  search,
  setSearch,
}) {
  const accessToken = useContext(TokenContext);
  const throttledSearch = useRef("");

  function prevResult() {
    if (index > 0) setIndex(index - 1);
    else if (!search) {
      setSearching(false);
      setIndex(0);
      setExpanded(["search:home:page"]);
    }
  }

  function nextResult() {
    setIndex(index + 1);
  }

  function cleanupSearch() {
    setExpanded(["search:home:page"]);
    setSearch("");
    setIndex(0);
    setSearching(false);
  }

  // useEffect(() => {
  //   if (!accessToken) return;
  // if (!search) {
  //   setExpanded(["search:home:page"]);
  //   setIndex(0);
  //   setSearchResult({
  //     tracks: [],
  //     artists: [],
  //     albums: [],
  //     playlists: [],
  //     shows: [],
  //     episodes: [],
  //   });
  //   setSearching(false);
  //   return;
  // }
  // setSearching(true);
  // throttledSearch.current = search;
  // setTimeout(() => {
  //   if (throttledSearch.current === search) {
  //     axios
  //       // .post(`${host}search`, { accessToken, search, types, options })
  //       .get(
  //         `https://api.spotify.com/v1/search?q=${search.replaceAll(
  //           " ",
  //           "%20"
  //         )}&type=artist%2Ctrack%2Calbum%2Cplaylist%2Cshow%2Cepisode&limit=6`,
  //         {
  //           headers: { Authorization: "Bearer " + accessToken },
  //         }
  //       )
  //       .then((res) => {
  //         setSearchResult({
  //           tracks: res.data.tracks.items,
  //           albums: res.data.albums.items,
  //           playlists: res.data.playlists.items,
  //           artists: res.data.artists.items,
  //           episodes: res.data.episodes.items,
  //           shows: res.data.shows.items,
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, 300);
  // }, [
  //   accessToken,
  //   search,
  //   setSearching,
  //   setSearchResult,
  //   setExpanded,
  //   setIndex,
  // ]);

  // useEffect(() => {
  //   setExpanded(["search:home:page"]);
  //   setIndex(0);
  // }, [search, setExpanded, setIndex]);

  function changeSearchString(val) {
    setSearch(val);
    setIndex(0);
    if (!val) {
      setExpanded(["search:home:page"]);
      setSearchResult({
        tracks: [],
        artists: [],
        albums: [],
        playlists: [],
        shows: [],
        episodes: [],
      });
      setSearching(false);
    } else {
      setSearching(true);
      throttledSearch.current = val;
      setTimeout(() => {
        if (throttledSearch.current === val) {
          axios
            // .post(`${host}search`, { accessToken, search, types, options })
            .get(
              `https://api.spotify.com/v1/search?q=${val.replaceAll(
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
        }
      }, 300);
    }
  }
  //#1e2124
  return (
    <div style={{ backgroundImage: "linear-gradient(black,#343a40" }}>
      <InputGroup className='px-3 py-4'>
        <FormControl
          placeholder='Search Tracks, Artists, Albums, Podcasts...'
          value={search}
          onChange={(e) => changeSearchString(e.target.value)}
          autoFocus
        />
        <InputGroup.Append>
          <Button
            variant='success'
            className={searching ? "d-block" : "d-none"}
            onClick={() => prevResult("")}
            disabled={expanded.length === 0}
          >
            {"<"}
          </Button>
        </InputGroup.Append>
        <InputGroup.Append>
          <Button
            variant='success'
            className={searching ? "d-block" : "d-none"}
            onClick={() => nextResult("")}
            disabled={index >= expanded.length - 1}
          >
            {">"}
          </Button>
        </InputGroup.Append>
        <InputGroup.Append>
          <Button
            variant='success'
            disabled={!searching}
            onClick={() => cleanupSearch()}
          >
            {"X"}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
