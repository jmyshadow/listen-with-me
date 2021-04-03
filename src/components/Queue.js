import React from "react";
import QueueItem from "./QueueItem";
import { Container, Row } from "react-bootstrap";

export default function Queue({ playQueue }) {
  console.log("queue rendered");
  return (
    <Container className='overflow-hidden' fluid>
      <Row noGutters>
        Now Playing: <br />
      </Row>
      {/** adding random number to entry id, in case same song queued more than once */}
      {playQueue.map((entry) => (
        <QueueItem
          key={entry.id + Math.random().toString().substring(2, 10)}
          entry={entry}
        />
      ))}
    </Container>
  );
}
