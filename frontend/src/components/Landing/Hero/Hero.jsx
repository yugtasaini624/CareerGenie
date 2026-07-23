import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero.css";
import HeroImage from "../../../assets/images/Programming-pana.png";

export default function Hero() {
  return (
    <section className="hero" id="home">

      {/* LEFT SIDE */}

      <motion.div
        className="hero-left"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="hero-tag">
          🚀 AI Powered Career Platform
        </span>

        <h1>
          Shape Your
          <span> Dream Career </span>
          With AI
        </h1>

        <p>
          Analyze your skills, discover personalized career paths,
          generate industry-ready roadmaps, and build real-world
          projects—all powered by Artificial Intelligence.
        </p>

        <div className="hero-buttons">
          <Link to="/login">
            <button className="primary-btn">
              Get Started →
            </button>
          </Link>

          <Link to="/demo">
          <button className="secondary-btn">
            Watch Demo
          </button>
          </Link>
        </div>

        <div className="hero-stats">

          <div>
            <h2>1200+</h2>
            <p>Students</p>
          </div>

          <div>
            <h2>95%</h2>
            <p>Accuracy</p>
          </div>

          <div>
            <h2>500+</h2>
            <p>Roadmaps</p>
          </div>

        </div>

      </motion.div>

      {/* RIGHT SIDE */}

      <motion.div
        className="hero-right"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={HeroImage}
          alt="Programming Illustration"
          className="hero-image"
        />
      </motion.div>

    </section>
  );
}