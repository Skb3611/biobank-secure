import { useState } from "react";
import Footer from "@/components/Footer";
import { FingerprintUpload } from "@/components/workflow/FingerprintUpload";
import { VerificationProcess } from "@/components/workflow/VerificationProcess";
import { VerificationResult } from "@/components/workflow/VerificationResult";
import { ATMDashboard } from "@/components/workflow/ATMDashboard";
import { config } from "@/config";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { BankAccount } from "@/data/banks";

export type WorkflowStep = "upload" | "verifying" | "result" | "dashboard";
export type USER = {
  id: string;
  name: string;
  fingerprintId: string;
  accounts: BankAccount[];
  transactions: any;
};

const Workflow = () => {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>("upload");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [user, setUser] = useState<USER>();

  const handleImageUpload = async (imageName: string, imageUrl: string) => {
    setUploadedImage(imageUrl);
    setCurrentStep("verifying");
    const res = await fetch(`${config.apiBaseUrl}/auth/verify-fingerprint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fingerprintId: imageName,
      }),
    });

    const data = await res.json();
    console.log(data, res.status);
      if (res.status == 200) {
        setVerificationSuccess(true);
        setUser(data.user);

        setCurrentStep("result");
      } else {
        setVerificationSuccess(false);
        setCurrentStep("result");
      }
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
      <div className="container mx-auto px-4 pt-4">
        <Button
          variant="ghost"
          onClick={() => window.location.href = '/'}
          className="gap-2"
        >
          <Home className="h-4 w-4" />
          Home
        </Button>
      </div>
      <main className="flex-1">
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
            <ATMDashboard onLogout={handleLogout} user={user} setUser={setUser} />
          )}
        </div>
      </main>

      {currentStep !== "dashboard" && <Footer />}
    </div>
  );
};

export default Workflow;
