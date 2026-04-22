import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type CryptoAsset = {
  value: string;
  label: string;
  network: string;
  symbol: string;
  address: string;
  uriScheme: string;
};

const CRYPTO_ASSETS: CryptoAsset[] = [
  {
    value: "usdc",
    label: "USDC (ERC-20)",
    network: "Ethereum network",
    symbol: "USDC",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    uriScheme: "ethereum:",
  },
  {
    value: "eth",
    label: "Ethereum (ETH)",
    network: "Ethereum network",
    symbol: "ETH",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    uriScheme: "ethereum:",
  },
  {
    value: "btc",
    label: "Bitcoin (BTC)",
    network: "Bitcoin network",
    symbol: "BTC",
    address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
    uriScheme: "bitcoin:",
  },
  {
    value: "sol",
    label: "Solana (SOL)",
    network: "Solana network",
    symbol: "SOL",
    address: "9wzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    uriScheme: "solana:",
  },
];

const FIAT_CURRENCIES: {
  value: string;
  label: string;
  symbol: string;
  rail: string;
}[] = [
  { value: "usd", label: "USD — United States Dollar", symbol: "$", rail: "ACH/Wire" },
  { value: "eur", label: "EUR — Euro Area", symbol: "€", rail: "SEPA" },
  { value: "gbp", label: "GBP — British Pound", symbol: "£", rail: "Faster Payments" },
  { value: "jpy", label: "JPY — Japanese Yen", symbol: "¥", rail: "Zengin" },
  { value: "cny", label: "CNY — Chinese Yuan", symbol: "¥", rail: "CNAPS" },
  { value: "hkd", label: "HKD — Hong Kong Dollar", symbol: "HK$", rail: "FPS" },
  { value: "sgd", label: "SGD — Singapore Dollar", symbol: "S$", rail: "FAST" },
  { value: "aud", label: "AUD — Australian Dollar", symbol: "A$", rail: "PayID/NPP" },
  { value: "nzd", label: "NZD — New Zealand Dollar", symbol: "NZ$", rail: "BECS" },
  { value: "cad", label: "CAD — Canadian Dollar", symbol: "C$", rail: "Interac" },
  { value: "chf", label: "CHF — Swiss Franc", symbol: "CHF", rail: "SIC" },
  { value: "sek", label: "SEK — Swedish Krona", symbol: "kr", rail: "Swish" },
  { value: "nok", label: "NOK — Norwegian Krone", symbol: "kr", rail: "Straksbetaling" },
  { value: "dkk", label: "DKK — Danish Krone", symbol: "kr", rail: "Straksclearing" },
  { value: "pln", label: "PLN — Polish Zloty", symbol: "zł", rail: "Express Elixir" },
  { value: "czk", label: "CZK — Czech Koruna", symbol: "Kč", rail: "CERTIS" },
  { value: "huf", label: "HUF — Hungarian Forint", symbol: "Ft", rail: "GIRO Instant" },
  { value: "ron", label: "RON — Romanian Leu", symbol: "lei", rail: "TransFonD" },
  { value: "try", label: "TRY — Turkish Lira", symbol: "₺", rail: "FAST" },
  { value: "rub", label: "RUB — Russian Ruble", symbol: "₽", rail: "SBP" },
  { value: "uah", label: "UAH — Ukrainian Hryvnia", symbol: "₴", rail: "SEP 4.0" },
  { value: "inr", label: "INR — Indian Rupee", symbol: "₹", rail: "UPI/IMPS" },
  { value: "idr", label: "IDR — Indonesian Rupiah", symbol: "Rp", rail: "BI-FAST" },
  { value: "myr", label: "MYR — Malaysian Ringgit", symbol: "RM", rail: "DuitNow" },
  { value: "thb", label: "THB — Thai Baht", symbol: "฿", rail: "PromptPay" },
  { value: "php", label: "PHP — Philippine Peso", symbol: "₱", rail: "InstaPay" },
  { value: "vnd", label: "VND — Vietnamese Dong", symbol: "₫", rail: "NAPAS 247" },
  { value: "krw", label: "KRW — South Korean Won", symbol: "₩", rail: "KFTC" },
  { value: "twd", label: "TWD — Taiwan Dollar", symbol: "NT$", rail: "FISC" },
  { value: "aed", label: "AED — UAE Dirham", symbol: "د.إ", rail: "IPP" },
  { value: "sar", label: "SAR — Saudi Riyal", symbol: "﷼", rail: "Sarie" },
  { value: "qar", label: "QAR — Qatari Riyal", symbol: "﷼", rail: "QATCH" },
  { value: "ils", label: "ILS — Israeli Shekel", symbol: "₪", rail: "Zahav" },
  { value: "egp", label: "EGP — Egyptian Pound", symbol: "E£", rail: "InstaPay" },
  { value: "zar", label: "ZAR — South African Rand", symbol: "R", rail: "PayShap" },
  { value: "ngn", label: "NGN — Nigerian Naira", symbol: "₦", rail: "NIP" },
  { value: "kes", label: "KES — Kenyan Shilling", symbol: "KSh", rail: "PesaLink" },
  { value: "ghs", label: "GHS — Ghanaian Cedi", symbol: "₵", rail: "GhIPSS" },
  { value: "brl", label: "BRL — Brazilian Real", symbol: "R$", rail: "PIX" },
  { value: "mxn", label: "MXN — Mexican Peso", symbol: "Mex$", rail: "SPEI" },
  { value: "ars", label: "ARS — Argentine Peso", symbol: "$", rail: "Transferencias 3.0" },
  { value: "clp", label: "CLP — Chilean Peso", symbol: "$", rail: "TEF" },
  { value: "cop", label: "COP — Colombian Peso", symbol: "$", rail: "PSE" },
  { value: "pen", label: "PEN — Peruvian Sol", symbol: "S/", rail: "CCE" },
];

