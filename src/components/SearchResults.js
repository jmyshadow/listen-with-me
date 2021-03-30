import React from "react";
import { Container, Row } from "react-bootstrap";

import ExpandedSearchResults from "./expandedSearch/ExpandedSearchResults";
import SearchFactory from "./SearchFactory";

export default function SearchResults({
  searchResult,
  playQueue,
  setPlayQueue,
  accessToken,
  setSearching,
  expanded,
  setExpanded,
  index,
  setIndex,
}) {
  //  breadcrumbs of uris

  return (
    <Container fluid>
      {expanded.length === 0 ? (
        <Row xs={1} sm={2} noGutters>
          {Object.entries(searchResult).map(([key, value]) => (
            <SearchFactory
              key={key}
              title={key}
              list={value}
              playQueue={playQueue}
              setPlayQueue={setPlayQueue}
              accessToken={accessToken}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ))}
        </Row>
      ) : (
        <ExpandedSearchResults
          expanded={expanded}
          setExpanded={setExpanded}
          accessToken={accessToken}
          setSearching={setSearching}
          index={index}
          setIndex={setIndex}
        />
      )}
    </Container>
  );
}
