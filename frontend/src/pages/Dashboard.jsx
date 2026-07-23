import DashboardLayout from "../layouts/DashboardLayout";
import Hero from "../components/dashboardUser/CareerHero/CareerHero";
import QuickActions from "../components/dashboardUser/quickAction/QuickActions";

import "../styles/dashboard.css";
import CareerSummary from "../components/dashboardUser/careerSummary/CareerSummary";
import CareerStats from "../components/dashboardUser/Stats/CareerStats";

import RoadmapPreview from "../components/dashboardUser/Roadmap/RoadmapPreview";
import RecommendedProject from "../components/dashboardUser/projects/RecommendedProject";
import MotivationCard from "../components/dashboardUser/motivation/MotivationCard";

export default function Dashboard() {
  return (
    <div className="dashboard-page">

      <Hero />

      <section className="dashboard-grid">
        <QuickActions />
        <CareerSummary />
      </section>

      <CareerStats />

      <RecommendedProject />

      <RoadmapPreview />

      <MotivationCard />

    </div>
  );
}