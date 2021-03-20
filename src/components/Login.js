import React from "react";

export default function Login() {
  const redirectAuth = async function (access_token) {
    let result = await fetch("http://localhost:3001/login");
    let data = await result.json();
    window.location.href = data;
  };

  return (
    <div>
      <button onClick={redirectAuth}>Login</button>
    </div>
  );
}
