import { Shield, TrendingDown, Clock, Brain, Smile } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Enhanced Banking Security",
    description: "Multi-layer biometric protection makes unauthorized access nearly impossible"
  },
  {
    icon: TrendingDown,
    title: "Reduced Fraud Cases",
    description: "Significant decrease in card cloning, skimming, and identity theft incidents"
  },
  {
    icon: Clock,
    title: "Faster Transactions",
    description: "Quick fingerprint scan reduces average transaction time by up to 40%"
  },
  {
    icon: Brain,
    title: "No Memory Burden",
    description: "Forget about remembering complex PINs or carrying multiple cards"
  },
  {
    icon: Smile,
    title: "Better Experience",
    description: "Seamless, stress-free banking that customers actually enjoy using"
  }
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-24 relative bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Real <span className="gradient-text">Benefits</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the tangible advantages of biometric banking technology
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
