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
  let order = 12;
  switch (title) {
    default:
      break;
    case "tracks":
      order = 0;
      break;
    case "artists":
      order = 1;
      break;
    case "albums":
      order = 2;
      break;
    case "playlists":
      order = 3;
      break;
    case "episodes":
      order = 4;
      break;
    case "shows":
      order = 5;
      break;
  }
  return (
    <Col className={`bg-primary order-${order}`}>
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
