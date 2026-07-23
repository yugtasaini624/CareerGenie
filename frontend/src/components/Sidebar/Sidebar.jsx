import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  NavLink,
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  LayoutDashboard,
  FileText,
  Bot,
  LogOut,
  FolderKanban,
  ClipboardList,
  Map,
  BriefcaseBusiness
} from "lucide-react";

import Genie from "../../assets/images/Genie.png";

import "./Sidebar.css";

const menuItems = [
  {
    icon: <LayoutDashboard size={20} />,
    title: "Dashboard",
    path: "/dashboard",
  },

  {
    icon: <Bot size={20} />,
    title: "AI Career Assistant",
    path: "/chatbot",
  },

  {
    icon: <Map size={20} />,
    title: "Career Roadmap",
    path: "/roadmap",
  },

  {
    icon: <BriefcaseBusiness size={20} />,
    title: "AI Mock Interview",
    path: "/mock-interview",
  },

  {
    icon: <ClipboardList size={20} />,
    title: "Skill Quiz",
    path: "/quiz",
  },

  {
    icon: <FolderKanban size={20} />,
    title: "Project Recommender",
    path: "/projects",
  },

  {
    icon: <FileText size={20} />,
    title: "Resume Bullet Generator",
    path: "/resume",
  },

  {
    icon: <FileText size={20} />,
    title: "Skill Gap Analysis",
    path: "/skill-gap",
  },
];

export default function Sidebar({

  isOpen,

  onClose

}) {

  const navigate = useNavigate();

  const location = useLocation();

  const sidebarRef = useRef(null);

  // ===========================
  // Close when clicking outside
  // ===========================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (

        sidebarRef.current &&

        !sidebarRef.current.contains(event.target) &&

        isOpen

      ) {

        onClose();

      }

    };

    document.addEventListener(

      "mousedown",

      handleClickOutside

    );

    return () =>

      document.removeEventListener(

        "mousedown",

        handleClickOutside

      );

  }, [isOpen, onClose]);

  // ===========================
  // Career Roadmap
  // ===========================

  const openCareerRoadmap = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(

        "https://career-genie-backend-gf7z.onrender.com/api/roadmap/status",

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      const data = await response.json();

      if (

        data.success &&

        data.hasRoadmap

      ) {

        navigate("/roadmap");

      }

      else {

        navigate("/assessment");

      }

    }

    catch (error) {

      navigate("/assessment");

    }

    onClose();

  };

  // ===========================
  // Logout
  // ===========================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("profileImage");

    onClose();

    navigate("/");

  };

  return (

    <>

      {

        isOpen &&

        <div

          className="sidebar-overlay"

          onClick={onClose}

        />

      }

      <aside

        ref={sidebarRef}

        className={

          isOpen

            ?

            "sidebar sidebar-open"

            :

            "sidebar"

        }

      >

        {/* Logo */}

        <motion.div

          className="logo-card"

          initial={{

            opacity: 0,

            y: -20

          }}

          animate={{

            opacity: 1,

            y: 0

          }}

        >

          <img

            src={Genie}

            alt="CareerGenie"

            className="sidebar-logo"

          />
        </motion.div>

        {/* Menu */}

        <nav className="sidebar-menu">

          {

            menuItems.map((item, index) => (

              <motion.div

                key={index}

                whileHover={{

                  x: 5

                }}

              >

                {

                  item.title === "Career Roadmap"

                    ?

                    <a

                      href="/"

                      onClick={openCareerRoadmap}

                      className={

                        location.pathname.startsWith("/roadmap") ||

                          location.pathname.startsWith("/assessment")

                          ?

                          "menu-item menu-active"

                          :

                          "menu-item"

                      }

                    >

                      <div className="menu-icon">

                        {item.icon}

                      </div>

                      <span>

                        {item.title}

                      </span>

                    </a>

                    :

                    <NavLink

                      to={item.path}

                      end

                      onClick={onClose}

                      className={({ isActive }) =>

                        isActive

                          ?

                          "menu-item menu-active"

                          :

                          "menu-item"

                      }

                    >

                      <div className="menu-icon">

                        {item.icon}

                      </div>

                      <span>

                        {item.title}

                      </span>

                    </NavLink>

                }

              </motion.div>

            ))

          }

        </nav>

        {/* Logout */}

        <motion.button

          className="logout-btn"

          whileHover={{

            scale: 1.03

          }}

          whileTap={{

            scale: 0.97

          }}

          onClick={handleLogout}

        >

          <LogOut size={18} />

          Logout

        </motion.button>

      </aside>

    </>

  );

}
