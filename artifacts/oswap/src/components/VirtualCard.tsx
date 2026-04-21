import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function VirtualCard({ name = "ALEX BECKER" }: { name?: string }) {
  const [revealed, setRevealed] = useState(false);
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      duration: 2000,
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-sm w-full">
      <div className="relative aspect-[1.586/1] w-full rounded-xl overflow-hidden bg-zinc-950 text-white p-6 flex flex-col justify-between shadow-lg border border-zinc-800">
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        
        <div className="flex justify-between items-start z-10">
          <div className="font-bold text-lg tracking-wider">OSWAP</div>
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.8"/>
            <circle cx="28" cy="12" r="12" fill="white" fillOpacity="0.4"/>
          </svg>
        </div>

        <div className="z-10 space-y-4">
          <div className="font-mono text-xl tracking-[0.2em] flex items-center justify-between group cursor-pointer" onClick={() => handleCopy(revealed ? "5412 7512 3412 4242" : "5412751234124242")}>
            {revealed ? "5412 7512 3412 4242" : "•••• •••• •••• 4242"}
          </div>
          
          <div className="flex items-end justify-between text-xs font-mono uppercase tracking-wider text-zinc-400">
            <div>
              <div className="text-[10px] mb-1">Cardholder</div>
              <div className="text-white">{name}</div>
            </div>
            <div className="flex gap-4 text-right">
              <div>
                <div className="text-[10px] mb-1">Valid Thru</div>
                <div className="text-white">{revealed ? "12/28" : "••/••"}</div>
              </div>
              <div>
                <div className="text-[10px] mb-1">CVC</div>
                <div className="text-white">{revealed ? "123" : "•••"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={() => setRevealed(!revealed)}>
          {revealed ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {revealed ? "Hide Details" : "Reveal Card"}
        </Button>
        <Button variant="outline" size="icon" onClick={() => handleCopy("5412 7512 3412 4242")} disabled={!revealed}>
          <Copy className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
