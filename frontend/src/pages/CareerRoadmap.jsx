import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import recommendRoadmap from "../utils/recommendRoadmap";
import "./CareerRoadmap.css";


function CareerRoadmap(){


    const [roadmap,setRoadmap] = useState([]);



 useEffect(()=>{


    const profile = JSON.parse(
        localStorage.getItem("careerProfile")
    );



    if(profile){


        const generatedRoadmap =
        recommendRoadmap(profile);



        setRoadmap(generatedRoadmap);


    }


},[]);






    return(

        <div className="roadmap-page">



            <motion.div

            className="roadmap-header"

            initial={{
                opacity:0,
                y:-40
            }}

            animate={{
                opacity:1,
                y:0
            }}

            transition={{
                duration:0.6
            }}

            >

                <h1>
                    Your AI Career Roadmap 🚀
                </h1>


                <p>
                    Follow this path to reach your career goal.
                </p>


            </motion.div>






            <div className="timeline">


            {
                roadmap.map((step,index)=>(


                    <motion.div

                    className="roadmap-card"

                    key={index}


                    initial={{
                        opacity:0,
                        y:80
                    }}


                    whileInView={{
                        opacity:1,
                        y:0
                    }}


                    viewport={{
                        once:true,
                        amount:0.3
                    }}


                    transition={{
                        duration:0.6,
                        delay:index*0.15
                    }}

                    >




                        <div className="step-number">

                            {index+1}

                        </div>





                        <div className="roadmap-content">


                            <h2>

                                {step.title}

                            </h2>



                            <div className="skills">


                            {

                            step.skills.map(skill=>(


                                <span key={skill}>

                                    {skill}

                                </span>


                            ))

                            }


                            </div>




                            <div className="road-progress">

                                <motion.div

                                initial={{
                                    width:0
                                }}

                                whileInView={{
                                    width:`${(index+1)*25}%`
                                }}

                                viewport={{
                                    once:true
                                }}

                                transition={{
                                    duration:1
                                }}

                                />


                            </div>



                            <p>

                            Step {index+1} of your journey

                            </p>



                        </div>




                    </motion.div>



                ))
            }


            </div>




        </div>

    );


}


export default CareerRoadmap;