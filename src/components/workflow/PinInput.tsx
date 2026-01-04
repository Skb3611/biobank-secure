import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PinInputProps {
  onSubmit: (pin: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string;
}

export const PinInput = ({ onSubmit, onCancel, isLoading, error }: PinInputProps) => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 4) {
      onSubmit(pin);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-primary mb-4">
        <Lock className="w-5 h-5" />
        <span className="font-medium">Enter 4-digit PIN</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type={showPin ? "text" : "password"}
            value={pin}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 4);
              setPin(value);
            }}
            placeholder="••••"
            className="text-center text-2xl tracking-[1em] pr-12"
            maxLength={4}
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}


        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="hero"
            className="flex-1"
            disabled={pin.length !== 4 || isLoading}
          >
            {isLoading ? "Verifying..." : "Confirm"}
          </Button>
        </div>
      </form>
    </div>
  );
};
