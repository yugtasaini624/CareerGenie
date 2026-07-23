import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import assessmentQuestions from "../../../data/assessmentData";
import "./SkillAssessment.css";


function SkillAssessment() {


    const navigate = useNavigate();


    const [current, setCurrent] = useState(0);

    const [answers, setAnswers] = useState({});

    const [loading, setLoading] = useState(false);


    const question = assessmentQuestions[current];




    const handleSelect = (option) => {


        if(question.type === "multiple"){


            const oldAnswers =
            answers[question.id] || [];



            if(oldAnswers.includes(option)){


                setAnswers({

                    ...answers,

                    [question.id]:
                    oldAnswers.filter(
                        item => item !== option
                    )

                });


            }

            else{


                setAnswers({

                    ...answers,

                    [question.id]:[
                        ...oldAnswers,
                        option
                    ]

                });


            }


        }


        else{


            setAnswers({

                ...answers,

                [question.id]:option

            });


        }

    };








    const generateRoadmap = async()=>{


        try{


            setLoading(true);



            const token =
            localStorage.getItem("token");
            
            const roadmapData = {

    current_skills:
    answers.current_skills || [],


    learning_goals:
    answers.learning_goals || [],


    level:
    answers.level || "Beginner",


    target_role:
    answers.target_role || "",


    weekly_hours:
    Number(answers.weekly_hours || 10),


    learning_pace:
    answers.learning_pace || "Moderate"

};




            const response = await fetch(

                "https://career-genie-backend-gf7z.onrender.com/api/roadmap/generate",

                {

                    method:"POST",


                    headers:{


                        "Content-Type":
                        "application/json",


                        Authorization:
                        `Bearer ${token}`

                    },


                    body:
                    JSON.stringify(roadmapData)

                }

            );





            const data =
            await response.json();




            if(data.success){



                localStorage.setItem(

                    "careerProfile",

                    JSON.stringify(
                        answers
                    )

                );



                navigate("/roadmap");



            }


            else{


                alert(

                    data.message ||
                    "Roadmap generation failed"

                );


            }



        }


        catch(error){


            console.log(error);


            alert(
                "Server error while generating roadmap"
            );


        }



        finally{


            setLoading(false);


        }


    };








    const nextQuestion = ()=>{


        if(
            current <
            assessmentQuestions.length - 1
        ){


            setCurrent(
                current + 1
            );


        }


        else{


            generateRoadmap();


        }


    };








    const isAnswered = ()=>{


        const answer =
        answers[question.id];



        if(!answer)
            return false;




        if(Array.isArray(answer)){


            return answer.length > 0;


        }



        return true;


    };








    return(



        <div className="assessment-page">


            <motion.div


            className="question-card"


            key={current}


            initial={{
                opacity:0,
                x:80
            }}


            animate={{
                opacity:1,
                x:0
            }}


            transition={{
                duration:0.4
            }}


            >





                <div className="assessment-header">


                    <span>

                    Question {current + 1}/
                    {assessmentQuestions.length}

                    </span>




                    <div className="progress-bar">


                        <div

                        style={{

                        width:
                        `${((current+1)/
                        assessmentQuestions.length)
                        *100}%`

                        }}

                        />


                    </div>



                </div>







                <h2>

                    {question.question}

                </h2>








                <div className="options">


                {

                question.options.map(option=>(


                    <motion.button


                    key={option}


                    whileHover={{
                        scale:1.03
                    }}


                    whileTap={{
                        scale:0.97
                    }}



                    className={


                    question.type==="multiple"


                    ?


                    answers[question.id]
                    ?.includes(option)


                    ?
                    "selected-option"


                    :
                    ""



                    :



                    answers[question.id]===option


                    ?
                    "selected-option"


                    :
                    ""


                    }



                    onClick={()=>
                        handleSelect(option)
                    }


                    >


                    {option}


                    </motion.button>


                ))


                }


                </div>








                <button


                className="next-btn"


                disabled={
                    !isAnswered()
                    ||
                    loading
                }


                onClick={nextQuestion}


                >


                {


                current ===
                assessmentQuestions.length-1



                ?


                loading

                ?

                "Generating AI Roadmap..."

                :

                "Generate AI Roadmap 🚀"



                :



                "Next →"



                }



                </button>






            </motion.div>





        </div>



    );


}


export default SkillAssessment;
