import React, { useContext, useEffect, useState, useRef } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { QueueContext, TokenContext } from "../context/SpotifyContext";
import NowPlaying from "./NowPlaying";
import SPlayer from "./SPlayer";
import QueueItem from "./QueueItem";
import FASIcon from "../generic/FASIcon";
import useSpotifyConnect from "../hooks/useSpotifyConnect";
import * as spotifyFetch from "../utilities/spotifyFetch.js";

export default function Queue({
  searching,
  setSearching,
  setExpanded,
  expanded,
  socket,
}) {
  // song:
  // artist:
  // album:
  // duration:
  // uri:
  // id:

  const accessToken = useContext(TokenContext);
  const { playQueue, setPlayQueue } = useContext(QueueContext);
  const { player, nowPlaying, paused } = useSpotifyConnect(accessToken);
  const [lastTrack, setLastTrack] = useState("");
  const [currentTrack, setCurrentTrack] = useState("");
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [solo, setSolo] = useState(true);
  const oldVol = useRef(null);
  // const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!nowPlaying) return;
    //   if (!lastTrack) {
    //     setLastTrack(nowPlaying.track_window.previous_tracks[1]);
    //     setCurrentTrack(nowPlaying.track_window.current_track);
    //     return;
    //   }
    const playingTrack = nowPlaying.track_window.current_track;
    console.log(nowPlaying);
    if (playingTrack.uri !== currentTrack) {
      if (playingTrack.uri === lastTrack) {
        setPlayQueue([
          {
            song: playingTrack.name,
            artist: [
              {
                name: playingTrack.artists[0].name,
                uri: playingTrack.artists[0].uri,
              },
            ],
            album: playingTrack.album.name,
            duration: playingTrack.duration_ms,
            uri: playingTrack.uri,
            id: playingTrack.id,
          },
          ...playQueue,
        ]);
      } else {
        const newQueue = playQueue;
        if (needsUpdate) {
          setNeedsUpdate(false);
          const uris = newQueue.map((track) => track.uri);
          spotifyFetch.playNow(uris, accessToken);
        } else {
          newQueue.shift();
          setPlayQueue(newQueue);
        }
      }
      setCurrentTrack(playingTrack.uri);
      const thePreviousTracks = nowPlaying.track_window.previous_tracks;
      if (thePreviousTracks.length > 0)
        // setLastTrack(thePreviousTracks[thePreviousTracks.length - 1].uri);
        setLastTrack(thePreviousTracks[0].uri);
    }
  }, [
    accessToken,
    currentTrack,
    lastTrack,
    needsUpdate,
    nowPlaying,
    playQueue,
    setPlayQueue,
  ]);

  function removeItem(index) {
    const newQueue = [...playQueue];
    newQueue.splice(index, 1);
    setPlayQueue([...newQueue]);
    setNeedsUpdate(true);
    socket.emit("removedItem", newQueue);
  }

  function playItem(index) {
    const playNow = playQueue[index];
    const newQueue = [...playQueue];
    newQueue.splice(index, 1);
    newQueue.unshift(playNow);
    setPlayQueue([...newQueue]);
    const uris = newQueue.map((track) => track.uri);
    spotifyFetch.playNow(uris, accessToken);
    socket.emit("playItem", newQueue, uris);
  }

  useEffect(() => {
    socket.on("isOnlyUser", (isSolo) => {
      setSolo(isSolo);
    });

    if (!player || !nowPlaying) return;

    socket.on("getPlaylist", (reqUser) => {
      player.getCurrentState().then((state) => {
        if (!state) {
          console.error(
            "User is not playing music through the Web Playback SDK"
          );
          return;
        }
        const playingTrack = state.track_window.current_track;
        const position = state.position;
        const syncQueue = [
          {
            song: playingTrack.name,
            artist: [
              {
                name: playingTrack.artists[0].name,
                uri: playingTrack.artists[0].uri,
              },
            ],
            album: playingTrack.album.name,
            duration: playingTrack.duration_ms,
            uri: playingTrack.uri,
            id: playingTrack.id,
          },
          ...playQueue,
        ];
        socket.emit("returnPlaylist", reqUser, syncQueue, position);
      });
    });

    socket.on("updatePlaylist", (playlist, position) => {
      const uris = playlist.map((track) => track.uri);
      setPlayQueue(playlist);
      spotifyFetch.playNow(uris, accessToken, position);
    });

    socket.on("queueSong", (song) => {
      spotifyFetch.queueSong(song, accessToken);
    });

    socket.on("allNext", () => {
      player.nextTrack();
    });
    socket.on("allPrev", () => {
      player.previousTrack();
    });

    socket.on("otherPlayItem", (newQueue, uris) => {
      setPlayQueue([...newQueue]);
      spotifyFetch.playNow(uris, accessToken);
    });

    socket.on("otherRemovedItem", (newQueue) => {
      setPlayQueue([...newQueue]);
      setNeedsUpdate(true);
    });

    return () => {
      socket.off("allNext");
      socket.off("allPrev");
      socket.off("updatePlaylist");
      socket.off("getPlaylist");
      socket.off("isOnlyUser");
    };
  }, [
    accessToken,
    nowPlaying,
    paused,
    playQueue,
    player,
    setPlayQueue,
    socket,
    solo,
  ]);

  function nextSong() {
    player.nextTrack();
    socket.emit("next");
  }

  function prevSong() {
    player.previousTrack();
    socket.emit("prev");
  }

  function togglePlay() {
    if (solo) {
      player.togglePlay();
    } else if (oldVol.current) {
      player.setVolume(oldVol.current);
    } else {
      player.getVolume().then((vol) => (oldVol.current = vol));
      //temporary, need to actually figure out mute situation
      player.setVolume(0.1);
    }
  }

  return (
    <>
      <Container className={searching ? "hideQueue" : "queue"} fluid>
        <NowPlaying nowPlaying={nowPlaying} />
        {/** adding random number to entry id, in case same song queued more than once */}
        <Row className='mx-4 px-4 py-2 border-bottom border-dark' noGutters>
          <Col style={{ paddingTop: "1.25rem" }}>
            <h1> {playQueue.length > 0 ? "Up Next:" : "Nothing Queued!"} </h1>
          </Col>
        </Row>
        {playQueue.map((entry, index) => (
          <Row
            key={entry.id + Math.floor(Math.random() * 100000)}
            className='row-nowrap nowPlaying pt-1'
            style={{ height: "2rem" }}
            noGutters
          >
            <Col sm='auto'>
              <FASIcon
                iClass='fas fa-play fa-lg clickable-icon rounded-circle'
                iFunction={() => playItem(index)}
                iStyle={{ marginRight: "10px" }}
              />
            </Col>
            <QueueItem
              entry={entry}
              setExpanded={setExpanded}
              setSearching={setSearching}
              expanded={expanded}
            />
            <Col sm='auto'>
              <FASIcon
                iClass='fas fa-times-circle fa-lg clickable-icon rounded-circle'
                iFunction={() => removeItem(index)}
                iStyle={{ marginLeft: "10px" }}
              />
            </Col>
          </Row>
        ))}
      </Container>
      <SPlayer
        prev={prevSong}
        play={togglePlay}
        next={nextSong}
        nowPlaying={nowPlaying}
        paused={paused}
        player={player}
        socket={socket}
      />
    </>
  );
}
