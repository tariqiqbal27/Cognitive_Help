import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS, CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Card } from 'react-bootstrap'

const Result = (props) => {

    const [level, setLevel] = useState()
    const [resLable, setResLable] = useState('')

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
    //ChartJS.defaults.color = "#000000"

    const labels = ['Normal', 'Mild', 'Moderate', 'Severe', 'Extreme Severe']
    const { result, resultType } = props
    useEffect(() => {
        if (resultType == 1)
            setResLable('Depression Level')
        else
            setResLable('Stress Level')
    }, [])

    const backColor = ['#00cc44', '#009900', '#ff9933', '#ff471a', '#991f00']

    const data = {
        labels: labels,
        datasets: [
            {
                label: resLable,
                data: [20, 40, 60, 80, 100],

                backgroundColor: backColor,
                borderColor: [
                    '#006622',
                    '#009900',
                    '#ff9933',
                    '#e62e00',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
                hoverBorderColor: '#000'
            },

        ],


    }
    
    return (
        <div className="col-md-7">
            <Card>
                <Card.Header as="h5">
                    {resultType === 1 && <div>Depression Level</div>}
                    {resultType === 2 && (<div>Stress Level </div>)}
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        {resultType === 1 && (<div>Your current Depression Level is <b style={{ color: backColor[labels.indexOf(result)] }} > {result}</b></div>)}
                        {resultType === 2 && (<div>Your current Stress Level <b style={{ color: backColor[labels.indexOf(result)] }}>{result}</b></div>)}
                    </Card.Title>
                    <Card.Text>
                    </Card.Text>

                    <Bar data={data} />

                    <a href='/' className='btn btn-primary'>Back</a>
                </Card.Body>
            </Card>

        </div >
    )
}

export default Result
