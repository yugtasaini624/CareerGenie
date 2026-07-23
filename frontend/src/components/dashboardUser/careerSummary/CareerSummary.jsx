import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
    FiTarget,
    FiMap,
    FiAward,
    FiMic,
    FiFileText,
    FiTrendingUp
} from "react-icons/fi";

import axios from "axios";

import "./CareerSummary.css";


export default function CareerSummary() {


    const [summary,setSummary] = useState({

        careerGoal:"Not Selected",

        currentWeek:0,

        totalWeeks:0,

        quizScore:0,

        interviewScore:0,

        resumeStatus:"Not Added"

    });




    useEffect(()=>{


        fetchSummary();


    },[]);





    const fetchSummary = async()=>{


        try{


            const token = localStorage.getItem(
                "token"
            );



            const response = await axios.get(

                "http://127.0.0.1:5000/api/dashboard/summary",

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );



            console.log(
                "Summary Data:",
                response.data
            );



            setSummary(
                response.data.summary
            );


        }


        catch(error){


            console.log(

                "Summary Error:",

                error.response?.data || error.message

            );


        }


    };





    return (


        <motion.section

            className="cg-summary-card"

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


            <div className="cg-summary-glow"></div>





            <div className="cg-summary-header">


                <div className="cg-summary-icon">


                    <FiTrendingUp />


                </div>



                <div>


                    <h2>

                        Career Summary

                    </h2>



                    <p>

                        Your latest learning progress

                    </p>


                </div>



            </div>







            <div className="cg-summary-list">





                <SummaryItem

                    icon={<FiTarget />}

                    title="Career Goal"

                    value={summary.careerGoal}

                />





                <SummaryItem

                    icon={<FiMap />}

                    title="Roadmap"

                    value={`Week ${summary.currentWeek} of ${summary.totalWeeks}`}

                />





                <SummaryItem

                    icon={<FiAward />}

                    title="Latest Quiz"

                    value={`${summary.quizScore}%`}

                />





                <SummaryItem

                    icon={<FiMic />}

                    title="Mock Interview"

                    value={`${summary.interviewScore}%`}

                />





                <SummaryItem

                    icon={<FiFileText />}

                    title="Resume"

                    value={summary.resumeStatus}

                />





            </div>







            <div className="cg-summary-footer">


                <span>

                    Keep learning to improve your placement readiness.

                </span>


            </div>





        </motion.section>


    );

}








function SummaryItem({

    icon,

    title,

    value

}){


    return (


        <div className="cg-summary-item">


            {icon}



            <div>


                <h4>

                    {title}

                </h4>



                <span>

                    {value}

                </span>


            </div>


        </div>


    );

}