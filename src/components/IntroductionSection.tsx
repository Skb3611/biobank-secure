import { Shield, Zap, Lock } from "lucide-react";

const IntroductionSection = () => {
  return (
    <section id="introduction" className="py-24 relative">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            What is <span className="gradient-text">Fingerprint Based ATM</span> System?
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            The Fingerprint Based ATM System is an innovative banking solution that leverages biometric technology to authenticate users. 
            Unlike traditional ATMs that rely on plastic cards and PINs—which can be stolen, cloned, or forgotten—this system uses your unique fingerprint as the key to your account.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">Unique Identity</h3>
              <p className="text-muted-foreground text-sm">
                Fingerprints are unique to each individual, making impersonation virtually impossible.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">Instant Access</h3>
              <p className="text-muted-foreground text-sm">
                No more fumbling with cards or remembering complex PINs—just touch and authenticate.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <Lock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">Enhanced Security</h3>
              <p className="text-muted-foreground text-sm">
                Biometric data cannot be shared, stolen, or duplicated like traditional credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
