import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import profile_pic from './profile_pic.png'
import { formatDate } from './utils'

const CommentModal = ({ id, handleClose, show }) => {

    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    const { userInfo } = useSelector(state => state.userLogin)
    const { token } = userInfo

    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    useEffect(() => {
        axios.get(SERVER_URL + `api/comments/${id}/`, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(res => setComments(res.data))
            .catch(err => console.log(err))
    }, [id, token, comment])

    const postComment = () => {
        axios.post(SERVER_URL + `api/posts/${id}/comments/`, { comment: comment }, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(res => setComment(''))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Comments...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 row g-2" controlId="exampleForm.ControlTextarea1">
                            <div className="col-9">
                                <Form.Control as="input" placeholder={`Write a comment...`}
                                    value={comment} onChange={(e) => setComment(e.target.value)} />
                            </div>
                            <div className="col-3">
                                <Button variant="btn btn-success" onClick={postComment}>
                                    Comment
                                </Button>
                            </div>
                        </Form.Group>
                    </Form>
                    <hr className="mb-2" />
                    {comments.map((comment, index) => (
                        <div key={index} className="mx-2 mb-0">
                            <div className="row">
                                <div className="col-auto">
                                    <Image src={profile_pic} alt="avatar" roundedCircle className="comment-avatar" />
                                </div>
                                <div className="col-10">
                                    <div className="row comment">
                                        <div className="col-12">
                                            <p className="comment-posted-by m-0">{comment.posted_by}</p>
                                        </div>
                                        <div className="col-12">
                                            <p className="mb-1">{comment.content}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-9">
                                            <p role="button" className="text-muted comment-footer-text">{formatDate(comment.date_posted)}</p>
                                        </div>
                                        <div className="col-3">
                                            <p role="button" className="text-danger m-auto comment-footer-text">Report</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CommentModal
