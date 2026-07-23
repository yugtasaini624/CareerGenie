import "./Footer.css";
import Logo from "../../../assets/images/Genie.png";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (

    <footer className="footer">

      <div className="footer-container">

        {/* ABOUT */}

        <div className="footer-about">

          <img
            src={Logo}
            alt="CareerGenie"
            className="footer-logo"
          />

          <p>
            AI-powered career guidance platform helping students build
            skills, discover career paths, and become industry ready.
          </p>

        </div>


        {/* LINKS */}

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="#">Home</a>

          <a href="#features">Features</a>

          <a href="#roadmap">Roadmap</a>

          <a href="#contact">Contact</a>

        </div>


        {/* SERVICES */}

        <div className="footer-links">

          <h3>Services</h3>

          <a href="#">Skill Assessment</a>

          <a href="#">Career Roadmap</a>

          <a href="#">Resume Analysis</a>

          <a href="#">AI Projects</a>

        </div>


        {/* CONTACT */}

        <div className="footer-contact">

          <h3>Connect</h3>

          <p>careerai@gmail.com</p>

          <div className="social-icons">

            <a href="#">
              <FaGithub />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>

            <a href="#">
              <FaEnvelope />
            </a>

          </div>

        </div>

      </div>


      <div className="footer-bottom">

        <p>
          © 2026 CareerGenie. Built with ❤️ by <a href="https://www.linkedin.com/in/yugtasaini624/" className="yugta">Yugta</a> & <a href="https://www.linkedin.com/in/sheetal-kumaridev/">Sheetal</a>.
        </p>

        <button
          className="scroll-btn"
          onClick={scrollTop}
        >
          <FaArrowUp />
        </button>

      </div>

    </footer>

  );

}