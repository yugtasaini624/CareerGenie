import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
    FiCode,
    FiLayers,
    FiClock,
    FiArrowRight
} from "react-icons/fi";

import axios from "axios";

import "./RecommendedProject.css";


export default function RecommendedProject() {


    const [project,setProject] = useState(null);



    useEffect(()=>{

        fetchProject();

    },[]);





    const fetchProject = async()=>{


        try{


            const token = localStorage.getItem(
                "token"
            );


            const response = await axios.get(

                "http://127.0.0.1:5000/api/projects/latest",

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );



            console.log(
                "Project:",
                response.data
            );



            setProject(
                response.data.project
            );


        }


        catch(error){

            console.log(
                error.response?.data || error.message
            );

        }


    };





    if(!project)
    return null;





    return (


        <motion.section

            className="cg-project-card"

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


            <div className="cg-project-glow"></div>




            <div className="cg-project-header">


                <div className="cg-project-icon">


                    <FiCode />


                </div>



                <div>


                    <h2>

                        Latest Recommended Project

                    </h2>


                    <p>

                        Continue building your portfolio

                    </p>


                </div>


            </div>





            <div className="cg-project-body">


                <h3>

                    {project.project_name}

                </h3>


                <p>

                    Build this project to improve your portfolio
                    and become industry ready.

                </p>


            </div>





            <div className="cg-project-tags">


                {
                    project.skills.map(
                        (skill,index)=>(

                            <span key={index}>

                                {skill}

                            </span>

                        )
                    )
                }


            </div>





            <div className="cg-project-info">


                <div>

                    <FiLayers />

                    {project.difficulty}

                </div>



                <div>

                    <FiClock />

                    2-3 Weeks

                </div>



            </div>





            <button className="cg-project-btn">


                View All Projects


                <FiArrowRight />


            </button>




        </motion.section>


    );

}