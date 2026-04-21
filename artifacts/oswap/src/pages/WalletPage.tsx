import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  QrCode,
  Copy,
  Wallet as WalletIcon,
  Check,
} from "lucide-react";

const WALLET_ADDRESS = "0x9fA2e5C8B7D1cA6f4E0BdA37e5C8b1aC9F2dE4b0";

const CRYPTO_BALANCES = [
  { symbol: "BTC", name: "Bitcoin", amount: 0.0421, usd: 2850.32 },
  { symbol: "ETH", name: "Ethereum", amount: 1.5023, usd: 4710.0 },
  { symbol: "SOL", name: "Solana", amount: 28.4, usd: 4262.4 },
  { symbol: "USDT", name: "Tether", amount: 1240.5, usd: 1240.5 },
];

const FIAT_BALANCE = { currency: "USD", amount: 5050.0 };

const WALLET_TRANSACTIONS = [
  { id: "w1", date: "Oct 24", type: "Receive", asset: "USDC", amount: 1500.0, status: "Completed" },
  { id: "w2", date: "Oct 22", type: "Send", asset: "ETH", amount: -0.25, status: "Completed" },
  { id: "w3", date: "Oct 19", type: "Receive", asset: "BTC", amount: 0.012, status: "Completed" },
  { id: "w4", date: "Oct 14", type: "Send", asset: "SOL", amount: -4.2, status: "Pending" },
  { id: "w5", date: "Oct 10", type: "Receive", asset: "USDT", amount: 600.0, status: "Completed" },
];

const totalUsd =
  FIAT_BALANCE.amount + CRYPTO_BALANCES.reduce((sum, c) => sum + c.usd, 0);

export default function WalletPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS);
    setCopied(true);
    toast({ title: "Address copied", description: "Wallet address copied to clipboard." });
    setTimeout(() => setCopied(false), 1500);
  };

  const handleConnect = (provider: string) => {
    toast({
      title: `${provider} not connected`,
      description: "Wallet integration is in preview mode.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex items-center justify-between flex-wrap gap-6"
        >
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-widest">Wallet</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">
              Your assets, in one place
            </h1>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-md"
              onClick={() => handleConnect("MetaMask")}
            >
              Connect MetaMask
            </Button>
            <Button
              variant="outline"
              className="rounded-md"
              onClick={() => handleConnect("Phantom")}
            >
              Connect Phantom
            </Button>
          </div>
        </motion.div>

        {/* Overview */}
        <Card className="p-8 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">Total Balance</p>
          <p className="text-5xl font-bold tracking-tight mt-2">
            ${totalUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border mt-8 border border-border rounded-md overflow-hidden">
            {CRYPTO_BALANCES.map((c) => (
              <div key={c.symbol} className="bg-background p-5">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {c.symbol}
                </p>
                <p className="text-lg font-semibold mt-1">{c.amount}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  ${c.usd.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
            <div className="bg-background p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {FIAT_BALANCE.currency}
              </p>
              <p className="text-lg font-semibold mt-1">
                ${FIAT_BALANCE.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Fiat</p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: "Deposit", icon: ArrowDownToLine },
            { label: "Withdraw", icon: ArrowUpFromLine },
            { label: "Send", icon: Send },
            { label: "Receive", icon: QrCode },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() =>
                toast({ title: `${label} flow`, description: `${label} action triggered.` })
              }
              className="border border-border rounded-md p-5 flex flex-col items-start gap-3 hover:bg-secondary/50 transition-colors text-left"
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          {/* Transactions */}
          <Card className="lg:col-span-2 p-8 rounded-lg border border-border">
            <h2 className="text-xl font-semibold tracking-tight">Transaction History</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-border">
                    <th className="py-3 font-medium">Date</th>
                    <th className="py-3 font-medium">Type</th>
                    <th className="py-3 font-medium">Asset</th>
                    <th className="py-3 font-medium text-right">Amount</th>
                    <th className="py-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {WALLET_TRANSACTIONS.map((tx) => (
                    <tr key={tx.id} className="border-b border-border/60 last:border-0">
                      <td className="py-4">{tx.date}</td>
                      <td className="py-4">{tx.type}</td>
                      <td className="py-4">{tx.asset}</td>
                      <td
                        className={`py-4 text-right font-medium ${
                          tx.amount < 0 ? "text-foreground" : "text-foreground"
                        }`}
                      >
                        {tx.amount > 0 ? "+" : ""}
                        {tx.amount} {tx.asset}
                      </td>
                      <td className="py-4 text-right text-muted-foreground">{tx.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Address */}
          <Card className="p-8 rounded-lg border border-border flex flex-col">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <WalletIcon className="w-4 h-4" /> Wallet Address
            </div>
            <p className="text-xs text-muted-foreground mt-4">Your receiving address</p>
            <div className="mt-2 p-4 border border-border rounded-md font-mono text-sm break-all">
              {WALLET_ADDRESS}
            </div>
            <Button onClick={handleCopy} className="mt-4 rounded-md w-full" variant="outline">
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" /> Copy address
                </>
              )}
            </Button>
            <Button
              onClick={() =>
                toast({
                  title: "New address generated",
                  description: "A fresh receive address has been created.",
                })
              }
              className="mt-2 rounded-md w-full"
            >
              Generate new address
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
