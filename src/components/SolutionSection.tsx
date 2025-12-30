import { Fingerprint, ShieldCheck, CheckCircle2 } from "lucide-react";

const solutions = [
  "Fingerprint-based login eliminates card dependency",
  "Multi-layer biometric encryption for maximum security",
  "Instant verification with 99.9% accuracy",
  "User-friendly interface for all age groups",
  "Backup OTP system for emergency access"
];

const SolutionSection = () => {
  return (
    <section id="solution" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-96 bg-primary/5 blur-3xl rounded-full" />
      
      <div className="container px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual */}
          <div className="relative flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-blue-500/20 blur-2xl" />
              
              {/* Card */}
              <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-card to-secondary border border-border/50 flex flex-col items-center justify-center gap-4 p-8">
                <div className="relative">
                  <Fingerprint className="w-20 h-20 text-primary" />
                  <ShieldCheck className="absolute -bottom-2 -right-2 w-8 h-8 text-green-500" />
                </div>
                <div className="text-center">
                  <p className="font-display text-lg font-semibold">Biometric</p>
                  <p className="text-primary text-sm">Authentication</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-lg bg-primary/20 animate-float" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-blue-500/20 animate-float animation-delay-300" />
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
              Our <span className="gradient-text">Secure Biometric</span> Solution
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Our Fingerprint Based ATM System revolutionizes banking security by replacing vulnerable card-and-PIN authentication with cutting-edge biometric technology. Your fingerprint becomes your identity—unique, secure, and always with you.
            </p>
            
            <div className="space-y-4 pt-4">
              {solutions.map((solution, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-foreground">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
