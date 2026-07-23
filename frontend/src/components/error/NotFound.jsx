import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

import genie from "../../assets/images/genie-img.png"; // Rename your image to 404.png

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="notfound">

      {/* Background */}
      <div className="bg-gradient"></div>
      <div className="bg-glow glow1"></div>
      <div className="bg-glow glow2"></div>

      {/* Floating Stars */}
      <div className="stars">
        {Array.from({ length: 80 }).map((_, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          ></span>
        ))}
      </div>

      <div className="notfound-container">

        {/* Left Side */}

        <motion.div
          className="left"

          initial={{
            opacity: 0,
            x: -80,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          transition={{
            duration: 0.8,
          }}
        >

          <motion.h1

            animate={{
              scale: [1, 1.03, 1],
            }}

            transition={{
              repeat: Infinity,
              duration: 3,
            }}

          >
            404
          </motion.h1>

          <motion.h2

            initial={{
              opacity: 0,
              y: 25,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.4,
            }}

          >
            Oops! You're Lost
            <br />
            in the Magical Realm
          </motion.h2>

          <motion.p

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            transition={{
              delay: 0.7,
            }}

          >
            The page you are looking for has vanished into
            thin air. Let's get you back on the right path.
          </motion.p>

          <motion.button

            whileHover={{
              scale: 1.06,
            }}

            whileTap={{
              scale: 0.95,
            }}

            onClick={() => navigate("/")}

          >
            🏠 Back To Home
          </motion.button>

        </motion.div>

        {/* Right Side */}

        <motion.div

          className="right"

          initial={{
            opacity: 0,
            x: 80,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          transition={{
            duration: 1,
          }}

        >

          {/* Floating Question Mark */}

          <motion.div

            className="question"

            animate={{
              y: [0, -15, 0],
            }}

            transition={{
              repeat: Infinity,
              duration: 2,
            }}

          >
            ?
          </motion.div>

          {/* Genie */}

          <motion.img

            src={genie}

            alt="404"

            className="genie"

            animate={{
              y: [0, -18, 0],
            }}

            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}

          />

          {/* Smoke */}

          <div className="smoke smoke1"></div>
          <div className="smoke smoke2"></div>
          <div className="smoke smoke3"></div>

        </motion.div>

      </div>

    </section>
  );
}

export default NotFound;