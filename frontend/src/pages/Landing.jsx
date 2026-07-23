import Navbar from "../components/Landing/Navbar/Navbar";
import Hero from "../components/Landing/Hero/Hero";
import Trusted from "../components/Landing/Trusted/Trusted";
import Features from "../components/Landing/Features/Features";
import HowItWorks from "../components/Landing/HowItWorks/HowItWorks";
import Testimonials from "../components/Landing/Testimonials/Testimonials";
import Stats from "../components/Landing/Stats/Stats";
import FAQ from "../components/Landing/FAQ/FAQ";
import CTA from "../components/Landing/CTA/CTA";
import Footer from "../components/Landing/Footer/Footer";

export default function Landing() {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <Trusted />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Stats />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}