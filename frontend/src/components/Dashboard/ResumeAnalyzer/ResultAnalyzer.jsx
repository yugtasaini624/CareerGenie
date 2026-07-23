import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import "./ResultAnalyzer.css";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function ResultAnalyzer() {

    const navigate = useNavigate();
    
    const location = useLocation();

console.log("Location:", location);

const result = location.state;

console.log("Result:", result);
    
    console.log(result);
    useEffect(() => {

        if (!result) {

            navigate("/skill-gap");

        }

    }, [result, navigate]);

    if (!result) {

        return null;

    }

    const chartData = {

        labels: [

            "Have",

            "Missing"

        ],

        datasets: [

            {

                data: [

                    result.resume_skills.length,

                    result.missing_skills.length

                ],

                backgroundColor: [

                    "#6366f1",

                    "#334155"

                ],

                borderWidth: 0

            }

        ]

    };

    const chartOptions = {

        cutout: "72%",

        plugins: {

            legend: {

                display: false

            }

        }

    };

    return (

        <div className="card">

            <div className="left">

                <Doughnut

                    data={chartData}

                    options={chartOptions}

                />

                <div className="stats">

                    Total Skills

                    <strong>

                        {

                            result.resume_skills.length +

                            result.missing_skills.length

                        }

                    </strong>

                </div>

                <div className="stats">

                    Missing Skills

                    <strong>

                        {

                            result.missing_skills.length

                        }

                    </strong>

                </div>

            </div>

            <div className="right">

                <h1 className="title">

                    {result.job_role}

                    {

                        result.backend_stack &&

                        ` - ${result.backend_stack}`

                    }

                </h1>

                <div className="match-badge">

                    Match Score : {result.match}%

                </div>

                <div className="section">

                    <h3>

                        Extracted Skills

                    </h3>

                    <div className="skills">

                        {

                            result.resume_skills.map(

                                (skill, index) => (

                                    <div

                                        key={index}

                                        className="skill"

                                    >

                                        {skill}

                                    </div>

                                )

                            )

                        }

                    </div>

                </div>

                <div className="section">

                    <h3>

                        Missing Skills

                    </h3>

                    <div className="skills">

                        {

                            result.missing_skills.map(

                                (skill, index) => (

                                    <div

                                        key={index}

                                        className="skill missing"

                                    >

                                        {skill}

                                    </div>

                                )

                            )

                        }

                    </div>

                </div>

                <div className="bottom-action">

                    <button

                        className="upload-btn"

                        onClick={() =>

                            navigate("/skill-gap")

                        }

                    >

                        Upload Another Resume

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ResultAnalyzer;