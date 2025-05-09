
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Edit2, Save } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    weight: 75,
    height: 178,
    age: 32,
    gender: "male",
    goals: {
      water: 8,
      exercise: 30,
      sleep: 8
    },
    notifications: {
      email: true,
      app: true,
      morning: true,
      evening: true
    }
  });
  const { toast } = useToast();

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile saved",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setProfile({
      ...profile,
      notifications: {
        ...profile.notifications,
        [key]: value
      }
    });
  };

  const handleGoalChange = (key: string, value: number) => {
    setProfile({
      ...profile,
      goals: {
        ...profile.goals,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.email}</p>
              <p className="text-sm text-muted-foreground">Member since May 2023</p>
            </div>
            
            <Button 
              variant={isEditing ? "default" : "outline"}
              className="md:ml-auto"
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 size={16} className="mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal Details</TabsTrigger>
          <TabsTrigger value="goals">Wellness Goals</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profile.email} 
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    value={profile.weight} 
                    onChange={(e) => setProfile({...profile, weight: parseInt(e.target.value)})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    type="number" 
                    value={profile.height} 
                    onChange={(e) => setProfile({...profile, height: parseInt(e.target.value)})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    value={profile.age} 
                    onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={profile.gender}
                    onValueChange={(value) => setProfile({...profile, gender: value})}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button disabled={!isEditing} onClick={handleSaveProfile}>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wellness Goals</CardTitle>
              <CardDescription>
                Set your daily wellness goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="water-goal">Daily Water Intake (glasses)</Label>
                  <span className="font-medium">{profile.goals.water} glasses</span>
                </div>
                <Slider 
                  id="water-goal"
                  min={1}
                  max={15}
                  step={1}
                  value={[profile.goals.water]}
                  onValueChange={(value) => handleGoalChange("water", value[0])}
                  disabled={!isEditing}
                  className="py-2"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="exercise-goal">Daily Exercise (minutes)</Label>
                  <span className="font-medium">{profile.goals.exercise} minutes</span>
                </div>
                <Slider 
                  id="exercise-goal"
                  min={0}
                  max={120}
                  step={5}
                  value={[profile.goals.exercise]}
                  onValueChange={(value) => handleGoalChange("exercise", value[0])}
                  disabled={!isEditing}
                  className="py-2"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="sleep-goal">Daily Sleep (hours)</Label>
                  <span className="font-medium">{profile.goals.sleep} hours</span>
                </div>
                <Slider 
                  id="sleep-goal"
                  min={5}
                  max={12}
                  step={0.5}
                  value={[profile.goals.sleep]}
                  onValueChange={(value) => handleGoalChange("sleep", value[0])}
                  disabled={!isEditing}
                  className="py-2"
                />
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button disabled={!isEditing} onClick={handleSaveProfile}>
                  <Save size={16} className="mr-2" />
                  Save Goals
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you want to receive reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Methods</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive wellness reminders via email
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={profile.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-notifications">In-App Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive wellness reminders in the app
                    </p>
                  </div>
                  <Switch 
                    id="app-notifications" 
                    checked={profile.notifications.app}
                    onCheckedChange={(checked) => handleNotificationChange("app", checked)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Reminder Schedule</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="morning-reminders">Morning Check-in</Label>
                    <p className="text-sm text-muted-foreground">
                      Reminder to log your morning activities
                    </p>
                  </div>
                  <Switch 
                    id="morning-reminders" 
                    checked={profile.notifications.morning}
                    onCheckedChange={(checked) => handleNotificationChange("morning", checked)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="evening-reminders">Evening Reflection</Label>
                    <p className="text-sm text-muted-foreground">
                      Reminder to complete your daily wellness logs
                    </p>
                  </div>
                  <Switch 
                    id="evening-reminders" 
                    checked={profile.notifications.evening}
                    onCheckedChange={(checked) => handleNotificationChange("evening", checked)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button disabled={!isEditing} onClick={handleSaveProfile}>
                  <Save size={16} className="mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
