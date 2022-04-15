import React, { useState, useEffect } from 'react'
import { Button, Row, Image, Form, Col, Modal, FormCheck } from 'react-bootstrap';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import profile_pic from './profile_pic.png'

const NewPostCard = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false)

    const [postContent, setPostContent] = useState('')

    const [enablePostButton, setEnablePostButton] = useState(true)

    const createPost = (e) => {
        e.preventDefault()
        axios.post(SERVER_URL + 'api/posts/create', { text: postContent }, { headers: { 'Authorization': 'Bearer ' + userInfo.token } })
            .then(res => {
                console.log(res.data)
                setShowModal(false)
                setPostContent('')
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (postContent.length > 5) {
            setEnablePostButton(false)
        }
        else {
            setEnablePostButton(true)
        }
    }, [postContent])


    const CreatePostModal = () => <Modal dialogClassName='modal-50' centered show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="textarea1">
                    <Form.Control as="textarea" rows={3} placeholder={`What's on your mind, ${userInfo.first_name}?`}
                        value={postContent} onChange={(e) => setPostContent(e.target.value)} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" disabled={enablePostButton} onClick={createPost} >
                Post
            </Button>
        </Modal.Footer>
    </Modal>

    return (

        <div className="m-2 p-3">
            {CreatePostModal()}
            <Row>
                <Col md={2}>
                    <Image src={profile_pic} roundedCircle className="mr-5 " style={{ width: "50px", height: "50px" }} />
                </Col>
                <Col md={9} className="my-auto">
                    <Form.Control type="text" placeholder={`What's on your mind, ${userInfo.first_name}?`}
                        role="button" onClick={() => setShowModal(true)} />
                </Col>
            </Row>
            <hr />
            Feel free to share anything with the world

        </div>
    )
}

export default NewPostCard

