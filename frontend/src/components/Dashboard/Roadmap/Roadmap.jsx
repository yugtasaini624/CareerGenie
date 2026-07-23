import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  LoaderCircle,
} from "lucide-react";

import { roadmap } from "../../../data/dashboardData";
import "./Roadmap.css";

export default function Roadmap() {
  return (
    <motion.section
      className="roadmap-card"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="roadmap-header">
        <div>
          <h2>🗺️ Career Roadmap</h2>
          <p>Your personalized learning journey</p>
        </div>

        <div className="roadmap-progress">
          40%
        </div>
      </div>

      <div className="timeline">

        {roadmap.map((step, index) => {

          const current =
            !step.completed &&
            index === roadmap.findIndex(item => !item.completed);

          return (

            <motion.div
              className="timeline-item"
              key={step.id}
              whileHover={{ x: 8 }}
            >

              <div className="timeline-icon">

                {step.completed ? (
                  <CheckCircle2 className="completed" size={24}/>
                ) : current ? (
                  <LoaderCircle
                    className="current"
                    size={24}
                  />
                ) : (
                  <Circle className="pending" size={22}/>
                )}

                {index !== roadmap.length - 1 && (
                  <div className="timeline-line"></div>
                )}

              </div>

              <div className="timeline-content">

                <h3>{step.title}</h3>

                <p>
                  {step.completed
                    ? "Completed"
                    : current
                    ? "In Progress"
                    : "Upcoming"}
                </p>

              </div>

            </motion.div>

          );
        })}

      </div>
    </motion.section>
  );
}