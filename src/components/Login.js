import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function Login() {
  const redirectAuth = () => {
    //   let result = await fetch("http://localhost:3001/login");
    //   let authUrl = await result.json();
    //   window.location.href = authUrl;

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
    <div className='pt-4'>
      <Button variant='success' onClick={redirectAuth}>
        Login
      </Button>
    </div>
  );
}
