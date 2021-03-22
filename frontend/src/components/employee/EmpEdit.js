import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import API from "../HttpService";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import classNames from "classnames";

toast.configure();

function EmpEdit({ loadEmployees, ...props }) {
  const [employee, setEmployee] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    dob: Date(),
    company: "",
    city: "",
    mobile: "",
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  });

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setEmployee(props.employee);
  }, [props.employee]);

  const {
    id,
    firstname,
    lastname,
    email,
    address,
    dob,
    company,
    city,
    mobile,
  } = employee;

  const EditEmployee = () => {
    API.put(`employee/${id}/`, employee)
      .then((res) => {
        toast.warning(`Edited Employee id ${id}`);
        props.onHide();
        loadEmployees();
      })
      .catch(({ request }) => {
        console.log(request);
        toast.error("SOme Error");
      });
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="shadow p-4 " onSubmit={handleSubmit(EditEmployee)}>
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
                  value={firstname || ""}
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
                  value={lastname || ""}
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
                  value={email || ""}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
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
                value={dob || ""}
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
                value={address || ""}
                onChange={(e) => onInputChange(e)}
              />
              {errors.address && (
                <div className="invalid-feedback">{errors.address.message}</div>
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
                  value={company || ""}
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
                  value={city}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <div className="invalid-feedback">{errors.city.message}</div>
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
                  value={mobile || ""}
                  placeholder="10 digit number"
                />
                {errors.mobile && (
                  <div className="invalid-feedback">
                    {errors.mobile.message}
                  </div>
                )}
              </Form.Group>
            </Form.Row>

            <Button variant="danger btn-block" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EmpEdit;
