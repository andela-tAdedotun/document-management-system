import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import LandingPage from './components/landing/LandingPage';
import SignupPage from './components/signup/SignupPage';
import Homepage from './components/home/Homepage';
import requiresAuthentication from './utilities/RequiresAuthentication';
import alreadyAuthenticated from './utilities/AlreadyAuthenticated';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={alreadyAuthenticated(LandingPage)} />
    <Route path="signup" component={SignupPage} />
    <Route path="documents" component={requiresAuthentication(Homepage)} />
  </Route>
);
