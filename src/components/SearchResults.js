import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchTrack from "./SearchTrack";
import SearchArtist from "./SearchArtist";
import SearchAlbum from "./SearchAlbum";
import SearchPlaylist from "./SearchPlaylist";
import SearchShow from "./SearchShow";
import SearchEpisode from "./SearchEpisode";

export default function SearchResults({ searchResult }) {
  console.log(searchResult.tracks);
  return (
    <Container className='px-0' fluid>
      <Row sm={1} md={2} noGutters>
        <Col>
          {searchResult.tracks.items.map((track) => (
            <SearchTrack track={track} />
          ))}
        </Col>
        <Col>
          <Container className='px-0' fluid>
            <Row sm='1' md='2' lg='3' noGutters>
              {searchResult.artists.items.map((artist, index) => (
                <SearchArtist artist={artist} />
              ))}
            </Row>
          </Container>
        </Col>
        <Col>
          ALBUMS
          {searchResult.albums.items.map((album) => (
            <SearchAlbum album={album} />
          ))}
        </Col>
        <Col>
          PLAYLISTS
          {searchResult.playlists.items.map((playlist) => (
            <SearchPlaylist playlist={playlist} />
          ))}
        </Col>
        <Col>
          SHOWS
          {searchResult.shows.items.map((show) => (
            <SearchShow show={show} />
          ))}
        </Col>
        <Col>
          EPISODES
          {searchResult.episodes.items.map((episode) => (
            <SearchEpisode episode={episode} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
