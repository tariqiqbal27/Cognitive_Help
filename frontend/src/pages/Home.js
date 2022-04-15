import React from 'react'
import { Image } from 'react-bootstrap'
import MedImg from '../images/med.png'

const Home = () => {
    return (
        <div className="container-fluid">
            <div class="row">
                <div className="col-6 home-background">
                    <div className="home-page-text">
                        <p>Cognitive Help is a web app to...</p>
                        <p>Start Self-Care</p>
                        <p>Analyze your Stress & Depression Level</p>
                    </div>
                </div>
                <div className="col-6" style={{ backgroundColor: "#FBF7F2" }}>
                    <Image src={MedImg} fluid={true} />
                </div>
            </div>
        </div >
    )
}

export default Home
