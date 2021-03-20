import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import API from "../HttpService";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("heree");
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
          <Form className="shadow p-4 " onSubmit={(e) => handleSubmit(e)}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  onChange={(e) => onInputChange(e)}
                  required
                  value={firstname || ""}
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
                  value={lastname || ""}
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
                  value={email || ""}
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
                value={dob || ""}
                style={{ width: "100%" }}
              />
            </Form.Group>

            <Form.Group controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder="1234 Main St"
                name="address"
                required
                value={address || ""}
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
                  value={company || ""}
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
                  value={city}
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
                  value={mobile || ""}
                  placeholder="10 digit number"
                />
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
