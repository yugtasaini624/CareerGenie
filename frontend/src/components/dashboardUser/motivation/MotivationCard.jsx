import { motion } from "framer-motion";

import {
    FiStar,
    FiZap
} from "react-icons/fi";

import "./MotivationCard.css";

export default function MotivationCard() {

    return (

        <motion.section

            className="cg-motivation-card"

            initial={{
                opacity:0,
                y:40
            }}

            animate={{
                opacity:1,
                y:0
            }}

            transition={{
                duration:.7
            }}

            whileHover={{
                y:-6
            }}

        >

            <div className="cg-motivation-glow"></div>

            <div className="cg-motivation-glow-two"></div>

            <div className="cg-motivation-quotes">

                “

            </div>


            <div className="cg-motivation-header">

                <FiZap />

                <span>

                    Career Inspiration

                </span>

            </div>


            <h2>

                Every expert was once a beginner.

            </h2>


            <p>

                Your dream job won't come from waiting.
                It comes from consistently learning,
                building projects and improving one step at a time.

            </p>


            <div className="cg-motivation-footer">

                <div className="cg-divider"></div>

                <div className="cg-author">

                    <FiStar />

                    <span>

                        Career Genie

                    </span>

                </div>

            </div>

        </motion.section>

    );

}