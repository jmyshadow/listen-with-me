import React, { useRef, useState, useEffect, useContext } from "react";
import { Media } from "react-bootstrap";

export default function ListingHeader({
  image,
  data1 = "",
  data2 = "",
  data3 = "",
}) {
  const sizeRef = useRef(null);
  const [width, setWidth] = useState(0);

  function calculateFontSize(factor) {
    if (width) return Math.min(factor * width, factor * 300);
    return 150;
  }

  useEffect(() => {
    if (sizeRef.current) setWidth(sizeRef.current.offsetWidth);
    if (sizeRef.current)
      console.log(sizeRef.current.offsetWidth / sizeRef.current.offsetHeight);
  }, []);

  // useEffect(() => {
  //   const mousemoveHandler = () => {
  //     setWidth(sizeRef.current.offsetWidth);
  //     //setWidth(sizeRef.current.offsetWidth / sizeRef.current.offsetHeight);
  //     // if (searchContainer.current.offsetWidth !== searchContainerWidth)
  //     //   setSearchContainerWidth(searchContainer.current.offsetWidth);
  //   };

  //   const mouseupHandler = () => {
  //     window.removeEventListener("mousemove", mousemoveHandler);
  //     window.removeEventListener("mouseup", mouseupHandler);
  //   };

  //   const mousedownHandler = () => {
  //     window.addEventListener("mousemove", mousemoveHandler);
  //     window.addEventListener("mouseup", mouseupHandler);
  //   };

  //   const resizeHandler = () => {
  //     setWidth(sizeRef.current.offsetWidth);
  //   };

  //   window.addEventListener("mousedown", mousedownHandler);
  //   window.addEventListener("resize", resizeHandler);

  //   return () => {
  //     window.removeEventListener("mousedown", mousedownHandler);
  //     window.removeEventListener("resize", resizeHandler);
  //   };
  // });
  return (
    <Media
      className='nowPlaying p-3 my-3 align-items-center'
      style={{ maxHeight: "50vh", overflow: "hidden" }}
    >
      <div
        className='d-flex align-items-center justify-content-center'
        style={{ maxWidth: "40%", height: "100%" }}
      >
        <img
          src={image}
          alt='no img'
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      </div>
      <Media.Body
        className='pl-3 h-100 d-flex flex-column flex-nowrap justify-content-center'
        style={{ width: "60%" }}
        ref={sizeRef}
      >
        <div
          className='w-100 mh-50 overflow-hidden py-1'
          style={{
            fontSize: `calc(150% + 2vw)`,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {data1}
        </div>
        <div
          className='w-100 mh-25 overflow-hidden py-1'
          style={{
            fontSize: "calc(100% + 1vw)",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {data2}
        </div>
        <div
          className='w-100 mh-25 overflow-hidden py-1'
          style={{
            fontSize: "calc(100% + 1vw)",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {data3}
        </div>
      </Media.Body>
    </Media>
  );
}
