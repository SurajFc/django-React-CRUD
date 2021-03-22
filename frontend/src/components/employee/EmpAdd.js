import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import API from "../HttpService";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import classNames from "classnames";

toast.configure();

function EmpAdd({ loadEmployees, ...props }) {
  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    dob: Date(),
    company: "",
    city: "",
    mobile: "",
  });

  const { register, handleSubmit, errors } = useForm();

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const AddEmployee = () => {
    API.post("employee/", employee)
      .then((res) => {
        props.onHide();
        loadEmployees();
        toast.success("Emoloyee Added");
      })
      .catch(({ request }) => {
        let resp = JSON.parse(request.response);
        console.log(resp["email"]);
        toast.error(JSON.stringify(resp["email"]));
      });
  };

  return (
    <>
      <div className="container">
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <p>Add Employee</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="shadow p-4 " onSubmit={handleSubmit(AddEmployee)}>
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
                    <div className="invalid-feedback">
                      {errors.email.message}
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
                  <div className="invalid-feedback">
                    {errors.address.message}
                  </div>
                )}
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCompany">
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
                    <div className="invalid-feedback">
                      {errors.company.message}
                    </div>
                  )}
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    ref={register({
                      required: "this field is required",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 Character",
                      },
                    })}
                    className={classNames("form-control", {
                      "is-invalid": errors.city,
                    })}
                    type="text"
                    name="city"
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter city"
                  />
                  {errors.city && (
                    <div className="invalid-feedback">
                      {errors.city.message}
                    </div>
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridMobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    ref={register({
                      required: "this field is required",
                      pattern: {
                        value: /^^\d{10}$/,
                        message: "10 digit mobile no.",
                      },
                    })}
                    className={classNames("form-control", {
                      "is-invalid": errors.mobile,
                    })}
                    type="tel"
                    name="mobile"
                    maxLength="10"
                    onChange={(e) => onInputChange(e)}
                    placeholder="10 digit number"
                  />
                  {errors.mobile && (
                    <div className="invalid-feedback">
                      {errors.mobile.message}
                    </div>
                  )}
                </Form.Group>
              </Form.Row>

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default EmpAdd;
