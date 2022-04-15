import React, { useState, useEffect } from 'react'
import { Card, Form, Button, Alert, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions'

const Register = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [toast, setToast] = useState(true);

    const [errors, setErrors] = useState({
        errorConfirmPassword: false,
        errorValidation: false
    })

    const message = {
        confirmPassword: "Password and Confirm Password must match",
        registerError: "Email already exists"
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, success } = userRegister;

    useEffect(() => {
        if (userInfo)
            navigate('/')

    }, [userInfo, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        // check your password and confirm password are equal
        if (password !== confirmPassword) {
            setErrors({ ...errors, errorConfirmPassword: true })
            return
        }
        dispatch(register(firstName, lastName, email, password))
        // call your api to register

    }
    const style_ = { width: "50%", margin: "auto", marginTop: "20%" }

    return (
        <div className="container">
            <div>

                <Card
                    bg="light"
                    text="dark"
                    className="mb-2 align-middle register-card"
                >
                    <Card.Body className="p-4">
                        <h2 className="m-2 text-center">REGISTER</h2>
                        <hr />
                        {errors.errorConfirmPassword && <Alert variant="danger">{message.confirmPassword}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="FirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    value={firstName} required
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="LastName"
                                className="my-2">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    value={lastName} required
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="Email" className="my-2">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email} required
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="Password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password} required
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="ConfirmPassword">
                                <Form.Label className="mt-2">Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword} required
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button
                                className="mt-3 form-control"
                                variant="primary"
                                type="submit"
                            >
                                Register
                            </Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer>{error && <Toast>
                        <Toast.Header closeButton={false}>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto text-danger">Error</strong>
                        </Toast.Header>
                        <Toast.Body>{error}</Toast.Body>
                    </Toast>}</Card.Footer>
                </Card>
            </div>
        </div>
    )
}

export default Register
