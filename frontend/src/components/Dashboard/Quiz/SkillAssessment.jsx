import { useState } from "react";

import AssessmentIntro from "./AssessmentIntro";
import QuizCard from "./QuizCard";

import { toast } from "react-toastify";
import axios from "axios";


export default function SkillAssessment() {


    const [started, setStarted] = useState(false);

    const [quiz, setQuiz] = useState([]);

    const [sessionId, setSessionId] = useState(null);

    const [loading, setLoading] = useState(false);



    const startAssessment = async (data) => {

        try {

            setLoading(true);


            const token = localStorage.getItem("token");


            if (!token) {

                toast.error(
                    "Please login first"
                );

                return;
            }



            const response = await axios.post(

                "http://127.0.0.1:5000/api/quiz/generate",

                {
                    topic: data.skills.join(", "),
                    difficulty: data.difficulty
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }

            );



            if (response.data.success) {


                setQuiz(
                    response.data.questions
                );


                setSessionId(
                    response.data.session_id
                );


                setStarted(true);



                toast.success(
                    "AI Assessment Generated 🚀"
                );

            }


        } catch (error) {


            console.log(
                error.response?.data || error
            );


            toast.error(

                error.response?.data?.message ||
                "Quiz generation failed"

            );


        } finally {


            setLoading(false);

        }

    };




    return (

        <>

            {

                loading ?


                (

                    <div>
                        Generating AI Assessment...
                    </div>

                )


                :


                !started ?


                (

                    <AssessmentIntro
                        onStart={startAssessment}
                    />

                )


                :


                (

                    <QuizCard

                        quizData={quiz}

                        sessionId={sessionId}

                    />

                )

            }


        </>

    );

}