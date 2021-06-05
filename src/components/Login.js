import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function Login() {
  const redirectAuth = () => {
    axios
      .get("/login")
      .then((res) => {
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "/";
      });
  };

  return (
    <div className='p-5 text-light font-weight-bold'>
      <Button variant='success' className='p-4 m-5' onClick={redirectAuth}>
        Login to Spotify
      </Button>
    </div>
  );
}
