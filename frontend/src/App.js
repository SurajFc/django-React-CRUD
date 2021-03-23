import { useState, useEffect } from "react";

//Bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

//Custom Css
import "./css/global.css";
import "react-toastify/dist/ReactToastify.css";

//Components
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

//Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Protected Route
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access")) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, []);

  const globalLogin = (resp) => {
    console.log("in main app");
    localStorage.setItem("refresh", resp.data.refresh);
    localStorage.setItem("access", resp.data.access);
    setisLoggedIn(true);
  };
  const globalLogout = () => {
    setisLoggedIn(false);
    localStorage.clear();
  };

  return (
    <Router>
      <div className="App container">
        <Navbar isLoggedIn={isLoggedIn} globalLogout={globalLogout} />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/login"
            children={<Login globalLogin={globalLogin} />}
          />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
