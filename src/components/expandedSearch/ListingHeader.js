import React from "react";
import { Media } from "react-bootstrap";

export default function ListingHeader({ artistName, imgUrl }) {
  return (
    <Media className='my-2 p-3 nowPlaying' style={{ fontSize: "50px" }}>
      <img src={imgUrl} alt='no img' style={{ height: "200px" }} />
      <Media.Body
        className='d-flex pl-2 w-100 align-items-center justify-content-center'
        style={{ height: "200px" }}
      >
        {artistName}
      </Media.Body>
    </Media>
  );
}
