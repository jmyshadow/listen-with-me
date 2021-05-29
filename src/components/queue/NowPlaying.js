import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Media, Card } from "react-bootstrap";
import ListingHeader from "../generic/ListingHeader";

export default function NowPlaying({ nowPlaying }) {
  const [image, setImage] = useState("../images/qmark.jpg");
  const [track, setTrack] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [width, setWidth] = useState("900px");
  const theRow = useRef(null);

  useEffect(() => {
    if (!nowPlaying) return;
    setImage(nowPlaying.track_window.current_track.album.images[0].url);
    setTrack(nowPlaying.track_window.current_track.name);
    setAlbum(nowPlaying.track_window.current_track.album.name);
    setArtist(nowPlaying.track_window.current_track.artists[0].name);
  }, [setImage, setTrack, setAlbum, nowPlaying]);

  useEffect(() => {
    setWidth(theRow.current.clientWidth);

    // return () => {
    //   window.removeEventListener("resize", resizeWidth);
    //   window.removeEventListener("mouseover", mouseoverResize);
    // };
  });

  const resizeWidth = () => {
    setWidth(theRow.current.clientWidth);
  };
  const mouseoverResize = () => {
    if (width !== theRow.current.clientWidth)
      setWidth(theRow.current.clientWidth);
  };
  window.addEventListener("resize", resizeWidth);

  window.addEventListener("mouseover", mouseoverResize);

  return (
    // <Row className='px-4 py-2 nowPlaying' ref={theRow} noGutters>
    //   {/* {parseInt(width) >= 450 ? ( */}
    //   <Col>
    //     <Media style={{ height: "200px" }}>
    //       <img src={image} alt='no img' height='200px' width='200px' />
    //       <Media.Body
    //         className='pl-4 d-flex flex-column flex-nowrap justify-content-center'
    //         style={{ height: "200px" }}
    //       >
    //         <div
    //           className='w-100 mh-50 overflow-hidden py-1'
    //           style={{
    //             fontSize: `${calculateFontSize(1.4)}em`,
    //           }}
    //         >
    //           {track}
    //         </div>
    //         <div
    //           className='w-100 mh-25 overflow-hidden py-1'
    //           style={{
    //             fontSize: `${calculateFontSize(0.7)}em`,
    //           }}
    //         >
    //           {album}
    //         </div>
    //         <div
    //           className='w-100 mh-25 overflow-hidden py-1'
    //           style={{
    //             fontSize: `${calculateFontSize(0.7)}em`,
    //           }}
    //         >
    //           {artist}
    //         </div>
    //       </Media.Body>
    //     </Media>
    //   </Col>
    //  ) : (
    //   <Col className='d-flex justify-content-center'>
    //     <div
    //       className='d-flex justify-content-center'
    //      style={{ maxWidth: "250px" }}
    //     >
    //       <Card className='bg-dark'>
    //        <Card.Img variant='top' src={image} />
    //      <Card.Body>
    //      <Card.Title>{track}</Card.Title>
    //                <Card.Text>
    //                {artist}
    ////              <br />
    //           {album}
    //       </Card.Text>
    //          </Card.Body>
    //      </Card>
    //    </div>
    //  </Col>
    //  )}
    // </Row>*/}
    <Row ref={theRow} noGutters>
      {/* {parseInt(width) >= 450 ? ( */}
      <Col>
        <ListingHeader
          image={image}
          width={width}
          data1={track}
          data2={album}
          data3={artist}
        />
      </Col>
    </Row>
  );
}
