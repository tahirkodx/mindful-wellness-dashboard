
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Save, Trash, Lock } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const Settings = () => {
  const [settings, setSettings] = useState({
    appearance: {
      darkMode: false,
    },
    privacy: {
      shareData: true,
      shareInsights: false
    },
    account: {
      email: "john@example.com",
      password: "••••••••"
    }
  });
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "Please check your email for confirmation.",
      variant: "destructive"
    });
  };
  
  const handleAppearanceChange = (key: string, value: boolean) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [key]: value
      }
    });
  };
  
  const handlePrivacyChange = (key: string, value: boolean) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="appearance">
        <TabsList>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how Wellness Tracker looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use dark theme to reduce eye strain in low light
                    </p>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    checked={settings.appearance.darkMode}
                    onCheckedChange={(checked) => handleAppearanceChange("darkMode", checked)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save size={16} className="mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Manage your data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="share-data">Share Anonymous Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve the app by sharing anonymous usage data
                    </p>
                  </div>
                  <Switch 
                    id="share-data" 
                    checked={settings.privacy.shareData}
                    onCheckedChange={(checked) => handlePrivacyChange("shareData", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="share-insights">Community Insights</Label>
                    <p className="text-sm text-muted-foreground">
                      Share your wellness insights with the community
                    </p>
                  </div>
                  <Switch 
                    id="share-insights" 
                    checked={settings.privacy.shareInsights}
                    onCheckedChange={(checked) => handlePrivacyChange("shareInsights", checked)}
                  />
                </div>
              </div>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Privacy Information</AlertTitle>
                <AlertDescription>
                  Your personal data is never shared with third parties. We only use anonymized data for app improvements.
                </AlertDescription>
              </Alert>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save size={16} className="mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account details and security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={settings.account.email} 
                    onChange={(e) => setSettings({
                      ...settings, 
                      account: {...settings.account, email: e.target.value}
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="password" 
                      type="password" 
                      value={settings.account.password} 
                      readOnly
                    />
                    <Button variant="outline">
                      <Lock size={16} className="mr-2" />
                      Change
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="pt-4">
                <h3 className="text-base font-medium mb-4">Danger Zone</h3>
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Delete Account</AlertTitle>
                  <AlertDescription>
                    This action is permanent and cannot be undone. All your data will be permanently removed.
                  </AlertDescription>
                </Alert>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                >
                  <Trash size={16} className="mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
