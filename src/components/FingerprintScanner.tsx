import { Fingerprint } from "lucide-react";

const FingerprintScanner = () => {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-glow" />
      
      {/* Middle ring */}
      <div className="absolute inset-4 rounded-full border border-primary/20" />
      
      {/* Inner circle with fingerprint */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-secondary to-card flex items-center justify-center overflow-hidden">
        {/* Scanning line */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-fingerprint-scan" />
        </div>
        
        {/* Fingerprint icon */}
        <Fingerprint className="w-20 h-20 md:w-28 md:h-28 text-primary animate-float" />
      </div>
      
      {/* Decorative dots */}
      <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1 rounded-full bg-primary" />
      <div className="absolute bottom-0 left-1/2 w-2 h-2 -translate-x-1/2 translate-y-1 rounded-full bg-primary" />
      <div className="absolute left-0 top-1/2 w-2 h-2 -translate-y-1/2 -translate-x-1 rounded-full bg-primary" />
      <div className="absolute right-0 top-1/2 w-2 h-2 -translate-y-1/2 translate-x-1 rounded-full bg-primary" />
    </div>
  );
};

export default FingerprintScanner;
