import React from "react";

export default function ArtistListingHeader({ artistName, imgUrl }) {
  return (
    <div
      class='jumbotron card card-image'
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundRepeat: "no-repeat",
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
