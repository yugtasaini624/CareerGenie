import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./CTA.css";

export default function CTA() {

  return (

    <section className="cta-section">

      <motion.div
        className="cta-card"
        initial={{ opacity:0, scale:.9 }}
        whileInView={{ opacity:1, scale:1 }}
        viewport={{ once:true }}
        transition={{ duration:.6 }}
      >

        <motion.div
          className="floating-circle circle1"
          animate={{
            y:[0,-20,0],
            x:[0,10,0]
          }}
          transition={{
            repeat:Infinity,
            duration:5
          }}
        />

        <motion.div
          className="floating-circle circle2"
          animate={{
            y:[0,25,0],
            x:[0,-15,0]
          }}
          transition={{
            repeat:Infinity,
            duration:7
          }}
        />

        <h2>

          Ready To Build Your Dream Career?

        </h2>

        <p>

          Let AI guide your learning journey with personalized roadmaps,
          projects and career recommendations.

        </p>

        <div className="cta-buttons">

          <Link to="/auth">

            <motion.button
              whileHover={{
                scale:1.05
              }}
              whileTap={{
                scale:.95
              }}
              className="primary-btn"
            >

              Get Started

              <ArrowRight size={18}/>

            </motion.button>

          </Link>

          <Link to="/auth">

            <motion.button
              whileHover={{
                scale:1.05
              }}
              whileTap={{
                scale:.95
              }}
              className="secondary-btn"
            >

              Login

            </motion.button>

          </Link>

        </div>

      </motion.div>

    </section>

  );

}