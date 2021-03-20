import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import API from "../HttpService";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

toast.configure();

function Register() {
  let history = useHistory();

  const [manager, setManager] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    dob: Date(),
    company: "",
  });

  const onInputChange = (e) => {
    setManager({ ...manager, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("usercreate", manager)
      .then((res) => {
        console.log(res.status);
        console.log("resgistered", res.data);

        history.push("/login");
        toast.success("Registeration Done");
        toast.info("Please Login");
      })
      .catch(({ request }) => {
        console.log(request);
        if (request.status === 400) {
          let resp = JSON.parse(request.response);
          toast.error(JSON.stringify(resp["Error"]));
        }
      });
  };

  return (
    <>
      <div className="container">
        <p className="h3 ">Register</p>
        <Form className="shadow p-4 " onSubmit={(e) => handleSubmit(e)}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                onChange={(e) => onInputChange(e)}
                required
                placeholder="First name"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                onChange={(e) => onInputChange(e)}
                required
                placeholder="Last name"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={(e) => onInputChange(e)}
                required
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                autoComplete="off"
                onChange={(e) => onInputChange(e)}
                required
                placeholder="Password"
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGriddob">
            <Form.Label>D.O.B</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              onChange={(e) => onInputChange(e)}
              required
              style={{ width: "100%" }}
            />
          </Form.Group>

          <Form.Group controlId="formGridAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              name="address"
              required
              onChange={(e) => onInputChange(e)}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Comapny</Form.Label>
              <Form.Control
                type="text"
                placeholder="Google"
                name="company"
                required
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary btn-block" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Register;
