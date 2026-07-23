import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    FiArrowRight,
    FiMap,
    FiClipboard,
    FiMic
} from "react-icons/fi";

import axios from "axios";

import "./CareerHero.css";


export default function CareerHero() {


    const navigate = useNavigate();


    const [dashboard, setDashboard] = useState({

        roadmapProgress: 0,

        latestQuiz: 0,

        mockInterview: 0

    });



    useEffect(() => {

        fetchDashboard();

    }, []);



    const fetchDashboard = async () => {


        try {


            const token = localStorage.getItem("token");


            const response = await axios.get(

                "https://career-genie-backend-gf7z.onrender.com/api/dashboard",

                {

                    headers: {

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );


            console.log(
                "Dashboard Data:",
                response.data
            );


            setDashboard(
                response.data.dashboard
            );


        }

        catch(error) {


            console.log(
                "Dashboard Error:",
                error.response?.data || error.message
            );


        }


    };





    return (

        <section className="cg-hero">


            <div className="cg-hero-bg">

                <div className="cg-blob cg-blob-1"></div>

                <div className="cg-blob cg-blob-2"></div>

                <div className="cg-grid"></div>

            </div>





            {/* LEFT */}

            <motion.div

                className="cg-hero-left"

                initial={{
                    opacity:0,
                    x:-40
                }}

                animate={{
                    opacity:1,
                    x:0
                }}

                transition={{
                    duration:.7
                }}

            >


                <span className="cg-tag">

                    🚀 Career Genie AI Assistant

                </span>



                <h1 className="cg-title">

                    Continue Building Your

                    <span>

                        {" "}Dream Career

                    </span>

                </h1>




                <p className="cg-description">

                    Track your learning progress,
                    improve your skills,
                    practice interviews and follow your
                    personalized roadmap to become
                    industry ready.

                </p>





                <div className="cg-buttons">


                    <motion.button

                        whileHover={{
                            scale:1.05
                        }}

                        whileTap={{
                            scale:.95
                        }}

                        className="cg-primary-btn"

                        onClick={() =>
                            navigate("/roadmap")
                        }

                    >

                        Continue Roadmap

                        <FiArrowRight />

                    </motion.button>





                    <motion.button

                        whileHover={{
                            scale:1.05
                        }}

                        whileTap={{
                            scale:.95
                        }}

                        className="cg-secondary-btn"

                        onClick={() =>
                            navigate("/projects")
                        }

                    >

                        Explore Projects


                    </motion.button>


                </div>



            </motion.div>








            {/* RIGHT */}

            <motion.div

                className="cg-hero-right"

                initial={{
                    opacity:0,
                    x:50
                }}

                animate={{
                    opacity:1,
                    x:0
                }}

                transition={{
                    duration:.8
                }}

            >




                <MiniCard

                    icon={<FiMap />}

                    title="Roadmap Progress"

                    value={dashboard.roadmapProgress}

                />





                <MiniCard

                    icon={<FiClipboard />}

                    title="Latest Quiz"

                    value={dashboard.latestQuiz}

                />





                <MiniCard

                    icon={<FiMic />}

                    title="Mock Interview"

                    value={dashboard.mockInterview}

                />



            </motion.div>



        </section>

    );

}







function MiniCard({

    icon,

    title,

    value

}) {


    return (


        <motion.div

            whileHover={{
                y:-8
            }}

            className="cg-mini-card"

        >


            <div className="cg-icon">

                {icon}

            </div>



            <div>


                <p>

                    {title}

                </p>



                <h2>

                    {value}%

                </h2>


            </div>


        </motion.div>


    );

}
