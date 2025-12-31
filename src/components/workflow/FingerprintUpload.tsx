import { useState, useRef } from "react";
import { Upload, Fingerprint, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FingerprintUploadProps {
  onUpload: (imageUrl: string) => void;
}

export const FingerprintUpload = ({ onUpload }: FingerprintUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (preview) {
      onUpload(preview);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-up">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
        {["Upload", "Verify", "Result", "Dashboard"].map((step, index) => (
          <div key={step} className="flex items-center gap-1 md:gap-2">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
              index === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {index + 1}
            </div>
            <span className={`text-xs md:text-sm hidden sm:block ${index === 0 ? "text-foreground" : "text-muted-foreground"}`}>
              {step}
            </span>
            {index < 3 && <div className="w-4 md:w-8 h-0.5 bg-muted" />}
          </div>
        ))}
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Fingerprint className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          <CardTitle className="text-xl md:text-2xl">Upload Your Fingerprint</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Upload a fingerprint image to authenticate and access the ATM dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`relative border-2 border-dashed rounded-xl p-6 md:p-12 text-center transition-all ${
              dragActive 
                ? "border-primary bg-primary/5" 
                : preview 
                  ? "border-accent bg-accent/5" 
                  : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />

            {preview ? (
              <div className="space-y-4">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-lg overflow-hidden border border-border">
                  <img src={preview} alt="Fingerprint preview" className="w-full h-full object-cover" />
                </div>
                <p className="text-sm text-muted-foreground">Fingerprint image ready</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setPreview(null);
                      if (inputRef.current) inputRef.current.value = "";
                    }}
                  >
                    Choose Different
                  </Button>
                  <Button variant="hero" onClick={handleSubmit}>
                    Verify Fingerprint
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <Upload className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-foreground font-medium mb-1 text-sm md:text-base">
                    Drop your fingerprint image here
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    or click to browse from your device
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => inputRef.current?.click()}
                  className="gap-2"
                >
                  <Image className="w-4 h-4" />
                  Select Image
                </Button>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Supported formats: JPG, PNG, BMP • Max size: 5MB
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
