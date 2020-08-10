import React from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/mainTheme';
import Login from 'components/auth/Login';
import GalleryList from 'components/Gallery/GalleryList';
import GalleryPhoto from 'components/Gallery/GalleryPhoto';
import GalleryItem from 'components/Gallery/GalleryItem';
import Navbar from 'components/navigation/Navbar';
import useAuth from 'components/auth/useAuth';
import ForgotPassword from 'components/auth/ForgotPassword';
import firebase, { FirebaseContext } from './firebase';
import GalleryThumbnail from './components/Gallery/GalleryThumbnail';

const App = () => {
  const user = useAuth();

  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <FirebaseContext.Provider value={{ user, firebase }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="galleries">
                <Route path="/" element={<GalleryList />} />
                <Route path=":gid" element={<GalleryItem />}>
                  <Route path="/" element={<GalleryThumbnail />} />
                  <Route path=":pid" element={<GalleryPhoto />} />
                </Route>
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="forgot" element={<ForgotPassword />} />
              <Route path="*" element={<NotFound />} />
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
