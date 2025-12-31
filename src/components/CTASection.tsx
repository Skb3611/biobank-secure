import { Play, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-blue-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(190_100%_50%_/_0.1)_0%,_transparent_70%)]" />

      <div className="container px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Ready to Experience
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Experience the{" "}
            <span className="gradient-text">Future of Banking</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Step into a new era of secure, convenient, and intelligent banking
            with our Fingerprint Based ATM System.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/workflow">
              <Button variant="hero" size="xl">
                <Play className="w-5 h-5" />
                Start ATM Simulation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
