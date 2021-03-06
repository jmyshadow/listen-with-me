import React, { useContext } from "react";
import { Col, Media } from "react-bootstrap";
import { TokenContext } from "../context/SpotifyContext";
import * as spotifyFetch from "../utilities/spotifyFetch.js";

export default function SearchItem({
  setIndex,
  item,
  expanded,
  setExpanded,
  queueQueue,
  setQueueQueue,
  immediateQueue,
  setImmediateQueue,
  width,
}) {
  const accessToken = useContext(TokenContext);

  const defaultImg = "../images/qmark.jpg";
  let imgUrl =
    item.type === "track"
      ? item.album.images[1]
        ? item.album.images[1].url
        : defaultImg
      : item.images[0]
      ? item.images[0].url
      : defaultImg;

  function addToBeginning(array) {
    array.forEach((track, index) => {
      array[index] = {
        song: track.name,
        artist: track.artists,
        album: track.album.name,
        duration: track.duration_ms,
        uri: track.uri,
        id: track.id,
      };
    });
    const add = [...array, ...immediateQueue];
    setImmediateQueue(add);
    const newQueue = add.map((track) => track.uri);
    spotifyFetch.playNow(newQueue, accessToken);
  }

  function expandSearch() {
    setIndex(1);
    setExpanded(["search:home:page", item.uri]);
  }

  async function playImmediately() {
    switch (item.type) {
      case "track":
        const track = item;
        const addToQueue = {
          song: track.name,
          artist: track.artists,
          album: track.album.name,
          duration: track.duration_ms,
          uri: track.uri,
          id: track.id,
        };
        setImmediateQueue([addToQueue, ...immediateQueue]);
        spotifyFetch.playNow([track.uri], accessToken);
        break;
      case "artist":
        await spotifyFetch.artists(item.id, accessToken).then((res) => {
          addToBeginning(res.artistTracks);
        });
        break;
      case "album":
        await spotifyFetch.albums(item.id, accessToken).then((res) => {
          addToBeginning(res.albumTracks);
        });
        break;
      case "playlist":
        await spotifyFetch.playlists(item.id, accessToken).then((res) => {
          addToBeginning(res.playlistTracks);
        });
        break;
      case "episode":
        await spotifyFetch.episodes(item.id, accessToken).then((res) => {
          addToBeginning(res);
        });
        break;
      case "show":
        await spotifyFetch.shows(item.id, accessToken).then((res) => {
          addToBeginning(res.episodes);
        });
        break;
      default:
        break;
    }
  }

  return (
    <Col
      className='search-item p-2 clickable-icon w-100'
      style={{ minWidth: width }}
    >
      <Media className='px-2'>
        <img
          src={imgUrl}
          alt='no img'
          height='75px'
          width='75px'
          onClick={playImmediately}
        />
        <Media.Body
          className='pl-2 w-100'
          onClick={expandSearch}
          style={{ height: "75px", overflow: "hidden" }}
        >
          {item.name}
        </Media.Body>
      </Media>
    </Col>
  );
}
