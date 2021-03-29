import React from "react";
import { Col, Row } from "react-bootstrap";
import SearchItem from "./SearchItem";

export default function SearchFactory({
  title,
  list,
  playQueue,
  setPlayQueue,
  accessToken,
  expanded,
  setExpanded,
}) {
  return (
    <Col className='bg-primary'>
      <Row className='bg-light' noGutters>
        <h4>{title[0].toUpperCase() + title.substring(1)}</h4>
      </Row>
      <Row sm={1} lg={2} noGutters>
        {list.map((item) => (
          <SearchItem
            key={item.id}
            item={item}
            playQueue={playQueue}
            setPlayQueue={setPlayQueue}
            accessToken={accessToken}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        ))}
      </Row>
    </Col>
  );
}
