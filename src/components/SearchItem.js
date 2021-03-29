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
}) {
  const host = "http://localhost:3001/";

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

  function queueTrack(id) {
    axios
      .post(
        `https://api.spotify.com/v1/me/player/queue?uri=spotify%3Atrack%3A${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then(() => {
        console.log("track queued");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getTrackUris(track) {
    const artist = track.artists.map((artist) => [artist.name, artist.uri]);
    setPlayQueue([
      {
        song: track.name,
        artist: artist,
        album: track.album.name,
        duration: track.duration_ms,
        uri: track.uri,
        id: track.id,
      },
      ...playQueue,
    ]);
    return [track.uri];
  }

  function getArtistUris(artist) {
    // look up artist and grab top 10 songs, then return array of track objects
    const id = artist.id;
    const tracks = [];
    axios
      .post(`${host}artisttoptracks`, { accessToken, id })
      .then((res) => {
        res.data.tracks.forEach((track) => {
          tracks.push({
            song: track.name,
            artist: [item.name, item.uri],
            album: track.album.name,
            duration: track.duration_ms,
            uri: track.uri,
            id: track.id,
          });
        });
        setPlayQueue([...tracks, ...playQueue]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getAlbumUris(album) {
    const artist = album.artists.map((artist) => [artist.name, artist.uri]);
    const id = album.id;
    const tracks = [];
    axios
      .post(`${host}albumTracks`, { accessToken, id })
      .then((res) => {
        res.data.items.map((track) =>
          tracks.push({
            song: track.name,
            artist: artist,
            album: album.name,
            duration: track.duration_ms,
            uri: track.uri,
            id: track.id,
          })
        );
        setPlayQueue([...tracks, ...playQueue]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getPlaylistUris() {
    console.log(item);
  }

  function getEpisodeUris() {
    console.log(item);
  }

  function getShowUris() {
    console.log(item);
  }

  async function playImmediately() {
    // get function to make appropriate call (if needed) back to spotify
    const getUris = getUriFunction();
    const uris = await getUris(item);
    console.log(uris);
    //   setPlayQueue([...playQueueInfo, ...playQueue]);
  }

  function expandSearch() {
    console.log("expanded");
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
