import { motion } from "framer-motion";
import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Sign up and access your personalized AI career dashboard."
  },
  {
    number: "02",
    title: "Complete Skill Assessment",
    description:
      "Answer smart questions about your skills, interests and career goals."
  },
  {
    number: "03",
    title: "AI Analyzes Your Profile",
    description:
      "Our AI identifies your strengths, weaknesses and learning path."
  },
  {
    number: "04",
    title: "Receive Career Roadmap",
    description:
      "Get a customized roadmap with technologies, courses and milestones."
  },
  {
    number: "05",
    title: "Build Projects & Grow",
    description:
      "Complete AI-recommended projects and track your career progress."
  }
];

export default function HowItWorks() {
  return (
    <section id="how" className="how-section"> 

      <div className="how-heading">
        <span>HOW IT WORKS</span>
        <h2>Your AI Career Journey</h2>
        <p>
          Five simple steps to discover, learn and build your dream career.
        </p>
      </div>

      <div className="timeline">

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="timeline-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="step-circle">
              {step.number}
            </div>

            <div className="step-card">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </motion.div>
        ))}

      </div>

    </section>
  );
}