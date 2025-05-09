import { useState } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Droplets, 
  Activity, 
  Moon, 
  Smile, 
  Plus,
  ArrowUp,
  ArrowDown,
  CalendarPlus
} from "lucide-react";

// Dummy data for charts
const weeklyData = [
  { day: "Mon", water: 8, exercise: 30, sleep: 7, mood: 4 },
  { day: "Tue", water: 6, exercise: 45, sleep: 6.5, mood: 3 },
  { day: "Wed", water: 9, exercise: 20, sleep: 8, mood: 5 },
  { day: "Thu", water: 7, exercise: 60, sleep: 7.5, mood: 4 },
  { day: "Fri", water: 8, exercise: 30, sleep: 6, mood: 3 },
  { day: "Sat", water: 10, exercise: 15, sleep: 9, mood: 5 },
  { day: "Sun", water: 7, exercise: 40, sleep: 8, mood: 4 },
];

const moodData = [
  { name: "Excellent", value: 5, color: "#4CAF50" },
  { name: "Good", value: 8, color: "#8BC34A" },
  { name: "Neutral", value: 4, color: "#FFC107" },
  { name: "Fair", value: 2, color: "#FF9800" },
  { name: "Poor", value: 1, color: "#F44336" },
];

const Dashboard = () => {
  const [currentDate] = useState<Date>(new Date());

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Today's metrics
  const todayMetrics = {
    water: 5,
    exercise: 20,
    sleep: 7.5,
    mood: "Good"
  };

  // Format data for activity pie chart
  const activityDistribution = [
    { name: "Water", value: 30, color: "#4FC3F7" },
    { name: "Exercise", value: 25, color: "#66BB6A" },
    { name: "Sleep", value: 35, color: "#9575CD" },
    { name: "Mood", value: 10, color: "#FFB74D" },
  ];

  return (
    <div className="space-y-6">
      {/* Date and quick actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{formatDate(currentDate)}</h2>
          <p className="text-muted-foreground">Track your wellness journey</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <CalendarPlus size={16} className="mr-1" />
            View Calendar
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-1" />
            Add Log
          </Button>
        </div>
      </div>

      {/* Metrics summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="wellness-card">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Water Intake</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{todayMetrics.water}</h3>
                  <span className="ml-1 text-sm text-muted-foreground">glasses</span>
                </div>
                <div className="flex items-center mt-1 text-xs">
                  <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">12%</span>
                  <span className="text-muted-foreground ml-1">from yesterday</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-wellness-water bg-opacity-20 flex items-center justify-center">
                <Droplets className="h-6 w-6 text-wellness-water" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="wellness-card">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Exercise</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{todayMetrics.exercise}</h3>
                  <span className="ml-1 text-sm text-muted-foreground">mins</span>
                </div>
                <div className="flex items-center mt-1 text-xs">
                  <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-red-500 font-medium">8%</span>
                  <span className="text-muted-foreground ml-1">from yesterday</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-wellness-exercise bg-opacity-20 flex items-center justify-center">
                <Activity className="h-6 w-6 text-wellness-exercise" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="wellness-card">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sleep</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{todayMetrics.sleep}</h3>
                  <span className="ml-1 text-sm text-muted-foreground">hours</span>
                </div>
                <div className="flex items-center mt-1 text-xs">
                  <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">5%</span>
                  <span className="text-muted-foreground ml-1">from yesterday</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-wellness-sleep bg-opacity-20 flex items-center justify-center">
                <Moon className="h-6 w-6 text-wellness-sleep" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="wellness-card">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mood</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{todayMetrics.mood}</h3>
                </div>
                <div className="flex items-center mt-1 text-xs">
                  <span className="text-muted-foreground">Today's mood</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-wellness-mood bg-opacity-20 flex items-center justify-center">
                <Smile className="h-6 w-6 text-wellness-mood" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly trends chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Trends</CardTitle>
            <CardDescription>Your wellness activity over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="water" stackId="1" stroke="#4FC3F7" fill="#4FC3F7" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="exercise" stackId="2" stroke="#66BB6A" fill="#66BB6A" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="sleep" stackId="3" stroke="#9575CD" fill="#9575CD" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Mood distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Mood Distribution</CardTitle>
            <CardDescription>Your mood patterns over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {moodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity bar chart */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Comparison</CardTitle>
            <CardDescription>Compare your daily activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="water" name="Water (glasses)" fill="#4FC3F7" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="exercise" name="Exercise (mins)" fill="#66BB6A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sleep" name="Sleep (hours)" fill="#9575CD" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Distribution</CardTitle>
            <CardDescription>How you spend your wellness time</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {activityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
