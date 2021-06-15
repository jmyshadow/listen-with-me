import React from "react";
import { Media } from "react-bootstrap";

export default function MiniNowPlaying({ image, data1 = "", data2 = "" }) {
  return (
    <div className='w-100 h-100'>
      <Media style={{ overflow: "hidden" }}>
        <img src={image} alt='no img' height='60px' width='60px' />
        <Media.Body className='pl-3 h-100 d-flex flex-column flex-nowrap justify-content-center'>
          <div
            className='w-100 overflow-hidden py-1'
            style={{
              textOverflow: "ellipsis",
            }}
          >
            {data1}
          </div>
          <div
            className='w-100 overflow-hidden py-1'
            style={{
              textOverflow: "ellipsis",
            }}
          >
            {data2}
          </div>
        </Media.Body>
      </Media>
    </div>
  );
}
