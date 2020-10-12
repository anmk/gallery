import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { toast } from 'react-toastify';

import { routes } from 'routes';
import { theme } from 'theme/mainTheme';
import GlobalStyle from 'theme/GlobalStyle';
import Login from 'components/auth/Login';
import GalleryList from 'components/Gallery/GalleryList';
import GalleryDetailsItem from 'components/Gallery/GalleryDetailsItem';
import GalleryItem from 'components/Gallery/GalleryItem';
import Navbar from 'components/navigation/Navbar';
import useAuth from 'hooks/useAuth';
import ForgotPassword from 'components/auth/ForgotPassword';
import GalleryThumbnail from 'components/Gallery/GalleryThumbnail';
import RedirectTo from 'components/navigation/RedirectTo';
import AppContext from 'context';
import fbase from './firebase';

toast.configure();
const App = () => {
  const user = useAuth();

  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppContext.Provider value={{ user, fbase }}>
            <Navbar />
            <Routes>
              <Route path={routes.main} element={<RedirectTo path={routes.home} />} />
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
          </AppContext.Provider>
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
