import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Axios from "axios";
import { useHistory, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

toast.configure();

function Login() {
  let history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/api/login", user)
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("refresh", resp.data.refresh);
        localStorage.setItem("access", resp.data.access);
        history.replace("/");
        toast.info("Welcome");
      })
      .catch(({ request }) => {
        let resp = JSON.parse(request.response);
        toast.error(JSON.stringify(resp["Error"]));
      });
  };

  return (
    <div className="container-fluid ">
      <Form className="shadow m-4 p-4" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="email"
              name="email"
              required
              placeholder="Enter email"
              onChange={(e) => onInputChange(e)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              autoComplete="false"
              required
              name="password"
              placeholder="Password"
              onChange={(e) => onInputChange(e)}
            />
          </Col>
        </Form.Group>
        <Button className="btn-dark btn-block" type="submit">
          Login
        </Button>
        <Button
          variant="primary"
          className=" btn-block"
          type="submit"
          as={NavLink}
          to="/register"
          exact
        >
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Login;
