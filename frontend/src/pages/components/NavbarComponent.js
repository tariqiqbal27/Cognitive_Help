import React, { useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button
} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../actions/userActions";
import profile_pic from "./profile_pic.png";

const NavbarComponent = () => {

  const userLogin = useSelector(state => state.userLogin)
  const dispatch = useDispatch();
  const { userInfo } = userLogin

  const location = useLocation()

  const logoutHandler = e => {
    dispatch(logout());
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
      <Container>
        <Navbar.Brand href="/">Cognitive Help | Self-Care</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/dashboard">Know your Depression Level</Nav.Link>
            <Nav.Link href="/feed">Feed</Nav.Link>
          </Nav>
          {userInfo ? <Nav><NavDropdown title={userInfo.first_name + " " + userInfo.last_name} className="mx-auto">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown></Nav> : <Nav>
            <Nav.Link className="ml-auto mr-auto" href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
