import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Wallet as WalletIcon,
  Plus,
  Download,
  Copy,
  Check,
  Eye,
  EyeOff,
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  QrCode,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  LogOut,
} from "lucide-react";

const WORDS = [
  "ocean","forest","silver","glide","velvet","horizon","amber","quartz",
  "echo","matrix","summit","nebula","ember","spruce","willow","onyx",
  "harbor","atlas","vivid","linen","cobalt","prism","raven","lunar",
];

function generateSeed() {
  const arr: string[] = [];
  for (let i = 0; i < 12; i++) {
    arr.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }
  return arr;
}

function generatePrivateKey() {
  const chars = "0123456789abcdef";
  let s = "0x";
  for (let i = 0; i < 64; i++) s += chars[Math.floor(Math.random() * 16)];
  return s;
}

function generateAddress() {
  const chars = "0123456789abcdef";
  let s = "0x";
  for (let i = 0; i < 40; i++) s += chars[Math.floor(Math.random() * 16)];
  return s;
}

type WalletState = {
  address: string;
  seed: string[];
  privateKey: string;
  createdAt: number;
};

const STORAGE_KEY = "oswap_wallet_v1";

const ASSETS = [
  { symbol: "SOL", name: "Solana", amount: 28.4, usd: 4262.4, change: 2.4 },
  { symbol: "ETH", name: "Ethereum", amount: 1.5023, usd: 4710.0, change: -0.8 },
  { symbol: "BTC", name: "Bitcoin", amount: 0.0421, usd: 2850.32, change: 1.1 },
  { symbol: "USDT", name: "Tether", amount: 1240.5, usd: 1240.5, change: 0.0 },
];

const ACTIVITY = [
  { id: "a1", type: "Receive", asset: "SOL", amount: 4.2, date: "Today" },
  { id: "a2", type: "Send", asset: "ETH", amount: -0.25, date: "Yesterday" },
  { id: "a3", type: "Swap", asset: "USDT → SOL", amount: 600, date: "Oct 18" },
  { id: "a4", type: "Receive", asset: "BTC", amount: 0.012, date: "Oct 12" },
];

