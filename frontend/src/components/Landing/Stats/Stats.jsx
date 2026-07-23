import { motion } from "framer-motion";
import "./Stats.css";

const stats = [
  {
    number: "1200+",
    title: "Students Guided",
  },
  {
    number: "500+",
    title: "Career Roadmaps",
  },
  {
    number: "95%",
    title: "AI Recommendation Accuracy",
  },
  {
    number: "350+",
    title: "Projects Recommended",
  },
];

export default function Stats() {
  return (
    <section id="stats" className="stats-section">

      <motion.div
        className="stats-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        viewport={{ once: true }}
      >
        <span>OUR IMPACT</span>

        <h2>
          Empowering Students With <br />
          AI-Powered Career Guidance
        </h2>

        <p>
          Thousands of learners are using CareerAI to discover career paths,
          improve their skills, and build real-world projects.
        </p>
      </motion.div>

      <div className="stats-grid">

        {stats.map((item, index) => (

          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * .15,
              duration: .6,
            }}
            whileHover={{
              y: -10,
              scale: 1.04,
            }}
          >

            <h1>{item.number}</h1>

            <p>{item.title}</p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}