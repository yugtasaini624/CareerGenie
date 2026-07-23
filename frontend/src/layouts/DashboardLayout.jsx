import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import "../styles/dashboardLayout.css";


export default function DashboardLayout({ children }) {


  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (

    <div className="dashboard-layout">


      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />


      <div className="dashboard-main">


        <Navbar
          toggleSidebar={() =>
            setSidebarOpen(prev => !prev)
          }
        />


        <main className="dashboard-content">
          {children}
        </main>


      </div>


    </div>

  );

}