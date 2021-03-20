import React from "react";
import { NavLink } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavbarTop() {
  return (
    <>
      <Navbar variant="light" expand="sm">
        <Navbar.Brand as={NavLink} to="/">
          <img
            alt=""
            src="https://cdn.mindbowser.com/wp-content/uploads/2020/10/28081728/mindbowser-logo.svg"
            width="50"
            height="50"
            className="d-inline-block align-top bg-white"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/" exact className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="nav-link">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavbarTop;