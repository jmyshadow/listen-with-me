import React from "react";
import MainApp from "./MainApp";

export default function HomePage({ code }) {
  console.log("homepage rendered");
  return (
    <div className='homepage d-flex h-100 w-100 pb-5'>
      <div className='side-bar bg-dark'>links</div>
      <MainApp code={code} />
      <div className='side-bar bg-dark'>chat</div>
    </div>
  );
}