export default function WalletPage() {
  const { toast } = useToast();
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [view, setView] = useState<
    "intro" | "create-seed" | "create-confirm" | "create-pk" | "import" | "wallet"
  >("intro");
  const [draftSeed, setDraftSeed] = useState<string[]>([]);
  const [draftPk, setDraftPk] = useState("");
  const [draftAddress, setDraftAddress] = useState("");
  const [importText, setImportText] = useState("");
  const [revealPk, setRevealPk] = useState(false);
  const [revealSeed, setRevealSeed] = useState(true);
  const [copiedSeed, setCopiedSeed] = useState(false);
  const [copiedPk, setCopiedPk] = useState(false);
  const [copiedAddr, setCopiedAddr] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as WalletState;
        setWallet(parsed);
        setView("wallet");
      } catch {
        // ignore
      }
    }
  }, []);

  const startCreate = () => {
    const seed = generateSeed();
    const pk = generatePrivateKey();
    const addr = generateAddress();
    setDraftSeed(seed);
    setDraftPk(pk);
    setDraftAddress(addr);
    setRevealSeed(false);
    setView("create-seed");
  };

  const persistWallet = (w: WalletState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(w));
    setWallet(w);
    setView("wallet");
    toast({ title: "Wallet ready", description: "Welcome to OSWAP Wallet." });
  };

  const finishCreate = () => {
    persistWallet({
      address: draftAddress,
      seed: draftSeed,
      privateKey: draftPk,
      createdAt: Date.now(),
    });
  };

  const importWallet = () => {
    const words = importText.trim().split(/\s+/);
    if (words.length !== 12) {
      toast({
        title: "Invalid seed phrase",
        description: "Seed phrase must be exactly 12 words.",
        variant: "destructive",
      });
      return;
    }
    persistWallet({
      address: generateAddress(),
      seed: words,
      privateKey: generatePrivateKey(),
      createdAt: Date.now(),
    });
  };

  const copy = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 1500);
  };

  const logOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setWallet(null);
    setView("intro");
    setRevealPk(false);
    setShowSecrets(false);
  };

  const totalUsd = ASSETS.reduce((s, a) => s + a.usd, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {view === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="max-w-md mx-auto text-center pt-8"
            >
              <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center mx-auto">
                <WalletIcon className="w-7 h-7" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight mt-6">
                Welcome to OSWAP Wallet
              </h1>
              <p className="text-muted-foreground mt-3">
                A self-custodial home for your crypto. You own the keys — we just make it elegant.
              </p>

              <div className="mt-10 space-y-3">
                <button
                  onClick={startCreate}
                  className="w-full p-5 border border-border rounded-lg flex items-center justify-between text-left hover:bg-secondary/40 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-foreground text-background flex items-center justify-center">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Create a new wallet</p>
                      <p className="text-sm text-muted-foreground">
                        Generate a fresh seed phrase
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setView("import")}
                  className="w-full p-5 border border-border rounded-lg flex items-center justify-between text-left hover:bg-secondary/40 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md border border-border flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">I already have a wallet</p>
                      <p className="text-sm text-muted-foreground">
                        Import using your seed phrase
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className="text-xs text-muted-foreground mt-8 flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Your keys never leave this device.
              </p>
            </motion.div>
          )}

          {/* IMPORT */}
          {view === "import" && (
            <motion.div
              key="import"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="max-w-md mx-auto pt-8"
            >
              <button
                onClick={() => setView("intro")}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back
              </button>
              <h1 className="text-3xl font-bold tracking-tight mt-6">
                Import your wallet
              </h1>
              <p className="text-muted-foreground mt-2">
                Paste your 12-word seed phrase, separated by spaces.
              </p>
              <Textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="word1 word2 word3 ..."
                rows={5}
                className="mt-6 font-mono text-sm"
              />
              <Button onClick={importWallet} className="w-full mt-4 rounded-md h-12">
                Import wallet
              </Button>
            </motion.div>
          )}

          {/* CREATE: SEED */}
          {view === "create-seed" && (
            <motion.div
              key="create-seed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="max-w-xl mx-auto pt-8"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Step 1 of 2
              </p>
              <h1 className="text-3xl font-bold tracking-tight mt-2">
                Save your seed phrase
              </h1>
              <p className="text-muted-foreground mt-2">
                These 12 words are the only way to recover your wallet. Write them down and keep them somewhere safe — never share them.
              </p>

              <div className="mt-8 relative">
                <div
                  className={`grid grid-cols-3 gap-2 p-5 border border-border rounded-lg transition-all ${
                    !revealSeed ? "blur-md select-none" : ""
                  }`}
                >
                  {draftSeed.map((w, i) => (
                    <div
                      key={i}
                      className="border border-border rounded-md py-3 px-3 text-sm font-mono flex items-center gap-2"
                    >
                      <span className="text-muted-foreground text-xs w-5">{i + 1}.</span>
                      {w}
                    </div>
                  ))}
                </div>
                {!revealSeed && (
                  <button
                    onClick={() => setRevealSeed(true)}
                    className="absolute inset-0 flex items-center justify-center bg-background/40 rounded-lg"
                  >
                    <span className="px-4 py-2 border border-border rounded-md bg-background text-sm font-medium flex items-center gap-2">
                      <Eye className="w-4 h-4" /> Tap to reveal
                    </span>
                  </button>
                )}
              </div>

              <div className="mt-4 p-4 bg-secondary/40 border border-border rounded-md text-sm flex gap-3">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  Anyone with these words can access your wallet. OSWAP cannot recover them for you.
                </span>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => copy(draftSeed.join(" "), setCopiedSeed)}
                  className="rounded-md flex-1"
                >
                  {copiedSeed ? (
                    <><Check className="w-4 h-4 mr-2" /> Copied</>
                  ) : (
                    <><Copy className="w-4 h-4 mr-2" /> Copy phrase</>
                  )}
                </Button>
                <Button
                  onClick={() => setView("create-pk")}
                  disabled={!revealSeed}
                  className="rounded-md flex-1"
                >
                  I saved it <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* CREATE: PRIVATE KEY */}
          {view === "create-pk" && (
            <motion.div
              key="create-pk"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="max-w-xl mx-auto pt-8"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Step 2 of 2
              </p>
              <h1 className="text-3xl font-bold tracking-tight mt-2">
                Your private key
              </h1>
              <p className="text-muted-foreground mt-2">
                Stored only on your device. You can view it again later from settings.
              </p>

              <div className="mt-8 p-5 border border-border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Private key
                  </span>
                  <button
                    onClick={() => setRevealPk((v) => !v)}
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    {revealPk ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {revealPk ? "Hide" : "Show"}
                  </button>
                </div>
                <p className={`mt-3 font-mono text-sm break-all ${!revealPk ? "blur-sm select-none" : ""}`}>
                  {draftPk}
                </p>
              </div>

              <div className="mt-4 p-5 border border-border rounded-lg">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Wallet address
                </span>
                <p className="mt-3 font-mono text-sm break-all">{draftAddress}</p>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => copy(draftPk, setCopiedPk)}
                  className="rounded-md flex-1"
                >
                  {copiedPk ? (
                    <><Check className="w-4 h-4 mr-2" /> Copied</>
                  ) : (
                    <><Copy className="w-4 h-4 mr-2" /> Copy private key</>
                  )}
                </Button>
                <Button onClick={finishCreate} className="rounded-md flex-1">
                  Open wallet
                </Button>
              </div>
            </motion.div>
          )}

          {/* WALLET HOME */}
          {view === "wallet" && wallet && (
            <motion.div
              key="wallet"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold">
                    O
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Main wallet</p>
                    <button
                      onClick={() => copy(wallet.address, setCopiedAddr)}
                      className="text-xs text-muted-foreground hover:text-foreground font-mono flex items-center gap-1"
                    >
                      {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                      {copiedAddr ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSecrets(true)}
                    className="rounded-md"
                  >
                    <ShieldCheck className="w-4 h-4 mr-2" /> Secrets
                  </Button>
                  <Button variant="outline" size="sm" onClick={logOut} className="rounded-md">
                    <LogOut className="w-4 h-4 mr-2" /> Lock
                  </Button>
                </div>
              </div>

              {/* Balance */}
              <Card className="mt-8 p-10 rounded-2xl border border-border text-center">
                <p className="text-sm text-muted-foreground uppercase tracking-widest">
                  Total balance
                </p>
                <p className="text-6xl font-bold tracking-tight mt-3">
                  ${totalUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                  {[
                    { label: "Send", icon: Send },
                    { label: "Receive", icon: QrCode },
                    { label: "Deposit", icon: ArrowDownToLine },
                    { label: "Withdraw", icon: ArrowUpFromLine },
                  ].map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() =>
                        toast({
                          title: `${label}`,
                          description: `${label} flow opened.`,
                        })
                      }
                      className="border border-border rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-secondary/40 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Tokens */}
              <div className="grid lg:grid-cols-3 gap-6 mt-8">
                <Card className="lg:col-span-2 p-6 rounded-2xl border border-border">
                  <h2 className="text-lg font-semibold tracking-tight">Tokens</h2>
                  <div className="mt-4 divide-y divide-border">
                    {ASSETS.map((a) => (
                      <div
                        key={a.symbol}
                        className="py-4 flex items-center justify-between hover:bg-secondary/30 -mx-2 px-2 rounded-md transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center font-mono text-xs font-bold">
                            {a.symbol.slice(0, 3)}
                          </div>
                          <div>
                            <p className="font-medium">{a.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {a.amount} {a.symbol}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${a.usd.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </p>
                          <p
                            className={`text-xs ${
                              a.change > 0
                                ? "text-foreground"
                                : a.change < 0
                                ? "text-muted-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {a.change > 0 ? "+" : ""}
                            {a.change}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 rounded-2xl border border-border">
                  <h2 className="text-lg font-semibold tracking-tight">Activity</h2>
                  <div className="mt-4 space-y-4">
                    {ACTIVITY.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center">
                            {tx.type === "Receive" ? (
                              <ArrowDownToLine className="w-4 h-4" />
                            ) : tx.type === "Send" ? (
                              <ArrowUpFromLine className="w-4 h-4" />
                            ) : (
                              <Send className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{tx.type}</p>
                            <p className="text-xs text-muted-foreground">{tx.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {tx.amount > 0 ? "+" : ""}
                            {tx.amount}
                          </p>
                          <p className="text-xs text-muted-foreground">{tx.asset}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Secrets Dialog */}
      <Dialog open={showSecrets} onOpenChange={setShowSecrets}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Your secret keys</DialogTitle>
            <DialogDescription>
              Never share these. Anyone with them controls your wallet.
            </DialogDescription>
          </DialogHeader>
          {wallet && (
            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Seed phrase
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2 p-3 border border-border rounded-md">
                  {wallet.seed.map((w, i) => (
                    <div key={i} className="text-xs font-mono py-1.5 px-2 border border-border rounded">
                      <span className="text-muted-foreground mr-1">{i + 1}.</span>
                      {w}
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 rounded-md"
                  onClick={() => copy(wallet.seed.join(" "), setCopiedSeed)}
                >
                  {copiedSeed ? <><Check className="w-3.5 h-3.5 mr-2" />Copied</> : <><Copy className="w-3.5 h-3.5 mr-2" />Copy phrase</>}
                </Button>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Private key
                </p>
                <p className="mt-2 p-3 border border-border rounded-md font-mono text-xs break-all">
                  {wallet.privateKey}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 rounded-md"
                  onClick={() => copy(wallet.privateKey, setCopiedPk)}
                >
                  {copiedPk ? <><Check className="w-3.5 h-3.5 mr-2" />Copied</> : <><Copy className="w-3.5 h-3.5 mr-2" />Copy private key</>}
                </Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowSecrets(false)} className="rounded-md">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
