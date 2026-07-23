import React from "react";
import { motion } from "framer-motion";

function AuthButton({ children, type = "submit", onClick }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className="auth-btn"
      whileHover={{
        scale: 1.015,
        boxShadow:
          "0 0 26px rgba(59,130,246,0.55), 0 0 60px rgba(59,130,246,0.35)",
      }}
      whileTap={{ scale: 0.975 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="auth-btn__label">{children}</span>
      <span className="auth-btn__sheen" />
    </motion.button>
  );
}

export default AuthButton;
