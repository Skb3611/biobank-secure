import { Bot, ScanFace, Blocks, Cloud } from "lucide-react";

const futureFeatures = [
  {
    icon: Bot,
    title: "AI-Based Fraud Detection",
    description: "Machine learning algorithms that detect and prevent fraudulent patterns in real-time",
    status: "In Research"
  },
  {
    icon: ScanFace,
    title: "Multi-Biometric Auth",
    description: "Combined face + fingerprint recognition for enhanced security layers",
    status: "Planned"
  },
  {
    icon: Blocks,
    title: "Blockchain Security",
    description: "Decentralized transaction verification for tamper-proof banking records",
    status: "Exploring"
  },
  {
    icon: Cloud,
    title: "Cloud Integration",
    description: "Seamless cloud banking connectivity for real-time sync across all channels",
    status: "Upcoming"
  }
];

const FutureScopeSection = () => {
  return (
    <section id="future" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute right-0 top-1/4 w-1/3 h-96 bg-primary/5 blur-3xl rounded-full" />
      <div className="absolute left-0 bottom-1/4 w-1/4 h-64 bg-blue-500/5 blur-3xl rounded-full" />
      
      <div className="container px-4 md:px-6 relative">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Future <span className="gradient-text">Scope</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Exploring cutting-edge technologies to further revolutionize banking security
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {futureFeatures.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative p-6 rounded-2xl border border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {feature.status}
                </span>
              </div>
              
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureScopeSection;
