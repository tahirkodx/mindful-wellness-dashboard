
import { useState } from "react";
import { 
  Plus, 
  Filter,
  Search,
  Droplets, 
  Activity, 
  Moon, 
  Smile,
  Trash,
  Edit,
  X,
  Check
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Types for logs
interface Log {
  id: string;
  type: 'water' | 'exercise' | 'sleep' | 'mood';
  value: number | string;
  unit?: string;
  date: Date;
  notes?: string;
}

// Dummy data for logs
const dummyLogs: Log[] = [
  {
    id: "1",
    type: "water",
    value: 8,
    unit: "glasses",
    date: new Date(2023, 4, 15, 10, 30),
    notes: "Stayed hydrated today!"
  },
  {
    id: "2",
    type: "exercise",
    value: 45,
    unit: "minutes",
    date: new Date(2023, 4, 15, 18, 0),
    notes: "Evening run"
  },
  {
    id: "3",
    type: "sleep",
    value: 7.5,
    unit: "hours",
    date: new Date(2023, 4, 15, 6, 30),
    notes: "Woke up refreshed"
  },
  {
    id: "4",
    type: "mood",
    value: "Good",
    date: new Date(2023, 4, 15, 20, 0),
    notes: "Productive day overall"
  },
  {
    id: "5",
    type: "water",
    value: 6,
    unit: "glasses",
    date: new Date(2023, 4, 14, 22, 0),
    notes: "Need to drink more water tomorrow"
  },
  {
    id: "6",
    type: "exercise",
    value: 30,
    unit: "minutes",
    date: new Date(2023, 4, 14, 7, 0),
    notes: "Morning yoga session"
  },
  {
    id: "7",
    type: "sleep",
    value: 6,
    unit: "hours",
    date: new Date(2023, 4, 14, 6, 0),
    notes: "Didn't sleep well"
  },
  {
    id: "8",
    type: "mood",
    value: "Excellent",
    date: new Date(2023, 4, 14, 12, 0),
    notes: "Great day with family"
  },
];

const Logs = () => {
  const [logs, setLogs] = useState<Log[]>(dummyLogs);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddingLog, setIsAddingLog] = useState<boolean>(false);
  const [newLog, setNewLog] = useState<Partial<Log>>({
    type: "water",
    value: 0,
    date: new Date(),
  });
  const { toast } = useToast();

  // Filter logs based on tab and search query
  const filteredLogs = logs.filter((log) => {
    const matchesTab = activeTab === "all" || log.type === activeTab;
    const matchesSearch = searchQuery === "" || 
      log.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.value.toString().includes(searchQuery);
    
    return matchesTab && matchesSearch;
  });

  // Group logs by date
  const groupedLogs = filteredLogs.reduce<Record<string, Log[]>>((acc, log) => {
    const dateKey = format(log.date, "yyyy-MM-dd");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(log);
    return acc;
  }, {});

  // Add a new log
  const handleAddLog = () => {
    if (!newLog.type || !newLog.value) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const logToAdd: Log = {
      id: `log-${Date.now()}`,
      type: newLog.type as 'water' | 'exercise' | 'sleep' | 'mood',
      value: newLog.value,
      date: newLog.date || new Date(),
      notes: newLog.notes,
      unit: getUnitByType(newLog.type as 'water' | 'exercise' | 'sleep' | 'mood')
    };

    setLogs([logToAdd, ...logs]);
    setIsAddingLog(false);
    setNewLog({
      type: "water",
      value: 0,
      date: new Date(),
    });

    toast({
      title: "Log added",
      description: "Your wellness log has been added successfully.",
    });
  };

  // Delete a log
  const handleDeleteLog = (id: string) => {
    setLogs(logs.filter(log => log.id !== id));
    toast({
      title: "Log deleted",
      description: "Your wellness log has been deleted.",
    });
  };

  // Helper function to get unit by log type
  const getUnitByType = (type: 'water' | 'exercise' | 'sleep' | 'mood'): string | undefined => {
    switch (type) {
      case 'water':
        return 'glasses';
      case 'exercise':
        return 'minutes';
      case 'sleep':
        return 'hours';
      default:
        return undefined;
    }
  };

  // Helper function to get icon by log type
  const getIconByType = (type: string) => {
    switch (type) {
      case 'water':
        return <Droplets size={20} className="text-wellness-water" />;
      case 'exercise':
        return <Activity size={20} className="text-wellness-exercise" />;
      case 'sleep':
        return <Moon size={20} className="text-wellness-sleep" />;
      case 'mood':
        return <Smile size={20} className="text-wellness-mood" />;
      default:
        return null;
    }
  };

  // Helper function to get background color by log type
  const getBgColorByType = (type: string) => {
    switch (type) {
      case 'water':
        return 'bg-blue-50';
      case 'exercise':
        return 'bg-green-50';
      case 'sleep':
        return 'bg-purple-50';
      case 'mood':
        return 'bg-amber-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with search and add button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search logs..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="shrink-0">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Dialog open={isAddingLog} onOpenChange={setIsAddingLog}>
            <DialogTrigger asChild>
              <Button>
                <Plus size={16} className="mr-2" />
                Add Log
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Wellness Log</DialogTitle>
                <DialogDescription>
                  Track your daily wellness activities
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="log-type">Log Type</Label>
                  <Select 
                    defaultValue="water"
                    onValueChange={(value) => setNewLog({...newLog, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water">Water Intake</SelectItem>
                      <SelectItem value="exercise">Exercise</SelectItem>
                      <SelectItem value="sleep">Sleep</SelectItem>
                      <SelectItem value="mood">Mood</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {newLog.type === 'mood' ? (
                  <div className="grid gap-2">
                    <Label htmlFor="mood-value">Mood</Label>
                    <Select 
                      defaultValue="Good"
                      onValueChange={(value) => setNewLog({...newLog, value: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select mood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Neutral">Neutral</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <Label>
                      {newLog.type === 'water' ? 'Glasses' : 
                       newLog.type === 'exercise' ? 'Minutes' : 
                       newLog.type === 'sleep' ? 'Hours' : 'Value'}
                    </Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        className="flex-1"
                        defaultValue={[0]} 
                        max={newLog.type === 'water' ? 15 : 
                             newLog.type === 'exercise' ? 120 : 
                             newLog.type === 'sleep' ? 12 : 10}
                        step={newLog.type === 'sleep' ? 0.5 : 1}
                        onValueChange={(value) => setNewLog({...newLog, value: value[0]})}
                      />
                      <span className="w-12 text-center font-medium">
                        {newLog.value} {newLog.type === 'water' ? 'glasses' : 
                                     newLog.type === 'exercise' ? 'min' : 
                                     newLog.type === 'sleep' ? 'hrs' : ''}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Add notes about this log"
                    value={newLog.notes || ''}
                    onChange={(e) => setNewLog({...newLog, notes: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingLog(false)}>Cancel</Button>
                <Button onClick={handleAddLog}>Save Log</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs for filtering by log type */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Logs</TabsTrigger>
          <TabsTrigger value="water">Water</TabsTrigger>
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="mood">Mood</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Wellness Logs</CardTitle>
              <CardDescription>
                View and manage your wellness activities
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {Object.keys(groupedLogs).length > 0 ? (
                Object.entries(groupedLogs)
                  .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
                  .map(([date, logsForDate]) => (
                    <div key={date} className="border-b border-border last:border-0">
                      <div className="px-6 py-3 bg-muted/50">
                        <h3 className="text-sm font-medium">
                          {format(new Date(date), "EEEE, MMMM d, yyyy")}
                        </h3>
                      </div>
                      <div className="divide-y divide-border">
                        {logsForDate.map((log) => (
                          <div 
                            key={log.id} 
                            className={cn(
                              "px-6 py-4 flex justify-between items-center",
                              getBgColorByType(log.type)
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-full bg-white">
                                {getIconByType(log.type)}
                              </div>
                              <div>
                                <p className="font-medium capitalize">{log.type}</p>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm">
                                    {typeof log.value === 'number' ? (
                                      <>
                                        <span className="font-medium">{log.value}</span> {log.unit}
                                      </>
                                    ) : (
                                      log.value
                                    )}
                                  </p>
                                  <span className="text-xs text-muted-foreground">
                                    {format(log.date, "h:mm a")}
                                  </span>
                                </div>
                                {log.notes && (
                                  <p className="text-xs text-muted-foreground mt-1">{log.notes}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDeleteLog(log.id)}
                              >
                                <Trash size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">No logs found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Logs;
