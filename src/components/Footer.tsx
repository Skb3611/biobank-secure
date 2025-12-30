import { Fingerprint } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50 bg-card/50">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Fingerprint className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display text-xl font-bold">BiometricATM</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              A next-generation ATM solution leveraging biometric fingerprint authentication for secure and convenient banking.
            </p>
          </div>
          
          {/* Project Info */}
          <div>
            <h4 className="font-display font-semibold mb-4">Project Details</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>Academic Project</li>
              <li>Computer Science Department</li>
              <li>Final Year Project 2024-25</li>
            </ul>
          </div>
          
          {/* Team */}
          <div>
            <h4 className="font-display font-semibold mb-4">Team & Guide</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><span className="text-foreground">Guide:</span> Prof. [Mentor Name]</li>
              <li><span className="text-foreground">Team:</span> [Team Members]</li>
              <li><span className="text-foreground">College:</span> [College Name]</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024-25 Fingerprint Based ATM System. Academic Project.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#introduction" className="hover:text-primary transition-colors">About</a>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#workflow" className="hover:text-primary transition-colors">Workflow</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
