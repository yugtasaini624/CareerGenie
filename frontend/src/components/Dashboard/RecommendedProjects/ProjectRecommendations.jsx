import { useState } from "react";
import axios from "axios";

import {
    Sparkles,
    Code2,
    Database,
    Bot
} from "lucide-react";

import "./ProjectRecommendations.css";



export default function ProjectRecommendation() {


    const [career, setCareer] = useState("");

    const [skills, setSkills] = useState("");

    const [difficulty, setDifficulty] = useState(
        "Beginner"
    );


    const [projects, setProjects] = useState([]);

    const [source, setSource] = useState("");

    const [loading, setLoading] = useState(false);






    const generateProjects = async () => {


        if (
            !career.trim() ||
            !skills.trim()
        ) {

            return;

        }





        try {


            setLoading(true);



            const token =
                localStorage.getItem(
                    "token"
                );





            const response = await axios.post(


                "http://127.0.0.1:5000/api/projects/recommend",


                {


                    career: career,


                    skills:

                        skills
                            .split(",")
                            .map(
                                item => item.trim()
                            )
                            .filter(
                                item => item
                            ),



                    difficulty: difficulty


                },



                {


                    headers: {


                        Authorization:

                            `Bearer ${token}`


                    }


                }


            );





            if (
                response.data.success
            ) {


                setProjects(

                    response.data.projects || []

                );



                setSource(

                    response.data.source || ""

                );


            }





        }


        catch (error) {


            console.log(

                "PROJECT ERROR:",
                error

            );


        }


        finally {


            setLoading(false);


        }



    };









    return (

        <div className="project-page">





            <div className="project-header">


                <Sparkles size={38} />



                <h1>

                    AI Project Recommender

                </h1>



                <p>

                    Share your career goal and current skills.
                    AI will create portfolio projects made for you.

                </p>


            </div>









            <div className="project-form">





                <div className="input-group">


                    <label>

                        Career Goal

                    </label>



                    <input


                        value={career}


                        onChange={
                            e => setCareer(
                                e.target.value
                            )
                        }


                        placeholder="Example: Full Stack Developer"


                    />


                </div>









                <div className="input-group">


                    <label>

                        Your Skills

                    </label>



                    <input


                        value={skills}


                        onChange={
                            e => setSkills(
                                e.target.value
                            )
                        }


                        placeholder="React, Python, SQL"


                    />


                </div>









                <div className="input-group">


                    <label>

                        Difficulty

                    </label>



                    <select


                        value={difficulty}


                        onChange={
                            e => setDifficulty(
                                e.target.value
                            )
                        }


                    >


                        <option>

                            Beginner

                        </option>



                        <option>

                            Intermediate

                        </option>



                        <option>

                            Advanced

                        </option>



                    </select>


                </div>







                <button


                    className="generate-project-btn"


                    onClick={generateProjects}


                    disabled={loading}


                >


                    {
                        loading

                            ?

                            "Creating AI Projects..."

                            :

                            "Generate Projects 🚀"

                    }


                </button>




            </div>









            {

                source &&


                <div className="project-source">


                    {

                        source === "database"

                            ?

                            <>

                                <Database size={18} />

                                Previous Saved Recommendations

                            </>


                            :

                            <>

                                <Bot size={18} />

                                AI Generated Recommendations

                            </>


                    }


                </div>


            }

            {
                projects.length > 0 &&

                <section className="projects-section">

                    <div className="projects-header">

                        <div>
                            <h2>
                                💡 Recommended Projects
                            </h2>

                            <p>
                                AI selected these projects for your career growth
                            </p>
                        </div>


                        <div className="project-count">

                            {projects.length} Projects

                        </div>


                    </div>



                    <div className="projects-grid">


                        {
                            projects.map((project, index) => (


                                <div
                                    className="project-card"
                                    key={index}
                                >


                                    <div className="project-top">


                                        <div>

                                            <h3>
                                                {project.project_name}
                                            </h3>

                                        </div>


                                        <span className="project-badge">

                                            {project.difficulty}

                                        </span>


                                    </div>




                                    <div className="tech-stack">


                                        {
                                            project.skills?.map(
                                                (skill, i) => (

                                                    <span key={i}>
                                                        {skill}
                                                    </span>

                                                )
                                            )
                                        }


                                    </div>




                                    <div className="feature-box">


                                        <h4>
                                            Key Features
                                        </h4>


                                        <ul>

                                            {
                                                project.features?.slice(0, 3).map(
                                                    (feature, i) => (

                                                        <li key={i}>
                                                            {feature}
                                                        </li>

                                                    )
                                                )
                                            }

                                        </ul>


                                    </div>





                                    <div className="project-bottom">


                                        <div className="project-info">


                                            <span>
                                                🚀 Portfolio Project
                                            </span>


                                            <span>
                                                🎯 {project.difficulty}
                                            </span>


                                        </div>


                                        <button className="start-btn">

                                            Build

                                        </button>


                                    </div>



                                </div>


                            ))
                        }


                    </div>


                </section>

            }

        </div>


    );


}