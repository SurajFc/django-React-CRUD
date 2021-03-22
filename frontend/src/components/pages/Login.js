import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Axios from "axios";
import { useHistory, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import classNames from "classnames";

toast.configure();

function Login({ globalLogin }) {
  let history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { register, handleSubmit, errors } = useForm();

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    Axios.post("http://localhost:8000/api/login", user)
      .then((resp) => {
        globalLogin(resp);
        toast.info("Welcome");
        history.replace("/");
      })
      .catch((request) => {
        if (request.response) {
          console.log(request.response.data);
          let resp = request.response.data;
          if (resp["email"]) {
            toast.error("Enter a valid email address");
          }
          if (resp["Error"]) {
            toast.error("A user with this email and password was not found");
          }
        }
      });
  };

  return (
    <div className="container-fluid ">
      <Form className="shadow m-4 p-4" onSubmit={handleSubmit(handleLogin)}>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              ref={register({
                required: "this field is required",
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "enter a valid email",
                },
              })}
              className={classNames("form-control", {
                "is-invalid": errors.email,
              })}
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={(e) => onInputChange(e)}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              ref={register({
                required: "this field is required",
              })}
              className={classNames("form-control", {
                "is-invalid": errors.password,
              })}
              type="password"
              autoComplete="false"
              name="password"
              placeholder="Password"
              onChange={(e) => onInputChange(e)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
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
