import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

import {
    CheckCircle,
    Circle,
    ArrowLeft,
    Clock,
    Rocket
} from "lucide-react";

import "./RoadmapDetails.css";

function RoadmapDetails() {

    const { week } = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchWeek();

    }, []);

    const fetchWeek = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await fetch(

                    `https://career-genie-backend-gf7z.onrender.com/api/roadmap/${week}`,

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );

            const result =
                await response.json();

            if (result.success) {

                setData(result.week);

            }

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };



    const updateTask = async (id, completed) => {

        try {

            const token =
                localStorage.getItem("token");

            await fetch(

                `https://career-genie-backend-gf7z.onrender.com/api/roadmap/task/${id}`,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        completed:
                            !completed

                    })

                }

            );

            fetchWeek();

        }

        catch (error) {

            console.log(error);

        }

    };



    const updateProject = async () => {

        try {

            const token =
                localStorage.getItem("token");

            await fetch(

                `https://career-genie-backend-gf7z.onrender.com/api/roadmap/project/${week}`,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        completed:
                            !data.mini_project.completed

                    })

                }

            );

            fetchWeek();

        }

        catch (error) {

            console.log(error);

        }

    };


    if (loading) {

        return (

            <div className="roadmap-details-page">

                <h2>

                    Loading learning plan...

                </h2>

            </div>

        );

    }


    if (!data) {

        return (

            <div className="roadmap-details-page">

                <h2>

                    Week not found

                </h2>

            </div>

        );

    }


    const completedTasks =
        data.tasks.filter(
            task => task.completed
        ).length;

    const progress =
        Math.round(
            (completedTasks / data.tasks.length) * 100
        );


    return (

        <div className="roadmap-details-page">

            {/* Back */}

            <motion.button

                className="roadmap-details-back"

                whileHover={{
                    scale: 1.05
                }}

                onClick={() =>
                    navigate("/roadmap")
                }

            >

                <ArrowLeft size={18} />

                Back to Roadmap

            </motion.button>



            {/* Header */}

            <motion.div

                className="roadmap-details-header"

                initial={{
                    opacity: 0,
                    y: -25
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

            >

                <h1>

                    Week {data.week}

                </h1>

                <p>

                    {data.goal}

                </p>

                <div className="roadmap-details-progress">

                    <motion.div

                        initial={{
                            width: 0
                        }}

                        animate={{
                            width: `${progress}%`
                        }}

                        transition={{
                            duration: 1
                        }}

                    />

                </div>

                <span>

                    {progress}% Completed

                </span>

            </motion.div>



            {/* Project */}

            <motion.div

                className="roadmap-details-project"

                initial={{
                    opacity: 0,
                    y: 30
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

            >

                <Rocket size={35} />

                <div className="roadmap-details-project-content">

                    <h2>

                        Mini Project

                    </h2>

                    <p>

                        {data.mini_project.title}

                    </p>

                    <button

                        className={
                            data.mini_project.completed

                                ?

                                "roadmap-details-project-btn completed"

                                :

                                "roadmap-details-project-btn"
                        }

                        onClick={updateProject}

                    >

                        {

                            data.mini_project.completed

                                ?

                                "Completed ✅"

                                :

                                "Mark Complete"

                        }

                    </button>

                </div>

            </motion.div>



            {/* Tasks */}

            <h2 className="roadmap-details-title">

                Learning Tasks

            </h2>

            <div className="roadmap-details-list">

                {

                    data.tasks.map(

                        (task, index) => (

                            <motion.div

                                key={task.id}

                                className={

                                    task.completed

                                        ?

                                        "roadmap-details-task completed"

                                        :

                                        "roadmap-details-task"

                                }

                                initial={{
                                    opacity: 0,
                                    x: 40
                                }}

                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}

                                transition={{
                                    delay: index * 0.08
                                }}

                            >

                                <button

                                    className="roadmap-details-check"

                                    onClick={() =>
                                        updateTask(
                                            task.id,
                                            task.completed
                                        )
                                    }

                                >

                                    {

                                        task.completed

                                            ?

                                            <CheckCircle />

                                            :

                                            <Circle />

                                    }

                                </button>

                                <div className="roadmap-details-task-info">

                                    <h3>

                                        {task.task}

                                    </h3>

                                    <span>

                                        <Clock size={15} />

                                        {task.hours} Hours

                                    </span>

                                </div>

                            </motion.div>

                        )

                    )

                }

            </div>

        </div>

    );

}

export default RoadmapDetails;
