
import { useState, useEffect } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
  IonChip,
  IonIcon,
  IonText,
  IonButton
} from "@ionic/react";
import {
  waterOutline,
  barbellOutline,
  moonOutline,
  happyOutline,
  arrowForward
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

// Types for wellness data
interface WellnessStats {
  water: number;
  exercise: number;
  sleep: number;
  mood: number;
}

interface RecentLog {
  id: string;
  type: "water" | "exercise" | "sleep" | "mood";
  value: number | string;
  date: Date;
}

const Dashboard = () => {
  const history = useHistory();
  const [stats, setStats] = useState<WellnessStats>({
    water: 0,
    exercise: 0,
    sleep: 0,
    mood: 0,
  });
  const [recentLogs, setRecentLogs] = useState<RecentLog[]>([]);

  // Generate dummy data
  useEffect(() => {
    // Sample stats
    setStats({
      water: 0.7, // 70% of daily goal
      exercise: 0.45, // 45% of daily goal
      sleep: 0.85, // 85% of daily goal
      mood: 0.6, // 60% of daily goal
    });

    // Sample recent logs
    const dummyLogs: RecentLog[] = [
      {
        id: "1",
        type: "water",
        value: "8 oz glass",
        date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: "2",
        type: "exercise",
        value: "30 min run",
        date: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      },
      {
        id: "3",
        type: "sleep",
        value: "8 hours",
        date: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      },
      {
        id: "4",
        type: "mood",
        value: "Happy",
        date: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      },
    ];

    setRecentLogs(dummyLogs);
  }, []);

  // Helper function to get icon based on log type
  const getIconByType = (type: string) => {
    switch (type) {
      case "water":
        return waterOutline;
      case "exercise":
        return barbellOutline;
      case "sleep":
        return moonOutline;
      case "mood":
        return happyOutline;
      default:
        return waterOutline;
    }
  };

  // Helper to format date
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
      } else {
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
      }
    }
  };

  const navigateToLogs = () => {
    history.push("/dashboard/logs");
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonText>
            <h1 className="ion-no-margin">Welcome back!</h1>
            <p className="ion-no-margin">Here's your wellness overview</p>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol size="12" sizeMd="6">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Today's Progress</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="ion-margin-bottom">
                <div className="ion-justify-content-between ion-display-flex">
                  <IonText>
                    <h3 className="ion-no-margin">
                      <IonIcon icon={waterOutline} className="ion-color-water" /> Water
                    </h3>
                  </IonText>
                  <IonText>
                    <p className="ion-no-margin">{Math.round(stats.water * 100)}%</p>
                  </IonText>
                </div>
                <IonProgressBar value={stats.water} color="water"></IonProgressBar>
              </div>

              <div className="ion-margin-bottom">
                <div className="ion-justify-content-between ion-display-flex">
                  <IonText>
                    <h3 className="ion-no-margin">
                      <IonIcon icon={barbellOutline} className="ion-color-exercise" /> Exercise
                    </h3>
                  </IonText>
                  <IonText>
                    <p className="ion-no-margin">{Math.round(stats.exercise * 100)}%</p>
                  </IonText>
                </div>
                <IonProgressBar value={stats.exercise} color="exercise"></IonProgressBar>
              </div>

              <div className="ion-margin-bottom">
                <div className="ion-justify-content-between ion-display-flex">
                  <IonText>
                    <h3 className="ion-no-margin">
                      <IonIcon icon={moonOutline} className="ion-color-sleep" /> Sleep
                    </h3>
                  </IonText>
                  <IonText>
                    <p className="ion-no-margin">{Math.round(stats.sleep * 100)}%</p>
                  </IonText>
                </div>
                <IonProgressBar value={stats.sleep} color="sleep"></IonProgressBar>
              </div>

              <div>
                <div className="ion-justify-content-between ion-display-flex">
                  <IonText>
                    <h3 className="ion-no-margin">
                      <IonIcon icon={happyOutline} className="ion-color-mood" /> Mood
                    </h3>
                  </IonText>
                  <IonText>
                    <p className="ion-no-margin">{Math.round(stats.mood * 100)}%</p>
                  </IonText>
                </div>
                <IonProgressBar value={stats.mood} color="mood"></IonProgressBar>
              </div>
            </IonCardContent>
          </IonCard>
        </IonCol>

        <IonCol size="12" sizeMd="6">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Recent Activity</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {recentLogs.length > 0 ? (
                recentLogs.map((log) => (
                  <div key={log.id} className="ion-padding-vertical">
                    <div className="ion-justify-content-between ion-display-flex ion-align-items-center">
                      <div className="ion-align-items-center ion-display-flex">
                        <IonChip color={log.type as "water" | "exercise" | "sleep" | "mood"}>
                          <IonIcon icon={getIconByType(log.type)} />
                        </IonChip>
                        <span className="ion-padding-start">{log.value}</span>
                      </div>
                      <IonText color="medium">
                        <small>{formatDate(log.date)}</small>
                      </IonText>
                    </div>
                  </div>
                ))
              ) : (
                <div className="ion-text-center ion-padding">
                  <IonText color="medium">No recent activity</IonText>
                </div>
              )}

              <div className="ion-text-end ion-padding-top">
                <IonButton fill="clear" onClick={navigateToLogs}>
                  View All
                  <IonIcon slot="end" icon={arrowForward}></IonIcon>
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Dashboard;
