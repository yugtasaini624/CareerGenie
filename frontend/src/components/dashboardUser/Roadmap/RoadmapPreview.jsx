import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
    FiCheckCircle,
    FiPlayCircle,
    FiLock,
    FiArrowRight
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./RoadmapPreview.css";


export default function RoadmapPreview() {


    const navigate = useNavigate();


    const [roadmap,setRoadmap] = useState([]);





    useEffect(()=>{

        fetchRoadmap();

    },[]);





    const fetchRoadmap = async()=>{


        try{


            const token = localStorage.getItem(
                "token"
            );



            const response = await axios.get(

                "https://career-genie-backend-gf7z.onrender.com/api/roadmap/",

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );



            console.log(
                "Roadmap:",
                response.data
            );



            setRoadmap(

                response.data.roadmap.slice(0,5)

            );


        }


        catch(error){


            console.log(

                "Roadmap Error:",

                error.response?.data || error.message

            );


        }


    };






    const getStatus = (item,index)=>{


        const completed = item.tasks.every(

            task=>task.completed

        );



        if(completed)

            return "completed";



        if(index===0 || 
           !roadmap[index-1]?.tasks.every(
              task=>task.completed
           )
        )

            return "current";



        return "locked";


    };







    return (


        <motion.section

            className="cg-roadmap-card"


            initial={{

                opacity:0,

                y:40

            }}


            animate={{

                opacity:1,

                y:0

            }}


            transition={{

                duration:.6

            }}

        >


            <div className="cg-roadmap-glow"></div>





            <div className="cg-roadmap-header">


                <div>


                    <h2>

                        Roadmap Preview

                    </h2>


                    <p>

                        Continue your learning journey

                    </p>


                </div>


            </div>






            <div className="cg-roadmap-list">


                {

                    roadmap.map((item,index)=>{


                        const status = getStatus(
                            item,
                            index
                        );



                        return (


                        <div

                            key={index}

                            className={
                                `cg-roadmap-item ${status}`
                            }

                        >


                            <div className="cg-roadmap-icon">


                                {

                                    status==="completed"

                                    ?

                                    <FiCheckCircle />

                                    :

                                    status==="current"

                                    ?

                                    <FiPlayCircle />

                                    :

                                    <FiLock />

                                }


                            </div>




                            <div className="cg-roadmap-content">


                                <h3>

                                    Week {item.week}

                                </h3>



                                <span>

                                    {item.goal}

                                </span>


                            </div>


                        </div>


                        );


                    })


                }



            </div>






            <button

                className="cg-roadmap-btn"

                onClick={()=>navigate("/roadmap")}

            >


                Continue Roadmap


                <FiArrowRight />


            </button>




        </motion.section>


    );

}
