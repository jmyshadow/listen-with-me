import React, { useState } from "react";
import SearchBar from "./search/SearchBar";
import SearchResults from "./search/SearchResults";
import Queue from "./Queue";

export default function MainSearch({ spotifyQueue, setSpotifyQueue }) {
  const [searching, setSearching] = useState("");
  const [expanded, setExpanded] = useState([]);
  const [index, setIndex] = useState(0);
  const [searchResult, setSearchResult] = useState({
    tracks: [],
    albums: [],
    playlists: [],
    artists: [],
    episodes: [],
    shows: [],
  });

  return (
    <div className='d-flex flex-column bg-success h-100 w-100'>
      <SearchBar
        // accessToken={accessToken}
        index={index}
        setIndex={setIndex}
        expanded={expanded}
        setExpanded={setExpanded}
        setSearching={setSearching}
        setSearchResult={setSearchResult}
      />
      <div className='bg-primary playlist'>
        {searching ? (
          <SearchResults
            index={index}
            setIndex={setIndex}
            expanded={expanded}
            setExpanded={setExpanded}
            searchResult={searchResult}
            spotifyQueue={spotifyQueue}
            setSpotifyQueue={setSpotifyQueue}
          />
        ) : (
          <Queue />
        )}
      </div>
    </div>
  );
}
