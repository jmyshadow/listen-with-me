import React, { useState, useEffect } from "react";

export default function LinksBarPlaylist({
  playlist,
  setExpanded,
  setSearching,
}) {
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    setPlaylistName(playlist.name);
  }, [playlist]);

  function expandPlaylist() {
    setExpanded([playlist.uri]);
    setSearching(true);
  }

  return (
    <div className='clickable my-playlists-item p-1' onClick={expandPlaylist}>
      {" "}
      {playlistName}{" "}
    </div>
  );
}
