import { Routes, Route, Navigate } from "react-router-dom";


import Landing from "../pages/Landing";
import Auth from "../components/Auth/Auth";

import Dashboard from "../pages/Dashboard";
import SkillAssessment from "../components/Dashboard/Roadmap/SkillAssessment";

import ChatBot from "../pages/ChatBot";

import Quiz from "../components/Dashboard/Quiz/SkillAssessment";

import InterviewChat from "../components/Dashboard/MockInterview/InterviewChat";
import InterviewSetup from "../components/Dashboard/MockInterview/InterviewSetup";
import InterviewReport from "../components/Dashboard/MockInterview/InterviewReport";

import ProjectRecommendations from "../components/Dashboard/RecommendedProjects/ProjectRecommendations";

import ResumeGenerator from "../components/Dashboard/Resume/ResumeGenerator";

import RoadmapDetails from "../components/Dashboard/Roadmap/RoadmapDetails";
import CareerRoadmap from "../components/Dashboard/Roadmap/CarrerRoadmap";


import DashboardLayout from "../layouts/DashboardLayout";

import ResumeAnalyzer from "../components/Dashboard/ResumeAnalyzer/ResumeAnalyzer";
import ResultAnalyzer from "../components/Dashboard/ResumeAnalyzer/ResultAnalyzer";
import NotFound from "../components/error/NotFound";
import DemoPR from "../components/demo/DemoPR";
import Certificate from "../components/certificate/Certificate";

function ProtectedRoute({ children }) {


  const token = localStorage.getItem("token");


  if (!token) {
    return <Navigate to="/auth" replace />;
  }


  return (

    <DashboardLayout>
      {children}
    </DashboardLayout>

  );

}



function AppRouter() {
  return (

    <>
      <Routes>


        {/* PUBLIC */}


        <Route
          path="/"
          element={<Landing />}
        />


        <Route
          path="/auth"
          element={<Auth />}
        />


        <Route path="/demo" element={<DemoPR />} />
        <Route

          path="/login"

          element={
            <Navigate to="/auth?mode=login" />
          }

        />


        <Route

          path="/register"

          element={
            <Navigate to="/auth?mode=register" />
          }

        />
        {/* PRIVATE */}


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
              <SkillAssessment />
            </ProtectedRoute>
          }
        />


        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectRecommendations />
            </ProtectedRoute>
          }
        />


        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <ChatBot />
            </ProtectedRoute>
          }
        />


        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />


        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <ResumeGenerator />
            </ProtectedRoute>
          }
        />



        {/* MOCK INTERVIEW */}


        <Route
          path="/mock-interview"
          element={
            <ProtectedRoute>
              <InterviewSetup />
            </ProtectedRoute>
          }
        />


        <Route
          path="/mock-interview/chat/:sessionId"
          element={
            <ProtectedRoute>
              <InterviewChat />
            </ProtectedRoute>
          }
        />


        <Route
          path="/mock-interview/report/:sessionId"
          element={
            <ProtectedRoute>
              <InterviewReport />
            </ProtectedRoute>
          }
        />




        {/* ROADMAP */}


        <Route
          path="/roadmap"
          element={
            <ProtectedRoute>
              <CareerRoadmap />
            </ProtectedRoute>
          }
        />


        <Route
          path="/roadmap/:week"
          element={
            <ProtectedRoute>
              <RoadmapDetails />
            </ProtectedRoute>
          }
        />


        <Route
          path="/skill-gap"
          element={
            <ProtectedRoute>
              <ResumeAnalyzer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-result"
          element={
            <ProtectedRoute>
              <ResultAnalyzer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificate/:sessionId"
          element={
            <ProtectedRoute>
              <Certificate />
            </ProtectedRoute>}
        />



        {/* FALLBACK */}


        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>


    </>

  );

}


export default AppRouter;
