import React from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { routes } from 'routes';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/mainTheme';
import Login from 'components/auth/Login';
import GalleryList from 'components/Gallery/GalleryList';
import GalleryCard from 'components/Gallery/GalleryCard';
import Navbar from 'components/navigation/Navbar';
import useAuth from 'components/auth/useAuth';
import ForgotPassword from 'components/auth/ForgotPassword';
import firebase, { FirebaseContext } from './firebase';

const App = () => {
  const user = useAuth();
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <FirebaseContext.Provider value={{ user, firebase }}>
            <Navbar />
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route exact path={routes.forgot} component={ForgotPassword} />
              <Route path={routes.galleryList} component={GalleryList} />
              <Route path={routes.galleryCard} component={GalleryCard} />
              <Route exact path={routes.login} component={Login} />
            </Switch>
          </FirebaseContext.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
