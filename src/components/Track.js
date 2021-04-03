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

  console.log("track rendered");
  return (
    <div>
      <img
        src={track.album.images[2].url}
        className='float-sm-left mr-5'
        alt='new'
      />

      <ul>
        <li key={name}> {name} </li>
        <li key={album.id}> Album: {album} </li>
        <li key={artist.id}> Artist: {artist} </li>
      </ul>
    </div>
  );
}
