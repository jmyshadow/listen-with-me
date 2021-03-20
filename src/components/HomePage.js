import React from "react";
import useAuth from "./useAuth";

export default function HomePage({ code }) {
  const accessToken = useAuth(code);

  return <div> {accessToken} </div>;
}
