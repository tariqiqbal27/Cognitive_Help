import React from 'react'

const Dashboard = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-light">
                    <div className="mt-4">
                        <h1 className="display-4"><center>Depression & Stress Level Analyzer</center></h1>
                        <p className="lead text-center">
                            This is a simple application that will help you to check your depression level.</p>
                        <hr className="my-4" />
                        <p>It will take you through a few questions and then show you your depression level.</p>
                        <p> You can check your depression level anytime by clicking the button below. </p>
                        <p className="lead"></p>
                        <a className="btn btn-primary btn-lg" href="/depression" role="button">Check Depression Level</a>
                        <p className="mt-5"> You can check your depression level anytime by clicking the button below. </p>
                        <a className="btn btn-primary btn-lg" href="/stress" role="button">Check Stress Level</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
