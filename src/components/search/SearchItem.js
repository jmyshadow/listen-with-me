import React, { useContext, useEffect, useState } from "react";
import { Col, Media } from "react-bootstrap";
import { TokenContext, QueueContext } from "../context/SpotifyContext";
import * as spotifyFetch from "../utilities/spotifyFetch.js";

export default function SearchItem({ item, expanded, setExpanded }) {
  const { playQueue, setPlayQueue } = useContext(QueueContext);
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
      console.log(track.artist);
      array[index] = {
        song: track.name,
        artist: track.artists,
        album: track.album.name,
        duration: track.duration_ms,
        uri: track.uri,
        id: track.id,
      };
    });
    setPlayQueue([...array, ...playQueue]);
  }

  function expandSearch() {
    setExpanded([...expanded, item.uri]);
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
        setPlayQueue([addToQueue, ...playQueue]);
        break;
      case "artist":
        await spotifyFetch.artists(item.id, accessToken).then((res) => {
          const addToQueue = res.artistTracks;
          addToBeginning(addToQueue);
        });
        break;
      case "album":
        await spotifyFetch.albums(item.id, accessToken).then((res) => {
          const addToQueue = res.albumData.tracks.items;
          const albumName = res.albumData.name;
          addToQueue.forEach((track) => {
            track.album = [albumName];
            track.album.name = albumName;
          });
          addToBeginning(addToQueue);
        });
        break;
      case "playlist":
        await spotifyFetch.playlists(item.id, accessToken).then((res) => {
          const addToQueue = res.playlistTracks;
          addToQueue.forEach((item, index) => {
            addToQueue[index] = item.track;
          });
          addToBeginning(addToQueue);
        });
        break;
      case "episode":
        await spotifyFetch.episodes(item.id, accessToken).then((res) => {
          console.log(res);
          const addToQueue = res.episodeData;
          addToQueue.forEach((episode, index) => {
            addToQueue[index].artists = [["", ""]];
            addToQueue[index].album = episode.show;
          });
          addToBeginning(addToQueue);
        });
        break;
      case "show":
        await spotifyFetch.shows(item.id, accessToken).then((res) => {
          console.log(res);
          const addToQueue = res.episodeData;
          const showName = res.showName;
          addToQueue.forEach((episode, index) => {
            addToQueue[index].artists = [["", ""]];
            addToQueue[index].album = [showName];
            addToQueue[index].album.name = showName;
          });
          addToBeginning(addToQueue);
        });
        break;
      default:
        break;
    }
  }
  console.log("searchitem rendered");

  return (
    <Col>
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
