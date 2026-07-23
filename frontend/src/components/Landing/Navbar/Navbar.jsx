import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Genie from "../../../assets/images/Genie.png";

import "./Navbar.css";

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (

        <>

            <motion.header

                className="hero-navbar"

                initial={{
                    y: -60,
                    opacity: 0
                }}

                animate={{
                    y: 0,
                    opacity: 1
                }}

                transition={{
                    duration: 0.7
                }}

            >

                {/* =========================
                        LOGO
                ========================= */}

                <Link
                    to="/"
                    className="hero-logo-link"
                >

                    <div className="hero-logo-wrapper">

                        <img
                            src={Genie}
                            alt="CareerGenie"
                            className="hero-logo-image"
                        />

                    </div>

                </Link>

                {/* =========================
                    DESKTOP NAVIGATION
                ========================= */}

                <nav>

                    <ul className="hero-nav-links">

                        <li>
                            <a href="/#home">
                                Home
                            </a>
                        </li>

                        <li>
                            <a href="/#features">
                                Features
                            </a>
                        </li>

                        <li>
                            <a href="/#how">
                                How It Works
                            </a>
                        </li>

                        <li>
                            <a href="/#stats">
                                Stats
                            </a>
                        </li>

                        <li>
                            <a href="/#testimonials">
                                Testimonials
                            </a>
                        </li>

                        <li>
                            <a href="/#faq">
                                FAQ
                            </a>
                        </li>

                    </ul>

                </nav>

                {/* =========================
                        DESKTOP BUTTONS
                ========================= */}

                <div className="hero-navbar-buttons">

                    <Link to="/login">

                        <button className="hero-login-btn">

                            Login

                        </button>

                    </Link>

                    <Link to="/register">

                        <button className="hero-signup-btn">

                            Sign Up

                        </button>

                    </Link>

                </div>

                {/* =========================
                        MOBILE MENU BUTTON
                ========================= */}

                <button

                    className="menu-btn"

                    onClick={() => setMenuOpen(true)}

                >

                    <Menu size={30} />

                </button>

            </motion.header>

            {/* =========================
                    MOBILE SIDEBAR
            ========================= */}

            <div

                className={`mobile-sidebar ${menuOpen ? "open" : ""}`}

            >

                <button

                    className="close-btn"

                    onClick={() => setMenuOpen(false)}

                >

                    <X size={28} />

                </button>

                <a

                    href="/#home"

                    onClick={() => setMenuOpen(false)}

                >

                    Home

                </a>

                <a

                    href="/#features"

                    onClick={() => setMenuOpen(false)}

                >

                    Features

                </a>

                <a

                    href="/#how"

                    onClick={() => setMenuOpen(false)}

                >

                    How It Works

                </a>

                <a

                    href="/#stats"

                    onClick={() => setMenuOpen(false)}

                >

                    Stats

                </a>

                <a

                    href="/#testimonials"

                    onClick={() => setMenuOpen(false)}

                >

                    Testimonials

                </a>

                <a

                    href="/#faq"

                    onClick={() => setMenuOpen(false)}

                >

                    FAQ

                </a>

                <Link

                    to="/login"

                    onClick={() => setMenuOpen(false)}

                >

                    Login

                </Link>

                <Link

                    to="/register"

                    onClick={() => setMenuOpen(false)}

                >

                    Sign Up

                </Link>

            </div>

            {/* =========================
                    OVERLAY
            ========================= */}

            <div

                className={`sidebar-overlay ${menuOpen ? "show" : ""}`}

                onClick={() => setMenuOpen(false)}

            />

        </>

    );

}