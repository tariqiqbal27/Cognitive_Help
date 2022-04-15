import React, { useState } from "react";
import { Card, Form, Button, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  React.useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = event => {
    event.preventDefault();
    dispatch(login(email, password))
  };

  return (
    <div className="container">

      <Card bg="light" text="dark"
        className="my-2 align-middle login-card">
        <Card.Body className="p-4">
          <h2 className="m-2 text-center">LOGIN</h2>
          <hr />
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="Email" className="my-2">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              className="mt-3 form-control"
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer>{error && <Toast>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto text-danger">Error</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>}</Card.Footer>
      </Card>
    </div>
  );
};

export default Login;
