import React from "react";
import { Container, Row } from "react-bootstrap";

import ExpandedSearchResults from "../expandedSearch/ExpandedSearchResults";
import SearchFactory from "./SearchFactory";

export default function SearchResults({
  searchResult,
  expanded,
  setExpanded,
  index,
  setIndex,
}) {
  //  breadcrumbs of uris
  console.log("search result rendered");
  return (
    <Container className='bg-primary playlist' fluid>
      {expanded.length === 0 ? (
        <Row xs={1} sm={2} noGutters>
          {Object.entries(searchResult) === []
            ? null
            : Object.entries(searchResult).map(([key, value]) => (
                <SearchFactory
                  key={key}
                  title={key}
                  list={value}
                  expanded={expanded}
                  setExpanded={setExpanded}
                />
              ))}
        </Row>
      ) : (
        <ExpandedSearchResults
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          setIndex={setIndex}
        />
      )}
    </Container>
  );
}
