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
    // <div className="min-h-screen bg-background">
    //   <Navbar />
    //   <main>
    //     <HeroSection />
    //     <IntroductionSection />
    //     <ProblemSection />
    //     <SolutionSection />
    //     <WorkflowSection />
    //     <FeaturesSection />
    //     <BenefitsSection />
    //     <FutureScopeSection />
    //     <CTASection />
    //   </main>
    //   <Footer />
    // </div>
    <>
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-12 text-center shadow-2xl max-w-md">
        <div className="text-6xl mb-6">🔒</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Pending</h1>
        <p className="text-gray-600 text-sm">Complete your payment to unlock your project home page</p>
      </div>
    </div>
    </>
  );
};

export default Index;
