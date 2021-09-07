import "./App.css";
import "./cssmodules/dashboard.css";
import "./cssmodules/createLink.css";
import "./cssmodules/errorPage.css";
import "./cssmodules/nominate.css";
import "./cssmodules/login.css";
import "./cssmodules/nominationList.css";
import "./cssmodules/managenominees.css";
import "./cssmodules/nomineeperson.css";
import "./cssmodules/backers.css";
import "./cssmodules/nominationview.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardOld from "./components/dashboard";
import CreateLink from "./components/createLink";
import Nominate from "./components/nominate";
import NominatePerson from "./components/nominatePerson";
import NominationView from "./components/nominationView";
import Login from "./components/login";
import NominationList from "./components/nominationList";
import ManageNominees from "./components/manageNominees";
import { ProtectedRoute } from "./components/protectedRoute";
import ErrorPage from "./components/errorPage";
import PageNotFound from "./components/pageNotFound";
import Backers from "./components/backers";
import { ThemeProvider } from "@emotion/react";
import theme from "./components/dashboard/theme";
import GlobalStyles from "./components/dashboard/GlobalStyles";
//import * as SessionData from "./components/sessionHandler"

function App() {
  //const sessionData = SessionData.checkValidSession();
  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Switch>
            <ProtectedRoute
              exact
              path='/dashboard'
              component={DashboardLayout}
            />
            <ProtectedRoute
              exact
              path='/dashboardOld'
              component={DashboardOld}
            />

            <ProtectedRoute exact path='/createLink' component={CreateLink} />
            <ProtectedRoute
              exact
              path='/nominationList'
              component={NominationList}
            />
            <ProtectedRoute
              exact
              path='/manageNominees'
              component={ManageNominees}
            />
            <Route exact path='/' component={Login} />
            <Route path='/nominate/:token' component={Nominate} />
            <Route path='/nominatePerson' component={NominatePerson} />
            <Route path='/nominatePerson' component={NominatePerson} />
            <Route path='/nominationView' component={NominationView} />
            <Route path='/backers' component={Backers} />
            <Route path='*' component={PageNotFound} />
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
