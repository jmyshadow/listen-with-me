import React, { useState, useEffect } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";

export default function SearchBar({
  setSearchResult,
  accessToken,
  setSearching,
}) {
  const host = "http://localhost:3001/";

  let [search, setSearch] = useState("");

  useEffect(() => {
    const types = ["album", "artist", "track", "show", "playlist", "episode"];
    const options = { limit: 6 };

    if (!accessToken) return;
    if (!search) {
      setSearchResult({
        tracks: { items: [], next: null },
        artists: { items: [], next: null },
        albums: { items: [], next: null },
        playlists: { items: [], next: null },
        episodes: { items: [], next: null },
        shows: { items: [], next: null },
      });
      setSearching(false);
      return;
    }
    setSearching(true);
    axios
      .post(`${host}search`, { accessToken, search, types, options })
      .then((res) => {
        setSearchResult({
          tracks: {
            items: res.data.tracks.items,
            next: res.data.tracks.next,
          },
          artists: {
            items: res.data.artists.items,
            next: res.data.tracks.next,
          },
          albums: {
            items: res.data.albums.items,
            next: res.data.albums.next,
          },
          playlists: {
            items: res.data.playlists.items,
            next: res.data.playlists.next,
          },
          episodes: {
            items: res.data.episodes.items,
            next: res.data.episodes.next,
          },
          shows: {
            items: res.data.shows.items,
            next: res.data.shows.next,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken, search, setSearching, setSearchResult]);

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
            onClick={() => setSearch("")}
          >
            Back
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
