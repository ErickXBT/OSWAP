import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MOCK_BALANCES, MOCK_TRANSACTIONS } from "@/lib/mockData";
import { ArrowDownLeft, ArrowUpRight, Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Overview() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">Your unified balance and recent activity.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/deposit"><Plus className="w-4 h-4 mr-2" /> Deposit Funds</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="col-span-2 bg-card border border-card-border rounded-xl p-6 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground mb-2">Total Balance</div>
          <div className="text-4xl font-bold tracking-tight mb-8">
            ${MOCK_BALANCES.totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium mb-1">
                <div className="w-2 h-2 rounded-full bg-foreground"></div>
                Fiat
              </div>
              <div className="text-xl font-semibold">${MOCK_BALANCES.fiat.usdValue.toLocaleString()}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-medium mb-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                Crypto
              </div>
              <div className="text-xl font-semibold">${MOCK_BALANCES.crypto.usdValue.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 shadow-sm flex flex-col">
          <div className="text-sm font-medium text-muted-foreground mb-4">Assets</div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            {MOCK_BALANCES.crypto.assets.map(asset => (
              <div key={asset.symbol} className="flex items-center justify-between">
                <div className="font-medium">{asset.symbol}</div>
                <div className="text-right">
                  <div>{asset.amount}</div>
                  <div className="text-xs text-muted-foreground">${asset.value.toLocaleString()}</div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="font-medium">{MOCK_BALANCES.fiat.currency}</div>
              <div className="text-right">
                <div>${MOCK_BALANCES.fiat.usdValue.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground">View All</Button>
        </div>
        
        <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
          {MOCK_TRANSACTIONS.length > 0 ? (
            <div className="divide-y divide-border">
              {MOCK_TRANSACTIONS.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-secondary text-foreground' : 'bg-background border border-border text-foreground'}`}>
                      {tx.amount > 0 ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="font-medium">{tx.merchant}</div>
                      <div className="text-xs text-muted-foreground">{tx.date} • {tx.status}</div>
                    </div>
                  </div>
                  <div className={`font-medium ${tx.amount > 0 ? 'text-foreground' : ''}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No transactions yet.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
