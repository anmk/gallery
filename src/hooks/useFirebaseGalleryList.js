import { useState, useEffect, useContext } from 'react';

import AppContext from 'context';

function useFirebaseGallerySnapshot(COLLECTION_URL) {
  const [galleries, setGalleries] = useState([]);
  const { fbase } = useContext(AppContext);

  const handleGalleryList = (snapshot) => {
    const galleryList = snapshot.docs.map((doc) => ({
      gid: doc.id, ...doc.data(),
    }));
    setGalleries(galleryList);
  };

  useEffect(() => {
    let didCancel = false;

    const handleGalleryCollection = async () => {
      const galleryCollectionUnsubscribe = await fbase.db
        .collection(COLLECTION_URL)
        .onSnapshot(handleGalleryList);
      return () => galleryCollectionUnsubscribe();
    };

    if (!didCancel) {
      handleGalleryCollection();
    }

    return () => {
      didCancel = true;
    };
  }, [COLLECTION_URL, fbase.db]);

  return {
    galleries,
  };
}

export default useFirebaseGallerySnapshot;
