import "./App.css";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

import "bootstrap/dist/css/bootstrap.min.css";

//
// client specific urls in dev in:
//  Login.js
//  useAuth.js
//

function App() {
  const code = window.location.search.split("=")[1];

  return (
    <div className='App'>{code ? <HomePage code={code} /> : <Login />}</div>
  );
}

export default App;
