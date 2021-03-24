import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";

export default function SearchBar({ setTracks, accessToken, setSearching }) {
  const host = "http://localhost:3001/";
  let [search, setSearch] = useState("");

  function clearResults() {
    setSearching(false);
    setSearch("");
  }

  function processSearchInput(e) {
    setSearch(e.target.value);
    e.target.value.length === 0 ? clearResults() : getSearchResults();
  }

  function getSearchResults() {
    setSearching(true);
    axios
      .post(`${host}search`, { accessToken, search })
      .then((res) => {
        setTracks(res.data.tracks.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <InputGroup className='p-3'>
        <FormControl
          placeholder='Search Tracks, Artists, Albums, Podcasts...'
          value={search}
          onChange={processSearchInput}
        />
        <InputGroup.Append>
          <Button
            variant='primary'
            className={search ? "d-block" : "d-none"}
            onClick={clearResults}
          >
            Back
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
