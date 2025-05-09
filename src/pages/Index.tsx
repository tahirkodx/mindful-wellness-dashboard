
import { 
  IonPage, 
  IonContent, 
  IonButton, 
  IonText, 
  IonRouterLink, 
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/react";

const Index = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: '100vh' }}>
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center">
                    <h1>Wellness Tracker</h1>
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonText>
                    <p>Track your daily wellness habits and improve your health</p>
                  </IonText>
                  <div className="ion-margin-top">
                    <IonRouterLink routerLink="/login">
                      <IonButton expand="block" color="primary">Sign In</IonButton>
                    </IonRouterLink>
                    <IonRouterLink routerLink="/register" className="ion-margin-top">
                      <IonButton expand="block" fill="outline">Create Account</IonButton>
                    </IonRouterLink>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Index;
