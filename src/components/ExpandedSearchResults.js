import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ExpandedTrack from "./ExpandedTrack";

export default function ExpandedSearchResults({
  expanded,
  setExpanded,
  accessToken,
}) {
  const [index, setIndex] = useState(0);
  const [type, setType] = useState("track");

  useEffect(() => {
    console.log(expanded, index);
    setType(expanded[index].split(":")[1]);
  }, [index, type, expanded]);

  function prevResult() {
    if (index > 0) setIndex(index - 1);
  }

  function nextResult() {
    if (index < expanded.length - 1) setIndex(index + 1);
  }

  function clearResult() {
    setExpanded([""]);
  }
  console.log(index);
  return (
    <>
      <Row>
        <Col onClick={prevResult}> PREV </Col>
        <Col onClick={nextResult}> NEXT </Col>
        <Col onClick={clearResult}> X </Col>
      </Row>
      <ExpandedTrack
        type={type}
        accessToken={accessToken}
        track={expanded[index]}
      />
    </>
  );
}
