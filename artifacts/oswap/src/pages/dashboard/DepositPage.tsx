import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DepositPage() {
  const [method, setMethod] = useState<"crypto" | "fiat">("crypto");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText("0x71C...976F");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Address copied to clipboard" });
  };

  const handleFiatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ 
      title: "Deposit Initiated", 
      description: "Your funds will be available in 1-2 business days." 
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Deposit Funds</h1>
        <p className="text-muted-foreground text-sm mt-1">Add balance to spend with your virtual card.</p>
      </div>

      <div className="max-w-2xl">
        <div className="flex bg-secondary p-1 rounded-lg mb-8 w-fit">
          <button 
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${method === 'crypto' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setMethod('crypto')}
          >
            Crypto
          </button>
          <button 
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${method === 'fiat' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setMethod('fiat')}
          >
            Fiat (Bank)
          </button>
        </div>

        {method === 'crypto' ? (
          <div className="bg-card border border-card-border rounded-xl shadow-sm p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-lg font-semibold mb-6">Crypto Deposit</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Select Asset</Label>
                <Select defaultValue="usdc">
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usdc">USDC (ERC-20)</SelectItem>
                    <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                    <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-6 border border-border rounded-xl bg-secondary/20 flex flex-col items-center justify-center gap-4">
                <div className="w-48 h-48 bg-white p-2 rounded-xl flex items-center justify-center">
                  <QrCode className="w-full h-full text-zinc-900" strokeWidth={1} />
                </div>
                <p className="text-sm text-muted-foreground">Scan to deposit USDC on Ethereum network</p>
              </div>

              <div className="space-y-2">
                <Label>Deposit Address</Label>
                <div className="flex gap-2">
                  <Input readOnly value="0x71C...976F" className="font-mono bg-secondary/50" />
                  <Button variant="outline" size="icon" onClick={handleCopy}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-card-border rounded-xl shadow-sm p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-lg font-semibold mb-6">Bank Transfer</h2>
            
            <form onSubmit={handleFiatSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD (ACH/Wire)</SelectItem>
                    <SelectItem value="eur">EUR (SEPA)</SelectItem>
                    <SelectItem value="gbp">GBP (BACS)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input type="number" placeholder="0.00" className="pl-7" required min="10" />
                </div>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fee</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <span className="font-medium">1-2 Business Days</span>
                </div>
              </div>

              <Button type="submit" className="w-full">Initiate Deposit</Button>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
