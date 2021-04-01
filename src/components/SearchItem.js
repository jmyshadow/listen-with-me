import React from "react";
import { Col } from "react-bootstrap";
import axios from "axios";

export default function SearchItem({
  item,
  playQueue,
  setPlayQueue,
  accessToken,
  expanded,
  setExpanded,
  spotifyQueue,
  setSpotifyQueue,
}) {
  const defaultImg = "./fav.ico";
  let imgUrl =
    item.type === "track"
      ? item.album.images[1]
        ? item.album.images[1].url
        : defaultImg
      : item.images[0]
      ? item.images[0].url
      : defaultImg;

  // write functions to deal with promises and setting up track uri in one function

  async function getTrackUris(track) {
    const artist = track.artists.map((artist) => [artist.name, artist.uri]);
    return [
      {
        song: track.name,
        artist: artist,
        album: track.album.name,
        duration: track.duration_ms,
        uri: track.uri,
        id: track.id,
      },
      ...playQueue,
    ];
  }

  async function getArtistUris(artist) {
    // look up artist and grab top 10 songs, then return array of track objects
    const id = artist.id;
    const tracks = [];
    axios
      .get(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=from_token`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => {
        res.data.tracks.forEach((track) => {
          tracks.push({
            song: track.name,
            artist: artist,
            album: track.album.name,
            duration: track.duration_ms,
            uri: track.uri,
            id: track.id,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return tracks;
  }

  async function getAlbumUris(album) {
    const artist = album.artists.map((artist) => [artist.name, artist.uri]);
    const id = album.id;
    const tracks = [];
    axios
      .get(`https://api.spotify.com/v1/albums/${id}`, {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((res) => {
        res.data.tracks.items.forEach((track) => {
          tracks.push({
            song: track.name,
            artist: artist,
            album: album.name,
            duration: track.duration_ms,
            uri: track.uri,
            id: track.id,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return tracks;
  }

  async function getPlaylistUris(playlist) {
    const id = playlist.id;
    const tracks = [];
    axios
      .get(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((res) => {
        res.data.tracks.items.forEach((track) => {
          tracks.push({
            song: track.name,
            artist: track.track.artists,
            album: track.track.album.name,
            duration: track.track.duration_ms,
            uri: track.uri,
            id: track.id,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return tracks;
  }

  async function getEpisodeUris(episode) {
    return [
      {
        song: episode.name,
        artist: [" ", " "],
        album: episode.name,
        duration: episode.duration_ms,
        uri: episode.uri,
        id: episode.id,
      },
    ];
  }

  async function getShowUris(show) {
    const id = show.id;
    const tracks = [];
    axios
      .get(`https://api.spotify.com/v1/shows/${id}/episodes`, {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((res) => {
        res.data.items.forEach((episode) => {
          tracks.push({
            song: episode.name,
            artist: [" ", " "],
            album: show.name,
            duration: episode.duration_ms,
            uri: episode.uri,
            id: episode.id,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return tracks;
  }

  async function playImmediately() {
    // get function to make appropriate call (if needed) back to spotify
    const getUris = getUriFunction();
    const tracks = await getUris(item);
    setPlayQueue([...tracks, ...playQueue]);
    setSpotifyQueue([...tracks.map((item) => item.uri), ...spotifyQueue]);
  }

  function expandSearch() {
    setExpanded([...expanded, item.uri]);
  }

  function getUriFunction() {
    switch (item.type) {
      case "track":
        return getTrackUris;
      case "artist":
        return getArtistUris;
      case "album":
        return getAlbumUris;
      case "playlist":
        return getPlaylistUris;
      case "episode":
        return getEpisodeUris;
      case "show":
        return getShowUris;
      default:
    }
  }

  return (
    <Col>
      <div className='d-flex flex-nowrap flex-row pb-1'>
        <div
          onClick={playImmediately}
          style={{ width: "75px", height: "75px" }}
        >
          <img src={imgUrl} alt='no img' height='75px' width='75px' />
        </div>
        <div
          className='pl-2 w-100'
          onClick={expandSearch}
          style={{ height: "75px", overflow: "hidden" }}
        >
          {item.name}
        </div>
      </div>
    </Col>
  );
}
