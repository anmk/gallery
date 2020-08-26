import { useEffect, useState } from 'react';

import fbase from '../firebase';


const useAuth = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = fbase.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return authUser;
};

export default useAuth;
