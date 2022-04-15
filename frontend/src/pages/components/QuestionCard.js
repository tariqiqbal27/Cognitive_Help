import React from 'react'
import { Button, Card } from 'react-bootstrap';

const QuestionCard = ({ handleAnswer, currentQuestion, questions, answerOptions, handlePreviousQuestion }) => {
    return (
        <div>
            <Card>
                <Card.Header> <span>Question {currentQuestion + 1}</span>/{questions.length}</Card.Header>
                <Card.Body>
                    <Card.Title className="text-dark">{questions[currentQuestion].questionText}</Card.Title>
                    <Card.Text>
                        <div className='answer-section my-4'>
                            {answerOptions.map((answerOption, key) => (
                                <div key={key}>
                                    <Button className="btn m-1" type="button" variant="outline-primary" onClick={() => { handleAnswer(answerOption.point) }}>{answerOption.answerText}</Button>
                                </div>
                            ))}
                        </div>
                        <hr className="my-2" />
                        {currentQuestion > 0 &&
                            <Button className="my-2" type="button" variant="danger" onClick={handlePreviousQuestion}>Previous Questions</Button>}

                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default QuestionCard
