import { Fingerprint, Shield, Scan } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface VerificationProcessProps {
  uploadedImage: string | null;
}

export const VerificationProcess = ({ uploadedImage }: VerificationProcessProps) => {
  return (
    <div className="max-w-2xl mx-auto animate-fade-up">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
        {["Upload", "Verify", "Result", "Dashboard"].map((step, index) => (
          <div key={step} className="flex items-center gap-1 md:gap-2">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
              index <= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {index + 1}
            </div>
            <span className={`text-xs md:text-sm hidden sm:block ${index <= 1 ? "text-foreground" : "text-muted-foreground"}`}>
              {step}
            </span>
            {index < 3 && <div className={`w-4 md:w-8 h-0.5 ${index < 1 ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="py-8 md:py-16">
          <div className="text-center space-y-6 md:space-y-8">
            {/* Animated Scanner */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
              {/* Outer rings */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
              <div className="absolute inset-4 rounded-full border-4 border-primary/30 animate-pulse" />
              
              {/* Inner container with fingerprint */}
              <div className="absolute inset-8 md:inset-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                {uploadedImage ? (
                  <img 
                    src={uploadedImage} 
                    alt="Scanning" 
                    className="w-full h-full object-cover opacity-70"
                  />
                ) : (
                  <Fingerprint className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                )}
                
                {/* Scanning line */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-fingerprint-scan" />
                </div>
              </div>

              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-4 md:w-6 h-4 md:h-6 border-l-2 border-t-2 border-primary rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-4 md:w-6 h-4 md:h-6 border-r-2 border-t-2 border-primary rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-4 md:w-6 h-4 md:h-6 border-l-2 border-b-2 border-primary rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-4 md:w-6 h-4 md:h-6 border-r-2 border-b-2 border-primary rounded-br-lg" />
            </div>

            {/* Status text */}
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Verifying Identity</h2>
              <p className="text-sm md:text-base text-muted-foreground">Please wait while we analyze your fingerprint...</p>
            </div>

            {/* Progress indicators */}
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              {[
                { icon: Scan, text: "Scanning fingerprint", done: true },
                { icon: Shield, text: "Matching patterns", done: false },
                { icon: Fingerprint, text: "Verifying identity", done: false },
              ].map((item, index) => (
                <div 
                  key={item.text}
                  className={`flex items-center gap-3 text-sm ${
                    index === 1 ? "text-primary animate-pulse" : index === 0 ? "text-accent" : "text-muted-foreground"
                  }`}
                  style={{ animationDelay: `${index * 1000}ms` }}
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{item.text}</span>
                  {index === 0 && <span className="ml-auto text-accent">✓</span>}
                  {index === 1 && <span className="ml-auto">...</span>}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
