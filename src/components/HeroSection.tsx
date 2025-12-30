import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import FingerprintScanner from "./FingerprintScanner";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_hsl(220_40%_15%)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_hsl(190_100%_50%_/_0.05)_0%,_transparent_50%)]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium opacity-0 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Next-Gen Banking Security
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight opacity-0 animate-fade-up animation-delay-100">
              <span className="gradient-text">Fingerprint Based</span>
              <br />
              <span className="text-foreground">ATM System</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 opacity-0 animate-fade-up animation-delay-200">
              A next-generation ATM solution replacing cards and PINs with secure biometric fingerprint authentication for faster and safer banking.
            </p>
            
            <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 opacity-0 animate-fade-up animation-delay-300">
              This smart ATM model enhances security, eliminates card fraud, prevents PIN theft, and ensures a seamless user experience through biometric verification.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-up animation-delay-400">
              <Button variant="hero" size="xl">
                <Play className="w-5 h-5" />
                Start ATM Simulation
              </Button>
              <Button variant="heroOutline" size="xl">
                Learn How It Works
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Fingerprint Scanner Visual */}
          <div className="flex justify-center lg:justify-end opacity-0 animate-fade-up animation-delay-500">
            <FingerprintScanner />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground opacity-0 animate-fade-up animation-delay-600">
        <span className="text-sm">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
