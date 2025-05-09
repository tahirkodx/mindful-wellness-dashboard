
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Import pages
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Logs from './pages/Logs';

/* Core CSS required for Ionic components */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import DashboardLayout from './components/DashboardLayout';

setupIonicReact();

const App: React.FC = () => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Index} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/dashboard">
            {isAuthenticated ? (
              <DashboardLayout>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/dashboard/logs" component={Logs} />
                <Route exact path="/dashboard/calendar" component={Calendar} />
              </DashboardLayout>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
