import React from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { routes } from 'routes';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/mainTheme';
import Login from 'components/auth/Login';
import GalleryList from 'components/Gallery/GalleryList';
import GalleryDetailsItem from 'components/Gallery/GalleryDetailsItem';
import GalleryItem from 'components/Gallery/GalleryItem';
import Navbar from 'components/navigation/Navbar';
import useAuth from 'hooks/useAuth';
import ForgotPassword from 'components/auth/ForgotPassword';
import fbase, { FirebaseContext } from './firebase';
import GalleryThumbnail from './components/Gallery/GalleryThumbnail';

const App = () => {
  const user = useAuth();

  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <FirebaseContext.Provider value={{ user, fbase }}>
            <Navbar />
            <Routes>
              <Route path={routes.main} element={<Home />} />
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.galleryList}>
                <Route path={routes.main} element={<GalleryList />} />
                <Route path={routes.galleryItem} element={<GalleryItem />}>
                  <Route path={routes.main} element={<GalleryThumbnail />} />
                  <Route path={routes.galleryDetailsItem} element={<GalleryDetailsItem />} />
                </Route>
              </Route>
              <Route path={routes.login} element={<Login />} />
              <Route path={routes.forgot} element={<ForgotPassword />} />
              <Route path={routes.all} element={<NotFound />} />
            </Routes>
          </FirebaseContext.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

const Home = () => (
  <div>
    <h1>Welcome Home!</h1>
  </div>
);

const NotFound = () => (
  <div>
    <h1>Not found!</h1>
    <p>Sorry your page was not found!</p>
  </div>
);

export default App;
