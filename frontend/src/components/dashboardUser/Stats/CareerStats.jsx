import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
    FiTrendingUp,
    FiAward,
    FiMic
} from "react-icons/fi";

import axios from "axios";

import "./CareerStats.css";


export default function CareerStats() {


    const [stats,setStats] = useState({

        roadmapProgress:0,

        latestQuiz:0,

        interviewScore:0

    });





    useEffect(()=>{

        fetchStats();

    },[]);





    const fetchStats = async()=>{


        try{


            const token = localStorage.getItem(
                "token"
            );



            const response = await axios.get(

                "http://127.0.0.1:5000/api/dashboard",

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );



            console.log(
                "Dashboard Stats:",
                response.data
            );



            setStats({

                roadmapProgress:
                response.data.dashboard.roadmapProgress,


                latestQuiz:
                response.data.dashboard.latestQuiz,


                interviewScore:
                response.data.dashboard.mockInterview

            });



        }


        catch(error){


            console.log(

                "Stats Error:",
                error.response?.data || error.message

            );


        }


    };







    const cards = [


        {

            icon:<FiTrendingUp />,

            title:"Roadmap Progress",

            value:`${stats.roadmapProgress}%`,

            color:"#00b4d8"

        },


        {

            icon:<FiAward />,

            title:"Latest Quiz",

            value:`${stats.latestQuiz}%`,

            color:"#2ecc71"

        },


        {

            icon:<FiMic />,

            title:"Interview Score",

            value:`${stats.interviewScore}%`,

            color:"#38bdf8"

        }


    ];







    return (


        <section className="cg-stats">


            {

                cards.map((item,index)=>(


                    <motion.div


                        key={index}


                        className="cg-stat-card"


                        initial={{

                            opacity:0,

                            y:30

                        }}



                        animate={{

                            opacity:1,

                            y:0

                        }}



                        transition={{

                            delay:index*.1

                        }}



                        whileHover={{

                            y:-8

                        }}


                    >



                        <div

                            className="cg-stat-icon"

                            style={{

                                color:item.color

                            }}

                        >

                            {item.icon}


                        </div>




                        <h2>

                            {item.value}

                        </h2>




                        <p>

                            {item.title}

                        </p>



                    </motion.div>


                ))

            }



        </section>


    );

}