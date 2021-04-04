import React, { useContext } from "react";
import { Col, Media } from "react-bootstrap";
import axios from "axios";
import { TokenContext, QueueContext } from "../context/SpotifyContext";

export default function SearchItem({
  item,
  expanded,
  setExpanded,
  spotifyQueue,
  setSpotifyQueue,
}) {
  const accessToken = useContext(TokenContext);
  const { playQueue, setPlayQueue } = useContext(QueueContext);
  const defaultImg = "../images/qmark.jpg";
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
    const tracks = await axios
      .get(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=from_token`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => {
        const tracks = res.data.tracks.map((track) => {
          return {
            song: track.name,
            artist: artist,
            album: track.album.name,
            duration: track.duration_ms,
            uri: track.uri,
            id: track.id,
          };
        });
        return tracks;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    console.log(tracks);
    return tracks;
  }

  async function getAlbumUris(album) {
    const artist = album.artists.map((artist) => [artist.name, artist.uri]);
    const id = album.id;
    const tracks = await axios
      .get(`https://api.spotify.com/v1/albums/${id}`, {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((res) => {
        const tracks = res.data.tracks.items.map((track) => {
          return {
            song: track.name,
            artist: artist,
            album: album.name,
            duration: track.duration_ms,
            uri: track.uri,
            id: track.id,
          };
        });
        return tracks;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    return tracks;
  }

  async function getPlaylistUris(playlist) {
    const id = playlist.id;
    const tracks = await axios
      .get(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((res) => {
        const tracks = res.data.tracks.items.map((track) => {
          return {
            song: track.name,
            artist: track.track.artists,
            album: track.track.album.name,
            duration: track.track.duration_ms,
            uri: track.uri,
            id: track.id,
          };
        });
        return tracks;
      })
      .catch((err) => {
        console.log(err);
        return [];
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
    const tracks = await axios
      .get(`https://api.spotify.com/v1/shows/${id}/episodes`, {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((res) => {
        const tracks = res.data.items.map((episode) => {
          return {
            song: episode.name,
            artist: [" ", " "],
            album: show.name,
            duration: episode.duration_ms,
            uri: episode.uri,
            id: episode.id,
          };
        });
        return tracks;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    return tracks;
  }

  async function playImmediately() {
    // get function to make appropriate call (if needed) back to spotify
    const getUris = getUriFunction();
    const tracks = await getUris(item);
    const uris = tracks.map((track) => track.uri);
    setPlayQueue([...tracks, ...playQueue]);
    setSpotifyQueue([...uris, ...spotifyQueue]);
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
  console.log("searchitem rendered");
  return (
    <Col>
      {/* <div className='d-flex flex-nowrap flex-row pb-1'>
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
      </div> */}
      <Media onClick={playImmediately}>
        <img src={imgUrl} alt='no img' height='75px' width='75px' />

        <Media.Body
          className='pl-2 w-100'
          onClick={expandSearch}
          style={{ height: "75px", overflow: "hidden", minWidth: "75px" }}
        >
          {item.name}
        </Media.Body>
      </Media>
    </Col>
  );
}
