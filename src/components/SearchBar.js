import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";

export default function SearchBar({ tracks, setTracks, accessToken }) {
  const host = "http://localhost:3001/";
  let [search, setSearch] = useState("");

  function getSearchResults() {
    axios
      .post(`${host}search`, { accessToken, search })
      .then((res) => {
        console.log(res.data.tracks.items);
        setTracks(res.data.tracks.items);
        console.log(tracks);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <InputGroup className='mb-3'>
        <FormControl
          placeholder='Search Tracks, Artists, Albums, Podcasts...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroup.Append>
          <Button variant='success' onClick={getSearchResults}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
