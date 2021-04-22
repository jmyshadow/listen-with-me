import "./App.css";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const code = window.location.search.split("=")[1];

  return (
    <div className='App bg-secondary h-100'>
      {code ? <HomePage code={code} /> : <Login />}
    </div>
  );
}

export default App;
