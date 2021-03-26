import React from "react";
import { Container, Row } from "react-bootstrap";

import ExpandedSearchResults from "./ExpandedSearchResults";
import SearchFactory from "./SearchFactory";

export default function SearchResults({
  searchResult,
  playQueue,
  setPlayQueue,
  accessToken,
}) {
  const expanded = [];
  /*
  return (
    <Container className='px-0' fluid>
      <Row>
        <div className={expanded.length === 0 ? "d-none" : "d-flex"}>
          {" "}
          <ExpandedSearchResults />
        </div>
      </Row>
      <Row
        id='general'
        className={expanded.length === 0 ? "d-flex" : "d-none"}
        xs={1}
        sm={2}
        noGutters
      >
        <Col className='bg-primary'>
          <Row className='bg-light' noGutters>
            <h4>Tracks</h4>
          </Row>
          <Row sm={1} lg={2} noGutters>
            {searchResult.tracks.map((track) => (
              <SearchTrack
                key={track.id}
                track={track}
                playQueue={playQueue}
                setPlayQueue={setPlayQueue}
              />
            ))}
          </Row>
        </Col>
        <Col className='bg-dark'>
          <Row className='bg-light' noGutters>
            <h4>Artists</h4>
          </Row>
          <Row sm={1} lg={2} noGutters>
            {searchResult.artists.map((artist) => (
              <SearchArtist key={artist.id} artist={artist} />
            ))}
          </Row>
        </Col>
        <Col className='bg-success'>
          <Row className='bg-light' noGutters>
            <h4>Albums</h4>
          </Row>
          <Row sm={1} lg={2} noGutters>
            {searchResult.albums.map((album) => (
              <SearchAlbum key={album.id} album={album} />
            ))}
          </Row>
        </Col>
        <Col className='bg-secondary'>
          <Row className='bg-light' noGutters>
            <h4>Playlists</h4>
          </Row>
          <Row sm={1} lg={2} noGutters>
            {searchResult.playlists.map((playlist) => (
              <SearchPlaylist key={playlist.id} playlist={playlist} />
            ))}
          </Row>
        </Col>
        <Col>
          <Row className='bg-light' noGutters>
            <h4>Shows</h4>
          </Row>
          <Row sm={1} lg={2} noGutters>
            {searchResult.shows.map((show) => (
              <SearchShow key={show.id} show={show} />
            ))}
          </Row>
        </Col>
        <Col>
          <Row className='bg-light' noGutters>
            <h4>Episodes</h4>
          </Row>
          <Row sm={1} lg={2} noGutters>
            {searchResult.episodes.map((episode) => (
              <SearchEpisode key={episode.id} episode={episode} />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
*/
  return (
    <Container className='px-0' fluid>
      <Row>
        <div className={expanded.length === 0 ? "d-none" : "d-flex"}>
          {" "}
          <ExpandedSearchResults />
        </div>
      </Row>
      <Row
        className={expanded.length === 0 ? "d-flex" : "d-none"}
        xs={1}
        sm={2}
        noGutters
      >
        {Object.entries(searchResult).map(([key, value]) => (
          <SearchFactory
            key={key}
            title={key}
            list={value}
            playQueue={playQueue}
            setPlayQueue={setPlayQueue}
            accessToken={accessToken}
          />
        ))}
      </Row>
    </Container>
  );
}
