import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FingerprintUpload } from "@/components/workflow/FingerprintUpload";
import { VerificationProcess } from "@/components/workflow/VerificationProcess";
import { VerificationResult } from "@/components/workflow/VerificationResult";
import { ATMDashboard } from "@/components/workflow/ATMDashboard";

export type WorkflowStep = "upload" | "verifying" | "result" | "dashboard";

const Workflow = () => {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>("upload");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setCurrentStep("verifying");
    
    // Simulate verification process
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      setVerificationSuccess(success);
      setCurrentStep("result");
    }, 3000);
  };

  const handleContinue = () => {
    if (verificationSuccess) {
      setCurrentStep("dashboard");
    } else {
      setCurrentStep("upload");
      setUploadedImage(null);
    }
  };

  const handleLogout = () => {
    setCurrentStep("upload");
    setUploadedImage(null);
    setVerificationSuccess(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8 md:py-16">
          {currentStep === "upload" && (
            <FingerprintUpload onUpload={handleImageUpload} />
          )}
          
          {currentStep === "verifying" && (
            <VerificationProcess uploadedImage={uploadedImage} />
          )}
          
          {currentStep === "result" && (
            <VerificationResult 
              success={verificationSuccess} 
              onContinue={handleContinue} 
            />
          )}
          
          {currentStep === "dashboard" && (
            <ATMDashboard onLogout={handleLogout} />
          )}
        </div>
      </main>

      {currentStep !== "dashboard" && <Footer />}
    </div>
  );
};

export default Workflow;
