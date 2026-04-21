import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  ArrowRightLeft, 
  Wallet, 
  Settings, 
  LogOut,
  Menu
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useLocation } from "wouter";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: Wallet },
  { name: "Virtual Card", href: "/dashboard/card", icon: CreditCard },
  { name: "Deposit", href: "/dashboard/deposit", icon: ArrowRightLeft },
];

export function DashboardSidebar() {
  const [location] = useLocation();

  const NavLinks = () => (
    <>
      <div className="flex flex-col gap-1 w-full mt-8">
        {navItems.map((item) => {
          const isActive = location === item.href || (location.startsWith(item.href) && item.href !== "/dashboard");
          return (
            <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'}`}>
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </div>
      <div className="mt-auto flex flex-col gap-1 w-full pb-4">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
          <Settings className="h-4 w-4" />
          Settings
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="hidden md:flex flex-col w-64 border-r border-border h-screen sticky top-0 bg-background px-4 py-6">
        <Link href="/" className="font-bold text-xl tracking-tight px-3">OSWAP</Link>
        <NavLinks />
      </div>
      
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background sticky top-0 z-40">
        <Link href="/" className="font-bold text-xl tracking-tight">OSWAP</Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col w-64 p-4 pt-12">
            <Link href="/" className="font-bold text-xl tracking-tight px-3 mb-4">OSWAP</Link>
            <NavLinks />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export function DashboardTopbar({ userName, totalBalance }: { userName: string, totalBalance: number }) {
  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="text-sm font-medium text-muted-foreground">
        Total Balance <span className="text-foreground ml-2 font-semibold">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-secondary border border-border flex items-center justify-center text-xs font-semibold">
          {userName.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
    </div>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { MOCK_USER, MOCK_BALANCES } = require('@/lib/mockData');
  
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row w-full font-sans">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="hidden md:block">
          <DashboardTopbar userName={MOCK_USER.name} totalBalance={MOCK_BALANCES.totalUsd} />
        </div>
        <main className="flex-1 overflow-auto p-4 md:p-8 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