export default function DepositPage() {
  const [method, setMethod] = useState<"crypto" | "fiat">("crypto");
  const [copied, setCopied] = useState(false);
  const [assetValue, setAssetValue] = useState<string>("usdc");
  const [currencyValue, setCurrencyValue] = useState<string>("usd");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [etaSeconds, setEtaSeconds] = useState<number>(7);
  const { toast } = useToast();

  const asset = useMemo(
    () => CRYPTO_ASSETS.find((a) => a.value === assetValue) ?? CRYPTO_ASSETS[0],
    [assetValue]
  );
  const currency = useMemo(
    () => FIAT_CURRENCIES.find((c) => c.value === currencyValue) ?? FIAT_CURRENCIES[0],
    [currencyValue]
  );

  useEffect(() => {
    const uri = `${asset.uriScheme}${asset.address}`;
    QRCode.toDataURL(uri, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 320,
      color: { dark: "#0a0a0a", light: "#ffffff" },
    }).then(setQrDataUrl).catch(() => setQrDataUrl(""));
  }, [asset]);

  useEffect(() => {
    const id = setInterval(() => {
      setEtaSeconds((s) => (s <= 1 ? 12 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(asset.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Address copied to clipboard" });
  };

  const handleFiatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Deposit Initiated",
      description: `Estimated settlement in ~${etaSeconds}s via ${currency.rail}.`,
    });
  };

  const shortAddress = `${asset.address.slice(0, 6)}…${asset.address.slice(-6)}`;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Deposit Funds</h1>
        <p className="text-muted-foreground text-sm mt-1">Add balance to spend with your virtual card.</p>
      </div>

      <div className="max-w-2xl">
        <div className="flex bg-secondary p-1 rounded-lg mb-8 w-fit">
          <button
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${method === "crypto" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setMethod("crypto")}
          >
            Crypto
          </button>
          <button
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${method === "fiat" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setMethod("fiat")}
          >
            Fiat (Bank)
          </button>
        </div>

        {method === "crypto" ? (
          <div className="bg-card border border-card-border rounded-xl shadow-sm p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-lg font-semibold mb-6">Crypto Deposit</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Select Asset</Label>
                <Select value={assetValue} onValueChange={setAssetValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent>
                    {CRYPTO_ASSETS.map((a) => (
                      <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="p-6 border border-border rounded-xl bg-secondary/20 flex flex-col items-center justify-center gap-4">
                <div className="w-56 h-56 bg-white p-3 rounded-2xl flex items-center justify-center shadow-sm">
                  {qrDataUrl ? (
                    <img src={qrDataUrl} alt={`${asset.symbol} deposit QR`} className="w-full h-full" />
                  ) : (
                    <div className="w-full h-full bg-zinc-100 animate-pulse rounded-lg" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Scan to deposit {asset.symbol} on {asset.network}
                </p>
                <p className="text-xs font-mono text-muted-foreground break-all text-center px-2">
                  {shortAddress}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Deposit Address</Label>
                <div className="flex gap-2">
                  <Input readOnly value={asset.address} className="font-mono text-xs bg-secondary/50" />
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
                <Select value={currencyValue} onValueChange={setCurrencyValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {FIAT_CURRENCIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label} ({c.rail})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{currency.symbol}</span>
                  <Input type="number" placeholder="0.00" className="pl-10" required min="10" />
                </div>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network</span>
                  <span className="font-medium">{currency.rail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fee</span>
                  <span className="font-medium">{currency.symbol}0.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <span className="font-mono font-medium tabular-nums flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    ~{etaSeconds}s
                  </span>
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
