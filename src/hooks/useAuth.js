import { useEffect, useState } from 'react';

import fbase from '../firebase';

const useAuth = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    let didCancel = false;

    const authData = async () => {
      const unsubscribe = fbase.auth.onAuthStateChanged((user) => {
        if (user) {
          setAuthUser(user);
        } else {
          setAuthUser(null);
        }
      });
      return () => unsubscribe();
    };
    if (!didCancel) {
      authData();
    }
    return () => {
      didCancel = true;
    };
  }, []);

  return authUser;
};

export default useAuth;
