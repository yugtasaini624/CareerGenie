import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const AuthOverlay = ({ isLogin }) => {

  const toSignUpKeyframes = [
    "polygon(15% 0%,100% 0%,100% 100%,0% 100%)",
    "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
    "polygon(0% 0%,100% 0%,85% 100%,0% 100%)"
  ];

  const toLoginKeyframes = [
    "polygon(0% 0%,100% 0%,85% 100%,0% 100%)",
    "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
    "polygon(15% 0%,100% 0%,100% 100%,0% 100%)"
  ];

  return (

    <motion.div
      className="video-moving-banner"
      animate={{
        left: isLogin ? "50%" : "0%",
        clipPath: isLogin
          ? toLoginKeyframes
          : toSignUpKeyframes
      }}
      transition={{
        duration: 0.25,
        ease: "easeInOut"
      }}
    >

      <div className="video-banner-overlay-color">

        <AnimatePresence mode="wait">

          {
            isLogin ? (

              <motion.div
                key="login"
                className="video-banner-text align-right-padding"
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -20
                }}
                transition={{
                  duration: 0.25
                }}
              >

                <h1>
                  Unlock Your Career Potential 🚀
                </h1>

                <p>
                  Continue building your future with personalized roadmaps,
                  AI career coaching, and hands-on projects.
                </p>

              </motion.div>

            ) : (

              <motion.div
                key="signup"
                className="video-banner-text align-left-padding"
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -20
                }}
                transition={{
                  duration: 0.25
                }}
              >

                <h1>
                  Join CareerAI 🚀
                </h1>

                <p>
                  Discover your skills, build personalized roadmaps and prepare
                  for interviews with AI.
                </p>

              </motion.div>

            )
          }

        </AnimatePresence>

      </div>

    </motion.div>

  );

};

export default AuthOverlay;