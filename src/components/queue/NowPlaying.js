import React, { useState, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import ListingHeader from "../generic/ListingHeader";
import MiniNowPlaying from "./MiniNowPlaying";

export default function NowPlaying({ nowPlaying, mini = false }) {
  const [image, setImage] = useState("../images/qmark.jpg");
  const [track, setTrack] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");

  useEffect(() => {
    if (!nowPlaying) return;
    (async () => {
      setImage(nowPlaying.track_window.current_track.album.images[0].url);
      setTrack(nowPlaying.track_window.current_track.name);
      setAlbum(nowPlaying.track_window.current_track.album.name);
      setArtist(nowPlaying.track_window.current_track.artists[0].name);
    })();
  }, [setImage, setTrack, setAlbum, nowPlaying]);

  return (
    <>
      {" "}
      {mini ? (
        <MiniNowPlaying
          image={image}
          data1={track}
          data2={album}
          data3={artist}
        />
      ) : (
        <Row noGutters>
          <Col>
            <ListingHeader
              image={image}
              data1={track}
              data2={album}
              data3={artist}
            />
          </Col>
        </Row>
      )}
    </>
  );
}
