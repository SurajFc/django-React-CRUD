import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import API from "../HttpService";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import classNames from "classnames";

toast.configure();

function Register() {
  let history = useHistory();

  const { register, handleSubmit, errors } = useForm();

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

  const handleRegister = () => {
    API.post("usercreate", manager)
      .then((res) => {
        toast.success("Registeration Done");
        history.push("/login");
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
        <Form className="shadow p-4 " onSubmit={handleSubmit(handleRegister)}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                ref={register({
                  required: "this field is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 Character",
                  },
                })}
                className={classNames("form-control", {
                  "is-invalid": errors.firstname,
                })}
                type="text"
                name="firstname"
                onChange={(e) => onInputChange(e)}
                placeholder="First name"
              />
              {errors.firstname && (
                <div className="invalid-feedback">
                  {errors.firstname.message}
                </div>
              )}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                ref={register({
                  required: "this field is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 Character",
                  },
                })}
                className={classNames("form-control", {
                  "is-invalid": errors.lastname,
                })}
                type="text"
                name="lastname"
                onChange={(e) => onInputChange(e)}
                placeholder="Last name"
              />
              {errors.lastname && (
                <div className="invalid-feedback">
                  {errors.lastname.message}
                </div>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
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
                onChange={(e) => onInputChange(e)}
                placeholder="Enter email"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={register({
                  required: "this field is required",
                  pattern: {
                    value: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                    message:
                      "Password (UpperCase, LowerCase, Number/SpecialChar and min 8 Chars)",
                  },
                })}
                className={classNames("form-control", {
                  "is-invalid": errors.password,
                })}
                type="text"
                name="password"
                onChange={(e) => onInputChange(e)}
                placeholder="Password"
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGriddob">
            <Form.Label>D.O.B</Form.Label>
            <Form.Control
              ref={register({
                required: "this field is required",
              })}
              className={classNames("form-control", {
                "is-invalid": errors.dob,
              })}
              type="date"
              name="dob"
              onChange={(e) => onInputChange(e)}
              style={{ width: "100%" }}
            />

            {errors.dob && (
              <div className="invalid-feedback">{errors.dob.message}</div>
            )}
          </Form.Group>

          <Form.Group controlId="formGridAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              ref={register({
                required: "this field is required",
                minLength: {
                  value: 4,
                  message: "Minimum 4 Character",
                },
              })}
              className={classNames("form-control", {
                "is-invalid": errors.address,
              })}
              placeholder="1234 Main St"
              name="address"
              onChange={(e) => onInputChange(e)}
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address.message}</div>
            )}
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Comapny</Form.Label>
              <Form.Control
                ref={register({
                  required: "this field is required",
                  minLength: {
                    value: 4,
                    message: "Minimum 4 Character",
                  },
                })}
                className={classNames("form-control", {
                  "is-invalid": errors.company,
                })}
                type="text"
                placeholder="Google"
                name="company"
                onChange={(e) => onInputChange(e)}
              />
              {errors.company && (
                <div className="invalid-feedback">{errors.company.message}</div>
              )}
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
