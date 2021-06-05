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
  queueQueue,
  setQueueQueue,
  immediateQueue,
  setImmediateQueue,
}) {
  // song:
  // artist:
  // album:
  // duration:
  // uri:
  // id:

  const accessToken = useContext(TokenContext);
  const { player, nowPlaying, paused } = useSpotifyConnect(accessToken);
  const currentTrackRef = useRef(null);
  const [solo, setSolo] = useState(true);
  const oldVol = useRef(null);
  const needsUpdateRef = useRef(false);
  const [playQueue, setPlayQueue] = useState([]);

  useEffect(() => {
    socket.on("isOnlyUser", (isSolo) => {
      setSolo(isSolo);
    });

    if (!player) return;

    socket.on("getPlaylist", (reqUser) => {
      player.getCurrentState().then((state) => {
        if (!state) {
          console.error(
            "User is not playing music through the Web Playback SDK"
          );
          return;
        }
        socket.emit(
          "returnPlaylist",
          reqUser,
          playQueue,
          //playQueue.current,
          state.position,
          currentTrackRef.current
        );
      });
    });

    socket.on("updatePlaylist", (playlist, position, offset) => {
      const uris = playlist.map((track) => track.uri);
      currentTrackRef.current = offset;
      setPlayQueue([...playlist]);
      spotifyFetch.playNow(uris, accessToken, position, offset);
    });

    socket.on("allNext", () => {
      currentTrackRef.current++;
      player.nextTrack();
    });
    socket.on("allPrev", () => {
      currentTrackRef.current--;
      player.previousTrack();
    });

    socket.on("otherPlayItem", (newQueue, uris, index) => {
      setPlayQueue([...newQueue]);
      currentTrackRef.current = index;
      spotifyFetch.playNow(uris, accessToken, 0, index);
    });

    socket.on("otherRemovedItem", (newQueue) => {
      // remove or queue item
      setPlayQueue([...newQueue]);
    });

    socket.on("addToQueueRoom", (queue) => {
      setPlayQueue((i) => [...i, ...queue]);
      needsUpdateRef.current = true;
    });

    socket.on("addToImmediateRoom", (queue, uris) => {
      spotifyFetch.playNow(uris, accessToken, 0, currentTrackRef.current + 1);
      setPlayQueue([...queue]);
    });

    socket.on("update", (uris, index) => {
      spotifyFetch.playNow(uris, accessToken, 0, index);
      currentTrackRef.current = index;
    });

    return () => {
      socket.off("allNext");
      socket.off("allPrev");
      socket.off("updatePlaylist");
      socket.off("getPlaylist");
      socket.off("isOnlyUser");
      socket.off("otherRemovedItem");
      socket.off("addToQueueRoom");
      socket.off("addToImmediateQueueRoom");
      socket.off("update");
    };
    // }, [accessToken, playQueue, player, socket]);
  }, [
    accessToken,
    immediateQueue,
    playQueue,
    player,
    queueQueue,
    setImmediateQueue,
    setQueueQueue,
    socket,
  ]);

  useEffect(() => {
    //user just connected to spotify so need to add loaded track to beginning of queue
    // index default state is 0
    if (!nowPlaying) return;
    if (currentTrackRef.current === null) {
      currentTrackRef.current = 0;
      const playingTrack = nowPlaying.track_window.current_track;
      needsUpdateRef.current = true;
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
      ]);
    }
  }, [nowPlaying]);

  useEffect(() => {
    if (queueQueue.length > 0) {
      socket.emit("addToQueue", queueQueue);
      setPlayQueue((i) => [...i, ...queueQueue]);
      needsUpdateRef.current = true;
      setQueueQueue([]);
    }
  }, [queueQueue, setQueueQueue, socket]);

  useEffect(() => {
    if (immediateQueue.length > 0) {
      const past = playQueue.slice(0, currentTrackRef.current + 1);
      const future = playQueue.slice(currentTrackRef.current);
      const result = [...past, ...immediateQueue, ...future];
      const uris = result.map((track) => track.uri);
      socket.emit("addToImmediateQueue", result, uris);
      setPlayQueue([...result]);
      spotifyFetch.playNow(uris, accessToken, 0, currentTrackRef.current + 1);
      setImmediateQueue([]);
    }
  }, [immediateQueue, setImmediateQueue, accessToken, playQueue, socket]);

  useEffect(() => {
    if (!player || !nowPlaying) return;
    const timeLeft = nowPlaying.duration - nowPlaying.position;
    const timer = timeLeft - 500 >= 0 ? timeLeft - 500 : 0;
    const interval = setTimeout(() => {
      if (currentTrackRef.current < playQueue.length) {
        if (!paused) {
          currentTrackRef.current++;
          if (needsUpdateRef.current) {
            const uris = playQueue.map((track) => track.uri);
            spotifyFetch.playNow(uris, accessToken, 0, currentTrackRef.current);
            needsUpdateRef.current = false;
          }
        }
      }
    }, timer);

    return () => {
      clearTimeout(interval);
    };
  }, [accessToken, playQueue, nowPlaying, paused, player]);

  // button functions

  const nextSong = () => {
    if (currentTrackRef.current < playQueue.length) {
      currentTrackRef.current++;
      if (needsUpdateRef.current) {
        const uris = playQueue.map((track) => track.uri);
        spotifyFetch.playNow(uris, accessToken, 0, currentTrackRef.current);
        needsUpdateRef.current = false;
        socket.emit("needsUpdate", uris, currentTrackRef.current);
      } else {
        player.nextTrack();
        socket.emit("next");
      }
    }
  };

  const prevSong = () => {
    if (currentTrackRef.current > 0) {
      currentTrackRef.current--;
      if (needsUpdateRef.current) {
        const uris = playQueue.map((track) => track.uri);
        spotifyFetch.playNow(uris, accessToken, 0, currentTrackRef.current);
        needsUpdateRef.current = false;
        socket.emit("needsUpdate", uris, currentTrackRef.current);
      } else {
        player.previousTrack();
        socket.emit("prev");
      }
    }
  };

  const togglePlay = () => {
    if (solo) {
      player.togglePlay();
    } else if (oldVol.current) {
      player.setVolume(oldVol.current);
      oldVol.current = 0;
    } else {
      player.getVolume().then((vol) => (oldVol.current = vol));
      player.setVolume(0);
    }
  };

  const removeItem = (index) => {
    const newQueue = [...playQueue];
    newQueue.splice(index, 1);
    socket.emit("removedItem", newQueue);
  };

  const playItem = (index) => {
    const newQueue = [...playQueue];
    const playNow = newQueue[index];
    currentTrackRef.current++;
    newQueue.splice(index, 1);
    newQueue.splice(currentTrackRef.current, 0, playNow);
    const uris = newQueue.map((track) => track.uri);
    console.log(currentTrackRef.current);
    spotifyFetch.playNow(uris, accessToken, 0, currentTrackRef.current);
    console.log(index);
    console.log(currentTrackRef.current);
    setPlayQueue([...newQueue]);
    socket.emit("playItem", newQueue, uris);
  };

  return (
    <>
      <Container className={searching ? "hideQueue" : "queue"} fluid>
        {nowPlaying ? <NowPlaying nowPlaying={nowPlaying} /> : null}
        {/** adding random number to entry id, in case same song queued more than once */}
        <Row className='mx-4 px-4 py-2 border-bottom border-dark' noGutters>
          <Col style={{ paddingTop: "1.25rem" }}>
            <h2> {playQueue.length > 0 ? "Up Next:" : "Nothing Queued!"} </h2>
          </Col>
        </Row>

        {
          // currentTrackIndex is in nowPlaying, and not displayed on queue
          playQueue.slice(currentTrackRef.current + 1).map((entry, index) => (
            <Row
              key={entry.id + Math.floor(Math.random() * 100000)}
              className='row-nowrap nowPlaying pt-1 track-listing'
              style={{ height: "2rem" }}
              noGutters
            >
              <Col sm='auto'>
                <FASIcon
                  iClass='fas fa-play fa-lg clickable-icon rounded-circle'
                  iFunction={() =>
                    playItem(currentTrackRef.current + 1 + index)
                  }
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
                  iFunction={() =>
                    removeItem(currentTrackRef.current + 1 + index)
                  }
                  iStyle={{ marginLeft: "10px" }}
                />
              </Col>
            </Row>
          ))
        }
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
