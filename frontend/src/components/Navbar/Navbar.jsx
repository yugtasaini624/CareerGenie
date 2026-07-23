import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiMenu,
  FiBell,
  FiSettings,
  FiChevronDown
} from "react-icons/fi";

import Genie from "../../assets/images/Genie.png";

import "./Navbar.css";

export default function Navbar({ toggleSidebar }) {

  const [showNotifications, setShowNotifications] = useState(false);

  const user =
  JSON.parse(localStorage.getItem("user")) || {};

const username =
  user.full_name || "User";

const firstLetter =
  username.charAt(0).toUpperCase();

  const notifications = [
    "🚀 Your AI roadmap is ready",
    "📚 Complete today's learning goal",
    "🔥 Keep your learning streak alive"
  ];

  return (

    <motion.header

      className="career-navbar"

      initial={{
        opacity: 0,
        y: -20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: .45
      }}

    >

      {/* ===========================
            LEFT
      =========================== */}

      <div className="career-navbar-left">

        <button

          className="career-menu-btn"

          onClick={toggleSidebar}

        >

          <FiMenu />

        </button>

        <div className="career-logo-wrapper">

          <img

            src={Genie}

            alt="CareerGenie"

            className="career-logo"

          />

        </div>

      </div>

      {/* ===========================
            RIGHT
      =========================== */}

      <div className="career-navbar-right">
            {/* Notification */}

<div className="career-notification">

  <button
    className="career-icon-btn"
    type="button"
  >

    <FiBell />

    <span className="notification-dot"></span>

  </button>

</div>

        {/* Settings */}

        <button className="career-icon-btn">

          <FiSettings />

        </button>

       {/* User */}

<div className="career-user-card">

  <div className="career-avatar">

    {firstLetter}

  </div>

  <div className="career-user-details">

    <h4>

      {username}

    </h4>

    <p>

      Premium Member

    </p>

  </div>

</div>
        

      </div>

    </motion.header>

  );

}