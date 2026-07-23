import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
    FiArrowRight,
    FiFileText,
    FiMap,
    FiCode,
    FiMic,
    FiClipboard,
    FiZap
} from "react-icons/fi";

import "./QuickActions.css";

export default function QuickActions() {

    const navigate = useNavigate();

    const actions = [

        {
            icon: <FiFileText />,
            title: "Resume Analyzer",
            description: "Analyze your resume & discover missing skills.",
            path: "/skill-gap"
        },

        {
            icon: <FiMap />,
            title: "Career Roadmap",
            description: "Continue your personalized learning roadmap.",
            path: "/roadmap"
        },

        {
            icon: <FiCode />,
            title: "Recommended Projects",
            description: "Build projects based on your career goal.",
            path: "/projects"
        },

        {
            icon: <FiMic />,
            title: "Mock Interview",
            description: "Practice AI-powered interview sessions.",
            path: "/mock-interview"
        },

        {
            icon: <FiClipboard />,
            title: "Skill Assessment",
            description: "Evaluate your current technical skills.",
            path: "/assessment"
        }

    ];

    return (

        <motion.section

            className="cg-quick-card"

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

            <div className="cg-quick-glow"></div>

            <div className="cg-quick-header">

                <div className="cg-quick-logo">

                    <FiZap />

                </div>

                <div>

                    <h2>

                        Quick Actions

                    </h2>

                    <p>

                        Jump directly to your career tools.

                    </p>

                </div>

            </div>

            <div className="cg-quick-list">

                {

                    actions.map(

                        (item,index)=>(

                            <motion.div

                                key={index}

                                className="cg-quick-item"

                                whileHover={{
                                    x:8
                                }}

                                whileTap={{
                                    scale:.98
                                }}

                                onClick={()=>

                                    navigate(item.path)

                                }

                            >

                                <div className="cg-quick-icon">

                                    {item.icon}

                                </div>

                                <div className="cg-quick-content">

                                    <h3>

                                        {item.title}

                                    </h3>

                                    <p>

                                        {item.description}

                                    </p>

                                </div>

                                <FiArrowRight className="cg-quick-arrow"/>

                            </motion.div>

                        )

                    )

                }

            </div>

            <motion.button

                whileHover={{
                    scale:1.02
                }}

                whileTap={{
                    scale:.97
                }}

                className="cg-quick-btn"

                onClick={()=>

                    navigate("/dashboard")

                }

            >

                Open Career Dashboard

                <FiArrowRight />

            </motion.button>

        </motion.section>

    );

}