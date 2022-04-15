import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstant";
import { Container, Form, Card } from 'react-bootstrap'
import axios from 'axios'

const Profile = () => {

    const [Name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [image, setImage] = useState('')


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const userDetails = useSelector(state => state.userDetails)

    const { loading, error, user } = userDetails

    const { userInfo } = userLogin;
    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    const getUserProfile = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`${SERVER_URL}account/user/`, config)
        setName(data.first_name + " " + data.last_name)
        setEmail(data.email)
        // setBirthdate(data.birthdate)
        // setImage(data.image)

    }

    useEffect(() => {
        document.title = "Profile"
        if (!userInfo)
            navigate('/login')
        else {
            getUserProfile()
        }

    }, [])

    return (
        <div>
            <Container
                style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center" }}>
                <div>
                    <Card className="mt-5" style={{ width: '35rem', height: '70%' }}>
                        <Card.Header as="h5" >Profile</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control disabled value={Name} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control disabled value={email} />
                                </Form.Group>
                            </Form>
                        </Card.Body>

                    </Card>
                </div>

            </Container >
        </div>
    )
}

export default Profile
