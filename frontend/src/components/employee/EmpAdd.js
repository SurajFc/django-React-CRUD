import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import API from "../HttpService";
import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";

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

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                <Form.Group as={Col} controlId="formGridCompany">
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

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    onChange={(e) => onInputChange(e)}
                    required
                    placeholder="Enter city"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridMobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="tel"
                    name="mobile"
                    maxLength="10"
                    onChange={(e) => onInputChange(e)}
                    required
                    placeholder="10 digit number"
                  />
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
