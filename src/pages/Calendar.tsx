
import { useState } from "react";
import { format, addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Water, Activity, Moon, Smile } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Types
interface Log {
  id: string;
  type: 'water' | 'exercise' | 'sleep' | 'mood';
  value: number | string;
  date: Date;
}

// Dummy data for calendar events
const dummyLogs: Log[] = Array(50).fill(null).map((_, i) => ({
  id: `log-${i}`,
  type: ['water', 'exercise', 'sleep', 'mood'][Math.floor(Math.random() * 4)] as 'water' | 'exercise' | 'sleep' | 'mood',
  value: Math.floor(Math.random() * 10) + 1,
  date: addDays(new Date(), Math.floor(Math.random() * 30) - 15),
}));

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Navigate to previous and next month
  const prevMonth = () => setCurrentMonth(subDays(currentMonth, 30));
  const nextMonth = () => setCurrentMonth(addDays(currentMonth, 30));
  const today = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };
  
  // Get all days in the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get logs for the selected date
  const logsForSelectedDate = dummyLogs.filter(log => 
    isSameDay(log.date, selectedDate)
  );
  
  // Helper to get icon by log type
  const getIconByType = (type: string) => {
    switch (type) {
      case 'water':
        return <Water size={16} className="text-wellness-water" />;
      case 'exercise':
        return <Activity size={16} className="text-wellness-exercise" />;
      case 'sleep':
        return <Moon size={16} className="text-wellness-sleep" />;
      case 'mood':
        return <Smile size={16} className="text-wellness-mood" />;
      default:
        return null;
    }
  };

  // Helper to get counts of logs by date and type
  const getLogCountsByDate = (date: Date) => {
    const logsForDate = dummyLogs.filter(log => isSameDay(log.date, date));
    const counts = {
      water: 0,
      exercise: 0,
      sleep: 0,
      mood: 0,
    };

    logsForDate.forEach(log => {
      counts[log.type]++;
    });

    return counts;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
          <p className="text-muted-foreground">View your wellness activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={today}>
            Today
          </Button>
          <div className="flex">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Wellness Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Weekday headers */}
            <div className="grid grid-cols-7 text-center font-medium text-sm mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array(calendarDays[0].getDay()).fill(null).map((_, i) => (
                <div key={`empty-start-${i}`} className="h-24 p-1" />
              ))}
              
              {calendarDays.map((day) => {
                const isToday = isSameDay(day, new Date());
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const logCounts = getLogCountsByDate(day);
                const hasLogs = Object.values(logCounts).some(count => count > 0);
                
                return (
                  <div
                    key={day.toString()}
                    className={cn(
                      "h-24 p-1 border rounded-md transition-colors",
                      isCurrentMonth ? "bg-card" : "bg-muted/30 text-muted-foreground",
                      isSelected ? "border-primary" : "border-border",
                      hasLogs ? "hover:border-primary" : "hover:border-muted-foreground",
                      "cursor-pointer"
                    )}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className="flex flex-col h-full">
                      <div className={cn(
                        "flex justify-center items-center w-6 h-6 text-xs font-medium rounded-full mx-auto",
                        isToday ? "bg-primary text-primary-foreground" : ""
                      )}>
                        {format(day, 'd')}
                      </div>
                      
                      {hasLogs && (
                        <div className="mt-1 flex flex-wrap gap-1 justify-center">
                          {logCounts.water > 0 && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-500 border-blue-200">
                              <Water size={10} className="mr-1" /> {logCounts.water}
                            </Badge>
                          )}
                          {logCounts.exercise > 0 && (
                            <Badge variant="outline" className="bg-green-50 text-green-500 border-green-200">
                              <Activity size={10} className="mr-1" /> {logCounts.exercise}
                            </Badge>
                          )}
                          {logCounts.sleep > 0 && (
                            <Badge variant="outline" className="bg-purple-50 text-purple-500 border-purple-200">
                              <Moon size={10} className="mr-1" /> {logCounts.sleep}
                            </Badge>
                          )}
                          {logCounts.mood > 0 && (
                            <Badge variant="outline" className="bg-amber-50 text-amber-500 border-amber-200">
                              <Smile size={10} className="mr-1" /> {logCounts.mood}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {Array(6 - calendarDays[calendarDays.length - 1].getDay()).fill(null).map((_, i) => (
                <div key={`empty-end-${i}`} className="h-24 p-1" />
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Selected day logs */}
        <Card>
          <CardHeader>
            <CardTitle>
              {format(selectedDate, "MMMM d, yyyy")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {logsForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {logsForSelectedDate.map(log => (
                  <div 
                    key={log.id}
                    className="flex items-center p-3 rounded-md border"
                  >
                    <div className="mr-3">
                      {getIconByType(log.type)}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{log.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {typeof log.value === 'number' 
                          ? `${log.value} ${log.type === 'water' ? 'glasses' : log.type === 'exercise' ? 'minutes' : 'hours'}`
                          : log.value}
                      </p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">
                      {format(log.date, "h:mm a")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-muted-foreground">No logs for this day</p>
                <Button variant="outline" className="mt-4">
                  Add New Log
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
