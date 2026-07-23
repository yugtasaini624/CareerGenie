import { motion } from "framer-motion";
import {
  Brain,
  FileText,
  Map,
  Lightbulb,
  BarChart3,
  Bot,
} from "lucide-react";

import "./Features.css";

const features = [
  {
    icon: <Brain size={42} />,
    title: "AI Skill Assessment",
    desc: "Answer a few smart questions and let AI understand your current skills and career goals."
  },
  {
    icon: <FileText size={42} />,
    title: "Resume Analyzer",
    desc: "Upload your resume and receive ATS score, missing skills and improvement suggestions."
  },
  {
    icon: <Map size={42} />,
    title: "Personalized Roadmap",
    desc: "Receive a customized learning roadmap according to your dream career."
  },
  {
    icon: <Lightbulb size={42} />,
    title: "Project Recommendations",
    desc: "Build practical projects that strengthen your portfolio and improve placements."
  },
  {
    icon: <BarChart3 size={42} />,
    title: "Progress Tracking",
    desc: "Visual dashboards help you monitor your learning journey and stay motivated."
  },
  {
    icon: <Bot size={42} />,
    title: "AI Career Assistant",
    desc: "Get instant career guidance, learning advice and interview preparation from AI."
  }
];

export default function Features() {
  return (
    <section id="features" className="features-section">

      <motion.div
        className="features-heading"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span>WHY CAREER AI?</span>

        <h2>
          Everything You Need To Build
          <br />
          Your Dream Career
        </h2>

        <p>
          CareerAI combines Artificial Intelligence with career guidance
          to help students learn smarter, build better projects,
          and achieve their dream jobs.
        </p>
      </motion.div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.12,
              duration: 0.6
            }}
            whileHover={{
              y: -12,
              scale: 1.03
            }}
          >
            <motion.div
              className="feature-icon"
              whileHover={{
                rotate: 360,
                scale: 1.15
              }}
              transition={{
                duration: 0.7
              }}
            >
              {feature.icon}
            </motion.div>

            <h3>{feature.title}</h3>

            <p>{feature.desc}</p>

          </motion.div>
        ))}
      </div>

    </section>
  );
}