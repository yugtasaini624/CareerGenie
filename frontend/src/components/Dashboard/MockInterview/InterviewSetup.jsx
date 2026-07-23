import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Briefcase,
    Sparkles,
    ArrowRight,
    CheckCircle,
    Clock
} from "lucide-react";

import { toast } from "react-toastify";

import "./InterviewSetup.css";


export default function InterviewSetup() {


    const navigate = useNavigate();


    const [role, setRole] = useState("");

    const [difficulty, setDifficulty] = useState("Intermediate");

    const [loading, setLoading] = useState(false);



    const startInterview = async () => {


        if (!role.trim()) {


            toast.error(
                "Please enter the role you're applying for."
            );


            return;


        }



        try {


            setLoading(true);



            const token = localStorage.getItem("token");



            const response = await fetch(

                "http://localhost:5000/api/interview/start",

                {

                    method: "POST",


                    headers: {


                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`


                    },


                    body: JSON.stringify({

                        role,

                        difficulty

                    })


                }

            );



            const data = await response.json();




            if (!response.ok || !data.success) {


                toast.error(

                    data.message ||
                    "Failed to start interview."

                );


                return;


            }




            toast.success(
                "Interview started successfully!"
            );
            navigate(

                `/mock-interview/chat/${data.session_id}`,

                {

                    state: {

                        sessionId: data.session_id,

                        firstMessage: data.question,

                        role,

                        difficulty

                    }

                }

            );



        }


        catch (error) {


            console.log(error);



            toast.error(
                "Server error. Please try again."
            );


        }


        finally {


            setLoading(false);


        }


    };




    return (


            <div className="interview-setup-page">


                <div className="setup-card">



                    <div className="setup-icon">


                        <Sparkles size={34} />


                    </div>




                    <h1>

                        AI Mock Interview

                    </h1>




                    <p>

                        Practice realistic AI interviews with personalized
                        questions, voice interaction, and receive a detailed
                        performance report at the end.

                    </p>





                    <div className="input-group">


                        <label>


                            <Briefcase size={18} />


                            Role Applying For


                        </label>



                        <input


                            type="text"


                            placeholder="Software Engineer Intern"


                            value={role}


                            onChange={(e) =>
                                setRole(e.target.value)
                            }


                        />


                    </div>







                    <div className="input-group">


                        <label>

                            Difficulty Level

                        </label>




                        <div className="difficulty-grid">



                            {
                                [
                                    "Beginner",
                                    "Intermediate",
                                    "Advanced"
                                ].map((level) => (


                                    <div


                                        key={level}


                                        className={

                                            difficulty === level

                                                ?

                                                "difficulty-card active"

                                                :

                                                "difficulty-card"

                                        }



                                        onClick={() => setDifficulty(level)}


                                    >


                                        {level}


                                    </div>


                                ))
                            }




                        </div>


                    </div>







                    <div className="features-box">



                        <h3>

                            Your Interview Includes

                        </h3>





                        <div className="feature-item">

                            <CheckCircle size={18} />

                            AI Voice Interview

                        </div>



                        <div className="feature-item">

                            <CheckCircle size={18} />

                            Personalized Questions

                        </div>




                        <div className="feature-item">

                            <CheckCircle size={18} />

                            Smart Follow-up Questions

                        </div>




                        <div className="feature-item">

                            <CheckCircle size={18} />

                            Detailed AI Performance Report

                        </div>




                        <div className="feature-item">

                            <Clock size={18} />

                            Estimated Time : 10 - 15 Minutes

                        </div>



                    </div>







                    <button


                        className="start-btn"


                        disabled={loading}


                        onClick={startInterview}


                    >



                        {

                            loading

                                ?

                                "Preparing Interview..."

                                :

                                "Start Interview"

                        }



                        <ArrowRight size={20} />



                    </button>




                </div>


            </div>

    );

}