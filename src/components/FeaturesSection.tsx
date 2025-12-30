import { Fingerprint, Zap, CreditCard, ShieldAlert, MonitorSmartphone, KeyRound } from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Biometric Authentication",
    description: "Advanced fingerprint recognition technology ensures only authorized users can access their accounts."
  },
  {
    icon: Zap,
    title: "Fast & Secure Transactions",
    description: "Complete transactions in seconds with military-grade encryption protecting every step."
  },
  {
    icon: CreditCard,
    title: "No ATM Card Required",
    description: "Eliminate the risk of card theft or loss—your fingerprint is your only credential."
  },
  {
    icon: ShieldAlert,
    title: "Fraud Protection",
    description: "Real-time fraud detection and prevention with instant alerts for suspicious activities."
  },
  {
    icon: MonitorSmartphone,
    title: "User-Friendly Interface",
    description: "Intuitive touchscreen interface designed for users of all ages and technical backgrounds."
  },
  {
    icon: KeyRound,
    title: "Backup OTP System",
    description: "Emergency access through secure OTP verification when biometric scanning is unavailable."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Key <span className="gradient-text">Features</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the powerful capabilities that make our system stand out
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-card to-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
