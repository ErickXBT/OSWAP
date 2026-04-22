import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MOCK_USER } from "@/lib/mockData";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SettingsDialog({ open, onOpenChange }: Props) {
  const { toast } = useToast();

  const [name, setName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [phone, setPhone] = useState("+1 (555) 010-2024");

  const [twoFA, setTwoFA] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const [currency, setCurrency] = useState("usd");
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your account, security, and preferences.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="settings-name">Full name</Label>
              <Input
                id="settings-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="settings-email">Email address</Label>
              <Input
                id="settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="settings-phone">Phone number</Label>
              <Input
                id="settings-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 mt-6">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5 pr-4">
                <Label className="text-base">Two-factor authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Require a code from your authenticator app on every login.
                </p>
              </div>
              <Switch checked={twoFA} onCheckedChange={setTwoFA} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5 pr-4">
                <Label className="text-base">Biometric unlock</Label>
                <p className="text-sm text-muted-foreground">
                  Use Face ID or fingerprint to confirm sensitive actions.
                </p>
              </div>
              <Switch checked={biometric} onCheckedChange={setBiometric} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5 pr-4">
                <Label className="text-base">Login alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when your account is accessed from a new device.
                </p>
              </div>
              <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                toast({ title: "Password reset email sent" })
              }
            >
              Change password
            </Button>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-6">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5 pr-4">
                <Label className="text-base">Email notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Transaction receipts, deposits, and security alerts.
                </p>
              </div>
              <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5 pr-4">
                <Label className="text-base">Push notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Real-time alerts for card activity on your devices.
                </p>
              </div>
              <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5 pr-4">
                <Label className="text-base">Product updates</Label>
                <p className="text-sm text-muted-foreground">
                  Occasional emails about new features and offers.
                </p>
              </div>
              <Switch checked={marketing} onCheckedChange={setMarketing} />
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label>Default currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD — US Dollar</SelectItem>
                  <SelectItem value="eur">EUR — Euro</SelectItem>
                  <SelectItem value="gbp">GBP — British Pound</SelectItem>
                  <SelectItem value="idr">IDR — Indonesian Rupiah</SelectItem>
                  <SelectItem value="sgd">SGD — Singapore Dollar</SelectItem>
                  <SelectItem value="jpy">JPY — Japanese Yen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
