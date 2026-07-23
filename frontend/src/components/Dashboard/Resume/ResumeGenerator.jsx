import React, { useState } from "react";
import "./ResumeGenerator.css";

const ResumeGenerator = () => {

    const [projectName, setProjectName] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [description, setDescription] = useState("");

    const [bullets, setBullets] = useState([]);

    const [loading, setLoading] = useState(false);

    const [source, setSource] = useState("");



    const generateBullets = async () => {

        try {

            setLoading(true);
            setBullets([]);


            const token = localStorage.getItem("token");


            const response = await fetch(
                "http://localhost:5000/api/resume/generate",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    },

                    body:JSON.stringify({

                        project_name:projectName,
                        technologies:technologies,
                        description:description

                    })
                }
            );


            const data = await response.json();


            if(data.success){

                setBullets(data.bullets);

                setSource(data.source);

            }


        }catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }

    };



    return (

        <div className="resume-page">


            {/* INPUT CARD */}

            <div className="resume-card">


                <h2>
                    AI Resume Bullet Generator
                </h2>


                <p>
                    Generate ATS friendly resume points using AI
                </p>



                <input

                    type="text"

                    placeholder="Project Name"

                    value={projectName}

                    onChange={(e)=>setProjectName(e.target.value)}

                />



                <input

                    type="text"

                    placeholder="Technologies (React, Flask, MySQL)"

                    value={technologies}

                    onChange={(e)=>setTechnologies(e.target.value)}

                />



                <textarea

                    placeholder="Describe your project..."

                    value={description}

                    onChange={(e)=>setDescription(e.target.value)}

                />



                <button
                    onClick={generateBullets}
                    disabled={loading}
                >

                    {
                        loading
                        ? "Generating..."
                        : "Generate Bullets"
                    }

                </button>


            </div>





            {/* RESPONSE SECTION */}

            {
                bullets.length > 0 &&

                <div className="resume-result">


                    <div className="result-header">

                        <h2>
                            Generated Resume Points
                        </h2>



                    </div>



                    <div className="bullet-list">


                        {
                            bullets.map((item,index)=>(


                                <div 
                                    className="bullet-item"
                                    key={index}
                                >


                                    <div className="bullet-number">

                                        {index+1}

                                    </div>



                                    <p>

                                        {item}

                                    </p>



                                </div>


                            ))
                        }


                    </div>


                </div>

            }


        </div>

    );

};


export default ResumeGenerator;