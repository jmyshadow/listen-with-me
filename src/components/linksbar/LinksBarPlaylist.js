import React, { useState, useEffect } from "react";

export default function LinksBarPlaylist({
  playlist,
  index,
  setIndex,
  expanded,
  setExpanded,
  setSearching,
  setSearch,
}) {
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    setPlaylistName(playlist.name);
  }, [playlist]);

  function expandPlaylist() {
    //setSearch(playlist.name);
    //   setTimeout(() => {
    setExpanded([playlist.uri]);
    //   setIndex(index + 1);
    //   }, 3000);
    setSearching(true);
  }

  return (
    <div className='clickable my-playlists-item p-1' onClick={expandPlaylist}>
      {" "}
      {playlistName}{" "}
    </div>
  );
}
