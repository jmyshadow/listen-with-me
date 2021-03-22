import React from "react";

export default function Track({ track }) {
  const [
    album,
    albumId,
    albumHref,
    albumUri,
    artist,
    artistId,
    id,
    name,
    href,
    uri,
  ] = [
    track.album.name,
    track.album.id,
    track.album.href,
    track.album.uri,
    track.artists[0].name,
    track.artists[0].id,
    track.id,
    track.name,
    track.href,
    track.uri,
  ];
  return (
    <>
      <ul>
        {name}
        <br></br>
        <img src={track.album.images[1].url} alt='new' />
        <br></br>
        <li key={album.id}> Album: {album} </li>
        <li key={artist.id}> Artist: {artist} </li>
      </ul>
      <br></br>
    </>
  );
}
