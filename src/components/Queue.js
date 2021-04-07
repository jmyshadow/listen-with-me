import React, { useContext } from "react";
import QueueItem from "./QueueItem";
import { Container, Col, Row } from "react-bootstrap";
import { QueueContext } from "./context/SpotifyContext";

export default function Queue() {
  const { playQueue, setPlayQueue } = useContext(QueueContext);

  console.log("queue rendered");

  function removeItem(index) {
    const newQueue = [...playQueue];
    newQueue.splice(index, 1);
    setPlayQueue(newQueue);
  }

  function playNow(id) {
    console.log("queueing " + id + " now");
  }

  return (
    <Container fluid>
      <Row noGutters>
        Now Playing: <br />
      </Row>
      {/** adding random number to entry id, in case same song queued more than once */}
      {playQueue.map((entry, index) => (
        <Row
          key={entry.id + Math.floor(Math.random() * 100000)}
          className='row-nowrap'
          noGutters
        >
          <Col sm='auto'>
            <button onClick={() => playNow(entry.id)}>&#9658;</button>
          </Col>
          <QueueItem entry={entry} />
          <Col sm='auto'>
            <button
              onClick={() => removeItem(index)}
              key={Math.random() + "button"}
            >
              X
            </button>
          </Col>
        </Row>
      ))}
    </Container>
  );
}
