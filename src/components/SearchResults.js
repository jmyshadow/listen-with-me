import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";

import ExpandedSearchResults from "./ExpandedSearchResults";
import SearchFactory from "./SearchFactory";

export default function SearchResults({
  searchResult,
  playQueue,
  setPlayQueue,
  accessToken,
}) {
  //  breadcrumbs of uris
  const [expanded, setExpanded] = useState([]);

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
        />
      )}
    </Container>
  );
}
