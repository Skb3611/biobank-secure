import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroductionSection from "@/components/IntroductionSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import WorkflowSection from "@/components/WorkflowSection";
import FeaturesSection from "@/components/FeaturesSection";
import BenefitsSection from "@/components/BenefitsSection";
import FutureScopeSection from "@/components/FutureScopeSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <IntroductionSection />
        <ProblemSection />
        <SolutionSection />
        <WorkflowSection />
        <FeaturesSection />
        <BenefitsSection />
        <FutureScopeSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
