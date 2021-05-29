import React from "react";
import { Media } from "react-bootstrap";

export default function ArtistListingHeader({ artistName, imgUrl }) {
  return (
    // <Media className='my-2 p-3 nowPlaying' style={{ fontSize: "50px" }}>
    //   <img src={imgUrl} alt='no img' style={{ height: "200px" }} />
    //   <Media.Body
    //     className='d-flex pl-2 w-100 align-items-center justify-content-center'
    //     style={{ height: "200px" }}
    //   >
    //     {artistName}
    //   </Media.Body>
    // </Media>

    <div
      class='jumbotron card card-image'
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundRepeat: "no-repeat",
        //backgroundPosition: "center top",
        backgroundPosition: "50% 25%",
        maxHeight: "300px",
        backgroundSize: "cover",
        boxShadow: "0px 0px 10px 2px #1f2224",
        textShadow: "-1px -1px 10px black, 1px 1px 20px black",
      }}
    >
      <h2>{artistName}</h2>
    </div>
  );
}
