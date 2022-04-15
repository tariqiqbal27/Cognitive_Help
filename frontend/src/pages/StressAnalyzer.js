import { Button, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Result from './Result';
import QuestionCard from './components/QuestionCard';

const StressAnalyzer = () => {

    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const answerOptions = [
        { answerText: "Did not apply to me at all", point: 0 },
        { answerText: "Applied to me to some degree, or some of the time", point: 1 },
        { answerText: "Applied to me to a considerable degree, or a good part of the time", point: 2 },
        { answerText: "Applied to me very much, or most of the time", point: 3 },
    ]
    const questions = [
        { questionText: "I found myself getting upset by quite trivial things." },
        { questionText: "I tended to over-react to situations." },
        { questionText: "I found it difficult to relax." },
        { questionText: "I found myself getting upset rather easily." },
        { questionText: "I felt that I was using a lot of nervous energy." },
        { questionText: "I found myself getting impatient when I was delayed in any way (eg, elevators, traffic lights, being kept waiting)." },
        { questionText: "I felt that I was rather touchy." },
        { questionText: "I found it hard to wind down." },
        { questionText: "I found that I was very irritable." },
        { questionText: "I found it hard to calm down after something upset me." },
        { questionText: "I found it difficult to tolerate interruptions to what I was doing." },
        { questionText: "I was in a state of nervous tension." },
        { questionText: "I was intolerant of anything that kept me from getting on with what I was doing." },
        { questionText: "I found myself getting agitated." }
    ]

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState('')
    const [showReview, setShowReview] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(SERVER_URL + 'api/stress/', { fields: JSON.stringify(answer) })
        if (response.data) {
            setShowScore(true);
            setResult(response.data.result)
            setShowReview(false);
            setShowResult(true);
        }
        console.error(response.error)
    }

    const handleAnswer = (point) => {
        setScore(score + point);
        let newAnswer = [...answer]
        newAnswer[currentQuestion] = point
        setAnswer(newAnswer);
        if (currentQuestion === questions.length - 1) {
            setShowScore(true);
            setShowReview(true)
            setAnswer(oldArray => [...oldArray, score])
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    }
    const handlePreviousQuestion = () => {
        setCurrentQuestion(currentQuestion - 1);
    }

    return (
        <div>
            <div className="container  my-5">
                <div className="row text-light">
                    <div className="col-md-12">
                        <h1 className="text-center">Stress Analyzer</h1>
                        <p className="text-center"> This is a simple application that will help you to check your Stress level. </p>
                    </div>
                    <hr className="my-4" />

                </div>
                {result && <Result result={result} resultType={2} />}
                {showReview &&
                    <div className='score-section'>
                        <Card>
                            <Card.Header>Review Your Answers</Card.Header>
                            <ListGroup variant="flush">
                                {questions.map((question, index) => {
                                    return (
                                        <div>
                                            <ListGroup.Item>
                                                Q{index + 1}. {question.questionText}
                                                <b className='mx-2'>({answerOptions[answer[index]].answerText})</b>
                                            </ListGroup.Item>
                                        </div>
                                    )
                                })}
                            </ListGroup>
                            <Card.Footer>
                                <Button className="mt-2 px-5" onClick={handleSubmit}>Submit</Button>
                            </Card.Footer>
                        </Card>
                    </div>
                }
                {!showScore && (
                    <div>
                        <p className="text-light"> Please answer the following questions to check your Stress level. </p>
                        <QuestionCard handleAnswer={handleAnswer}
                            currentQuestion={currentQuestion}
                            questions={questions}
                            answerOptions={answerOptions}
                            handlePreviousQuestion={handlePreviousQuestion} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default StressAnalyzer
