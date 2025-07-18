import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Bell, Moon, Sun, Globe, DollarSign, Shield, Database } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useState } from 'react';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('English');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk bg-gradient-to-r from-crypto-green to-crypto-blue bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Customize your CryptoTracker experience
          </p>
        </div>

        {/* Appearance */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sun className="w-5 h-5 mr-2" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Theme</Label>
                <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('light')}
                >
                  <Sun className="w-4 h-4 mr-2" />
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                >
                  <Moon className="w-4 h-4 mr-2" />
                  Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('system')}
                >
                  System
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications for important updates</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Price Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when your crypto prices change</p>
              </div>
              <Switch
                checked={priceAlerts}
                onCheckedChange={setPriceAlerts}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-base font-medium">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                    <SelectItem value="BTC">BTC - Bitcoin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-base font-medium">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-base font-medium">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground mb-2">Add an extra layer of security to your account</p>
              <Button variant="outline">Enable 2FA</Button>
            </div>
            <Separator />
            <div>
              <Label className="text-base font-medium">API Keys</Label>
              <p className="text-sm text-muted-foreground mb-2">Manage your API keys for external services</p>
              <Button variant="outline">Manage API Keys</Button>
            </div>
          </CardContent>
        </Card>

        {/* Data */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Data & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-base font-medium">Export Data</Label>
              <p className="text-sm text-muted-foreground mb-2">Download your portfolio and transaction history</p>
              <Button variant="outline">Export Data</Button>
            </div>
            <Separator />
            <div>
              <Label className="text-base font-medium">Clear Cache</Label>
              <p className="text-sm text-muted-foreground mb-2">Clear stored data and refresh the application</p>
              <Button variant="outline">Clear Cache</Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Settings */}
        <div className="flex justify-end">
          <Button className="bg-gradient-to-r from-crypto-green to-crypto-blue hover:from-crypto-green/90 hover:to-crypto-blue/90">
            Save Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}