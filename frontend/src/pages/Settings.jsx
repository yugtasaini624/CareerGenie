import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Moon,
  Bell,
  Globe,
  Shield,
  Info,
  LogOut,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import "./Settings.css";

export default function Settings() {

  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <DashboardLayout>

      <div className="settings-page">

        <motion.div
          className="settings-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>⚙️ Settings</h1>
          <p>Manage your CareerAI account preferences.</p>
        </motion.div>

        <div className="settings-grid">

          {/* Profile */}

          <motion.div
            whileHover={{ y: -5 }}
            className="setting-card"
          >
            <div className="setting-left">
              <User />
              <div>
                <h3>Profile</h3>
                <p>Edit your profile information</p>
              </div>
            </div>

            <button>Edit</button>
          </motion.div>

          {/* Dark Mode */}

          <motion.div
            whileHover={{ y: -5 }}
            className="setting-card"
          >
            <div className="setting-left">
              <Moon />
              <div>
                <h3>Dark Mode</h3>
                <p>Enable dark appearance</p>
              </div>
            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />

              <span className="slider"></span>

            </label>
          </motion.div>

          {/* Notifications */}

          <motion.div
            whileHover={{ y: -5 }}
            className="setting-card"
          >
            <div className="setting-left">
              <Bell />
              <div>
                <h3>Notifications</h3>
                <p>Email & dashboard alerts</p>
              </div>
            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={notifications}
                onChange={() =>
                  setNotifications(!notifications)
                }
              />

              <span className="slider"></span>

            </label>
          </motion.div>

          {/* Language */}

          <motion.div
            whileHover={{ y: -5 }}
            className="setting-card"
          >
            <div className="setting-left">
              <Globe />
              <div>
                <h3>Language</h3>
                <p>English</p>
              </div>
            </div>

            <button>Change</button>
          </motion.div>

          {/* Privacy */}

          <motion.div
            whileHover={{ y: -5 }}
            className="setting-card"
          >
            <div className="setting-left">
              <Shield />
              <div>
                <h3>Privacy</h3>
                <p>Manage account privacy</p>
              </div>
            </div>

            <button>Manage</button>
          </motion.div>

          {/* About */}

          <motion.div
            whileHover={{ y: -5 }}
            className="setting-card"
          >
            <div className="setting-left">
              <Info />
              <div>
                <h3>About CareerAI</h3>
                <p>Version 1.0</p>
              </div>
            </div>

            <button>View</button>
          </motion.div>

        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: .97 }}
          className="logout-button"
        >
          <LogOut size={18}/>
          Logout
        </motion.button>

      </div>

    </DashboardLayout>
  );
}