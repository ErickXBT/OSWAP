import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { VirtualCard } from "@/components/VirtualCard";
import { Button } from "@/components/ui/button";
import { Shield, CreditCard, Ban } from "lucide-react";

export default function CardPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Virtual Card</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your active virtual Mastercard.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <VirtualCard />
          
          <div className="mt-12 bg-secondary/30 rounded-xl p-6 border border-border/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Card Security
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your card is protected by 3D Secure. You can instantly freeze or cancel this card at any time if you suspect unauthorized activity.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-card-border rounded-xl shadow-sm p-6">
            <h2 className="font-semibold mb-4 text-lg">Card Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-foreground"></span> Active
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Daily Limit</span>
                <span className="font-medium">$5,000.00</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">Billing Address</span>
                <span className="font-medium text-right max-w-[200px]">123 Startup Blvd, San Francisco, CA 94107</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-xl shadow-sm p-6">
            <h2 className="font-semibold mb-4 text-lg">Actions</h2>
            <div className="flex flex-col gap-3">
              <Button variant="outline" className="justify-start">
                <CreditCard className="w-4 h-4 mr-2" /> Replace Card
              </Button>
              <Button variant="outline" className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20">
                <Ban className="w-4 h-4 mr-2" /> Freeze Card
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
