import {
  Play,
  Fingerprint,
  ShieldCheck,
  CreditCard,
  Cog,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Play, label: "Start", color: "from-blue-500 to-cyan-500" },
  { icon: Fingerprint, label: "Scan", color: "from-cyan-500 to-primary" },
  { icon: ShieldCheck, label: "Verify", color: "from-primary to-green-500" },
  { icon: CreditCard, label: "Select", color: "from-green-500 to-emerald-500" },
  { icon: Cog, label: "Process", color: "from-emerald-500 to-teal-500" },
  { icon: CheckCircle2, label: "Success", color: "from-teal-500 to-cyan-500" },
];

const WorkflowSection = () => {
  return (
    <section
      id="workflow"
      className="py-24 relative bg-gradient-to-b from-secondary/20 to-background"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            System <span className="gradient-text">Workflow</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A streamlined process from fingerprint scan to successful
            transaction
          </p>
        </div>

        {/* Workflow steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection line - hidden on mobile */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-primary to-cyan-500 -translate-y-1/2 hidden md:block opacity-30" />

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-2">
            {steps.map((step, index) => (
              <div
                key={step.label}
                className="flex flex-col items-center relative group"
              >
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <step.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                </div>
                <span className="mt-3 font-display text-sm font-medium">
                  {step.label}
                </span>

                {/* Arrow between steps - only on larger screens */}
                {index < steps.length - 1 && (
                  <ArrowRight className="absolute right-0 top-8 translate-x-1/2 w-4 h-4 text-muted-foreground hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
