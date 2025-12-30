import { CreditCard, KeyRound, Brain, AlertTriangle, Clock } from "lucide-react";

const problems = [
  {
    icon: CreditCard,
    title: "Card Theft",
    description: "Physical cards can be stolen, lost, or cloned by criminals using skimming devices."
  },
  {
    icon: KeyRound,
    title: "PIN Skimming",
    description: "Hidden cameras and keypad overlays capture PINs, enabling unauthorized access."
  },
  {
    icon: Brain,
    title: "Forgotten Passwords",
    description: "Users often forget their PINs, leading to account lockouts and inconvenience."
  },
  {
    icon: AlertTriangle,
    title: "Fraud & Security Risks",
    description: "Traditional systems are vulnerable to sophisticated hacking and social engineering."
  },
  {
    icon: Clock,
    title: "Time-Consuming",
    description: "Card insertion, PIN entry, and verification slow down transaction times."
  }
];

const ProblemSection = () => {
  return (
    <section id="problems" className="py-24 relative bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Problems with <span className="gradient-text">Current ATM Systems</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Traditional ATM systems face numerous security challenges that put users at risk
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div 
              key={problem.title}
              className="group relative p-6 rounded-2xl bg-card border border-destructive/20 hover:border-destructive/40 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <problem.icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{problem.title}</h3>
                <p className="text-muted-foreground text-sm">{problem.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-muted-foreground mt-12 max-w-2xl mx-auto">
          These challenges highlight the urgent need for a <span className="text-primary font-medium">more secure, smarter, and reliable</span> ATM solution.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
