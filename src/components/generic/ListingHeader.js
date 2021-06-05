import React from "react";
import { Media } from "react-bootstrap";

export default function ListingHeader({
  width,
  image,
  data1 = "",
  data2 = "",
  data3 = "",
}) {
  function calculateFontSize(font) {
    return ((font * width) / window.innerWidth).toFixed(1);
  }

  return (
    <Media className='nowPlaying p-3 my-3 align-items-center'>
      <div
        className='d-flex align-items-center justify-content-center'
        style={{ width: "40%", height: "100%", backgroundColor: "black" }}
      >
        <img
          src={image}
          alt='no img'
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      </div>
      <Media.Body className='pl-3 h-100 d-flex flex-column flex-nowrap justify-content-center'>
        <div
          className='w-100 mh-50 overflow-hidden py-1'
          style={{
            fontSize: `${calculateFontSize(4)}em`,
          }}
        >
          {data1}
        </div>
        <div
          className='w-100 mh-25 overflow-hidden py-1'
          style={{
            fontSize: `${calculateFontSize(3)}em`,
          }}
        >
          {data2}
        </div>
        <div
          className='w-100 mh-25 overflow-hidden py-1'
          style={{
            fontSize: `${calculateFontSize(3)}em`,
          }}
        >
          {data3}
        </div>
      </Media.Body>
    </Media>
  );
}
