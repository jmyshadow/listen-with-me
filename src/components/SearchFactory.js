import React from "react";
import { Col, Row } from "react-bootstrap";
import SearchItem from "./SearchItem";

export default function SearchFactory({
  title,
  list,
  playQueue,
  setPlayQueue,
  accessToken,
}) {
  // const title = key[0].toUpperCase() + key.substring(1);

  /*
 use switch statement with this template:

 maybe even remove all the SearchX classes if I can link stuff with URIs?
ex: 
 const imgUrl = track.album.images[0].url
 const uri = track.uri
 const description = track.name

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
*/
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
          />
        ))}
      </Row>
    </Col>
  );
}
