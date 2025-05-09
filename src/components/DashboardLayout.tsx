
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenu,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonButtons,
  IonMenuButton,
  IonPage,
  IonFooter,
  IonRouterOutlet,
  IonButton,
  IonMenuToggle
} from "@ionic/react";
import {
  homeOutline,
  homeSharp,
  calendarOutline,
  calendarSharp,
  documentTextOutline,
  documentTextSharp,
  logOutOutline,
  logOutSharp,
  personCircleOutline,
  personCircleSharp,
} from "ionicons/icons";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(location.pathname);

  const handleNavigate = (path: string) => {
    setSelectedTab(path);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Wellness Tracker</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle autoHide={false}>
              <IonItem 
                button 
                lines="none" 
                detail={false}
                onClick={() => handleNavigate("/dashboard")}
                color={selectedTab === "/dashboard" ? "primary" : ""}
              >
                <IonIcon 
                  slot="start" 
                  ios={homeOutline} 
                  md={homeSharp}
                />
                <IonLabel>Dashboard</IonLabel>
              </IonItem>
              <IonItem 
                button 
                lines="none" 
                detail={false}
                onClick={() => handleNavigate("/dashboard/logs")}
                color={selectedTab === "/dashboard/logs" ? "primary" : ""}
              >
                <IonIcon 
                  slot="start" 
                  ios={documentTextOutline} 
                  md={documentTextSharp}
                />
                <IonLabel>Logs</IonLabel>
              </IonItem>
              <IonItem 
                button 
                lines="none" 
                detail={false}
                onClick={() => handleNavigate("/dashboard/calendar")}
                color={selectedTab === "/dashboard/calendar" ? "primary" : ""}
              >
                <IonIcon 
                  slot="start" 
                  ios={calendarOutline} 
                  md={calendarSharp}
                />
                <IonLabel>Calendar</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
        <IonFooter>
          <IonList>
            <IonMenuToggle autoHide={false}>
              <IonItem button lines="none" detail={false} onClick={handleLogout}>
                <IonIcon slot="start" ios={logOutOutline} md={logOutSharp} />
                <IonLabel>Logout</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonFooter>
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Wellness Tracker</IonTitle>
            <IonButtons slot="end">
              <IonButton>
                <IonIcon slot="icon-only" ios={personCircleOutline} md={personCircleSharp} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {children}
        </IonContent>
      </IonPage>
    </>
  );
};

export default DashboardLayout;
