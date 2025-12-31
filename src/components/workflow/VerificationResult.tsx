import { CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface VerificationResultProps {
  success: boolean;
  onContinue: () => void;
}

export const VerificationResult = ({ success, onContinue }: VerificationResultProps) => {
  return (
    <div className="max-w-2xl mx-auto animate-fade-up">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
        {["Upload", "Verify", "Result", "Dashboard"].map((step, index) => (
          <div key={step} className="flex items-center gap-1 md:gap-2">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
              index <= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {index + 1}
            </div>
            <span className={`text-xs md:text-sm hidden sm:block ${index <= 2 ? "text-foreground" : "text-muted-foreground"}`}>
              {step}
            </span>
            {index < 3 && <div className={`w-4 md:w-8 h-0.5 ${index < 2 ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="py-8 md:py-16">
          <div className="text-center space-y-6 md:space-y-8">
            {/* Result Icon */}
            <div className={`relative w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full flex items-center justify-center ${
              success 
                ? "bg-accent/20" 
                : "bg-destructive/20"
            }`}>
              {success ? (
                <>
                  <div className="absolute inset-0 rounded-full bg-accent/10 animate-ping" />
                  <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-accent" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 rounded-full bg-destructive/10 animate-pulse" />
                  <XCircle className="w-12 h-12 md:w-16 md:h-16 text-destructive" />
                </>
              )}
            </div>

            {/* Result Text */}
            <div className="space-y-2">
              <h2 className={`text-2xl md:text-3xl font-bold ${success ? "text-accent" : "text-destructive"}`}>
                {success ? "Verification Successful!" : "Verification Failed"}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
                {success 
                  ? "Your fingerprint has been verified successfully. You can now access the ATM dashboard."
                  : "We couldn't verify your fingerprint. Please try again with a clearer image."
                }
              </p>
            </div>

            {/* Action Button */}
            <Button 
              variant={success ? "hero" : "outline"} 
              size="lg"
              onClick={onContinue}
              className="gap-2"
            >
              {success ? (
                <>
                  Access Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </>
              )}
            </Button>

            {/* Additional Info */}
            {success && (
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  Session will expire in 5 minutes of inactivity
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
