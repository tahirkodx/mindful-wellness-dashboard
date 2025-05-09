
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { 
  IonPage, 
  IonContent, 
  IonButton, 
  IonInput, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonText, 
  IonRouterLink,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonToast
} from "@ionic/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      // Mocked successful login for demo
      localStorage.setItem("isLoggedIn", "true");
      setToastMessage("Login successful! Redirecting you to your dashboard.");
      setShowToast(true);
      
      // Use React Router for navigation
      setTimeout(() => {
        history.push("/dashboard");
      }, 1000);
    }, 1500);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: '100vh' }}>
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <div className="ion-text-center ion-margin-bottom">
                <IonText>
                  <h1 className="ion-color-primary">Wellness Tracker</h1>
                </IonText>
                <IonText color="medium">
                  <p>Track your daily wellness habits</p>
                </IonText>
              </div>
              
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Sign In</IonCardTitle>
                  <IonText color="medium">
                    <p>Enter your credentials to access your account</p>
                  </IonText>
                </IonCardHeader>
                <IonCardContent>
                  <form onSubmit={handleSubmit}>
                    <IonItem className="ion-margin-bottom">
                      <IonLabel position="floating">Email</IonLabel>
                      <IonInput
                        type="email"
                        value={email}
                        onIonChange={(e) => setEmail(e.detail.value || "")}
                        required
                      ></IonInput>
                    </IonItem>
                    
                    <IonItem className="ion-margin-bottom">
                      <IonLabel position="floating">Password</IonLabel>
                      <IonInput
                        type="password"
                        value={password}
                        onIonChange={(e) => setPassword(e.detail.value || "")}
                        required
                      ></IonInput>
                    </IonItem>
                    
                    <div className="ion-text-right ion-margin-bottom">
                      <IonRouterLink routerLink="/forgot-password" color="primary">
                        Forgot Password?
                      </IonRouterLink>
                    </div>
                    
                    <IonButton 
                      expand="block" 
                      type="submit" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </IonButton>
                    
                    <div className="ion-text-center ion-margin-top">
                      <IonText color="medium">
                        Don't have an account?{" "}
                        <IonRouterLink routerLink="/register" color="primary">
                          Create an account
                        </IonRouterLink>
                      </IonText>
                    </div>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        position="bottom"
      />
    </IonPage>
  );
};

export default Login;
