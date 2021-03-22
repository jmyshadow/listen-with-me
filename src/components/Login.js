import React from "react";
import axios from "axios";

export default function Login() {
  const redirectAuth = () => {
    //   let result = await fetch("http://localhost:3001/login");
    //   let authUrl = await result.json();
    //   window.location.href = authUrl;

    axios
      .get("http://localhost:3001/login")
      .then((res) => {
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "/";
      });
  };

  return (
    <div>
      <button onClick={redirectAuth}>Login</button>
    </div>
  );
}
