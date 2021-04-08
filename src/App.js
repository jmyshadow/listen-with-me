import "./App.css";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";

function App() {
  const code = window.location.search.split("=")[1];
  //const socket = io.connect("http://localhost:3001");
  const socket = io.connect("https://listenwme.herokuapp.com/");

  return (
    <div className='App bg-secondary h-100'>
      {code ? <HomePage code={code} socket={socket} /> : <Login />}
    </div>
  );
}

export default App;
