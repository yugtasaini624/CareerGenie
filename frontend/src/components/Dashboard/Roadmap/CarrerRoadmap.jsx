import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    CheckCircle,
    Trophy,
    Rocket,
    ArrowRight
} from "lucide-react";

import "./CareerRoadmap.css";

function CareerRoadmap() {

    const [roadmap, setRoadmap] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        loadRoadmap();
    }, []);

    const loadRoadmap = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "https://career-genie-backend-gf7z.onrender.com/api/roadmap/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setRoadmap(data.roadmap);
            }

        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }

    };


    if (loading) {

        return (

            <div className="career-roadmap-page">

                <h2>Loading your AI roadmap...</h2>

            </div>

        );

    }


    const totalTasks = roadmap.reduce(
        (sum, week) => sum + week.tasks.length,
        0
    );

    const completedTasks = roadmap.reduce(
        (sum, week) =>
            sum +
            week.tasks.filter(task => task.completed).length,
        0
    );

    const overallProgress =
        totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);


    return (

        <div className="career-roadmap-page">

            {/* Header */}

            <motion.div
                className="career-roadmap-header"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
            >

                <h1>Your AI Career Roadmap 🚀</h1>

                <p>
                    Master your dream career one week at a time.
                </p>

                <div className="career-roadmap-progress-card">

                    <h3>Overall Progress</h3>

                    <div className="career-roadmap-progress">

                        <motion.div

                            initial={{ width: 0 }}

                            animate={{
                                width: `${overallProgress}%`
                            }}

                            transition={{
                                duration: 1
                            }}

                        />

                    </div>

                    <span>

                        {completedTasks} / {totalTasks} Tasks Completed

                    </span>

                    <strong>

                        {overallProgress}% Complete

                    </strong>

                </div>

            </motion.div>


            {/* Completion */}

            {

                overallProgress === 100 && (

                    <motion.div

                        className="career-roadmap-complete"

                        initial={{
                            scale: 0.7,
                            opacity: 0
                        }}

                        animate={{
                            scale: 1,
                            opacity: 1
                        }}

                    >

                        <Trophy size={60} />

                        <h2>
                            Congratulations!
                        </h2>

                        <p>

                            You successfully completed your roadmap 🎉

                        </p>

                        <button

                            onClick={() =>
                                navigate("/assessment")
                            }

                        >

                            Learn New Technology

                            <ArrowRight size={18} />

                        </button>

                    </motion.div>

                )

            }


            {/* Timeline */}

            <div className="career-roadmap-timeline">

                {

                    roadmap.map((week) => {

                        const completed =
                            week.tasks.filter(
                                t => t.completed
                            ).length;

                        const progress =
                            Math.round(
                                (completed / week.tasks.length) * 100
                            );

                        return (

                            <motion.div

                                key={week.week}

                                className="career-roadmap-card"

                                whileHover={{
                                    y: -8,
                                    scale: 1.02
                                }}

                                onClick={() =>
                                    navigate(
                                        `/roadmap/${week.week}`
                                    )
                                }

                            >

                                <div className="career-roadmap-week-circle">

                                    {week.week}

                                </div>

                                <div className="career-roadmap-content">

                                    <h2>

                                        Week {week.week}

                                    </h2>

                                    <p>

                                        {week.goal}

                                    </p>

                                    <div className="career-roadmap-week-progress">

                                        <motion.div

                                            initial={{ width: 0 }}

                                            animate={{
                                                width: `${progress}%`
                                            }}

                                            transition={{
                                                duration: 1
                                            }}

                                        />

                                    </div>

                                    <small>

                                        {progress}% Completed

                                    </small>

                                    <div className="career-roadmap-project">

                                        <Rocket size={18} />

                                        <span>

                                            {

                                                typeof week.mini_project === "object"

                                                    ? week.mini_project.title

                                                    : week.mini_project

                                            }

                                        </span>

                                    </div>

                                    <div className="career-roadmap-task-count">

                                        <CheckCircle size={18} />

                                        {completed} / {week.tasks.length} Tasks Completed

                                    </div>

                                    <button>

                                        View Learning Plan →

                                    </button>

                                </div>

                            </motion.div>

                        );

                    })

                }

            </div>

        </div>

    );

}

export default CareerRoadmap;
