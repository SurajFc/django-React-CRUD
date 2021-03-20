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
  return (
    <Router>
      <div className="App container-fluid">
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
