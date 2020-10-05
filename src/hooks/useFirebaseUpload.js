import { useState, useEffect, useContext } from 'react';

import { onUpdateSuccess, onUpdateFailure } from 'toasts/toasts';
import AppContext from 'context';

function useFirebaseUpload(photoLocation) {
  const [isDbData, setDbData] = useState({});
  const [isReadyToSend, setReadyToSend] = useState(false);
  const { fbase } = useContext(AppContext);

  useEffect(() => {
    let didCancel = false;

    async function uploadDbData() {
      const unsubscribe = await fbase.db.collection(photoLocation).add(isDbData)
        .then(onUpdateSuccess('Data has been saved in the database!'))
        .catch((error) => onUpdateFailure(error.message));
      return () => unsubscribe();
    }

    if (!didCancel) {
      if (isReadyToSend && isDbData) {
        uploadDbData();
      }
    }

    return () => {
      didCancel = true;
    };
  }, [isDbData, fbase.db, photoLocation, isReadyToSend]);

  return {
    setDbData,
    setReadyToSend,
  };
}

export default useFirebaseUpload;
