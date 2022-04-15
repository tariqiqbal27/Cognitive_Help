import { Button, Image, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import NewPostCard from './components/NewPostCard'
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import profile_pic from './components/profile_pic.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CommentModal from './components/CommentModal';


const Feed = () => {

    const [posts, setPosts] = useState([])
    const [commentId, setCommentId] = useState(0)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleComment = (postId) => {
        setCommentId(postId)
        setShow(true)
    }


    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin;
    const navigate = useNavigate()

    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    useEffect(() => {
        axios.get(SERVER_URL + 'api/posts/', { headers: { 'Authorization': 'Bearer ' + userInfo.token } })
            .then(res => {
                setPosts(res.data)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(SERVER_URL + 'api/posts/', { headers: { 'Authorization': 'Bearer ' + userInfo.token } })
                .then(res => {
                    setPosts(res.data)
                    //console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }, 5000)
        return () => clearInterval(interval)
    }, [posts, userInfo])

    const formatDate = (dateString) => {
        let returnParam;
        const today = new Date()
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        const getDate = new Date(dateString)

        const diff = today.getTime() - getDate.getTime()
        if (getDate.getDate() == today.getDate()) {
            returnParam = "Today at " + getDate.getHours() + ":" + getDate.getMinutes()
        }
        else if (diff <= (24 * 60 * 60 * 1000)) {
            returnParam = "Yesterday at " + getDate.getHours() + ":" + getDate.getMinutes()
        }
        else {
            const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
            return new Date(dateString).toLocaleDateString(undefined, options)
        }
        return returnParam

    }


    return (
        <Container style={{ width: "100%", zIndex: "1" }}>
            <Row className="justify-content-center">
                <Col className="mx-5 m-2 bg-white rounded-corner shadow-lg" md={5}>
                    <NewPostCard />
                </Col>
            </Row>
            <CommentModal id={commentId} handleClose={handleClose} show={show} />
            {posts.map(post => {

                return (<Row key={post.id} className="justify-content-center ">
                    <Col className="mx-5 m-2 bg-white p-2 rounded-corner" md={5}>
                        <Row className="m-2">
                            <Col md={1}>
                                <Image src={profile_pic} roundedCircle className="mr-5 feed-avatar" />
                            </Col>
                            <Col md={9} className="ps-4">
                                <h6 className="m-0">{post.posted_by}</h6>
                                <Form.Text className="text-muted py-auto">{formatDate(post.date_posted)}</Form.Text>
                            </Col>
                        </Row>
                        <Row className="mx-3">
                            <p>{post.content}</p>
                        </Row>
                        <hr />
                        <Row className="m-auto">
                            <Col md={9}>
                                <Button variant="primary form-control" onClick={() => handleComment(post.id)}>Comment</Button></Col>
                            <Col md={3}><Button variant="danger" className="form-control">Report</Button></Col>
                        </Row>
                        <Row className="m-auto mt-3">

                        </Row>
                    </Col>
                </Row>)
            })}


        </Container>
    )
}

export default Feed
