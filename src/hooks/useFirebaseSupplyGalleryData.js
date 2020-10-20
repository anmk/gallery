import { useState, useEffect, useContext } from 'react';

import AppContext from 'context';

function useFirebaseSupplyGalleryData(COLLECTION_URL, IMAGE_URLS, gid, pid) {
  const [galleryItemInfo, setGalleryItemInfo] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [photoDetails, setPhotoDetails] = useState([]);
  const [isShare, setShare] = useState(false);
  const { fbase } = useContext(AppContext);

  const handlePhotoList = (snapshot) => {
    const photoList = snapshot.docs.map((doc) => ({
      pid: doc.id, ...doc.data(),
    }));
    setPhotos(photoList);
  };

  useEffect(() => {
    let didCancel = false;

    const supplyData = async () => {
      const photoCollectionUnsubscribe = await fbase.db
        .collection(COLLECTION_URL)
        .doc(gid)
        .collection(IMAGE_URLS)
        .onSnapshot(handlePhotoList);
        // For components: GalleryItem, GalleryThumbnail, PhotoDetailsItem - only isShare
      const galleryDataUnsubscribe = await fbase.db
        .collection(COLLECTION_URL)
        .doc(gid)
        .onSnapshot((doc) => {
          const galleryData = doc.data();
          setGalleryItemInfo(galleryData);
          setGallery(galleryData);
          setShare(galleryData.share);
        });
      const photoDetailsItemUnsubscribe = await fbase.db
        .doc(`${COLLECTION_URL}/${gid}/${IMAGE_URLS}/${pid}`)
        .onSnapshot((doc) => {
          const photo = doc.data();
          setPhotoDetails(photo);
        });
      return () => {
        photoCollectionUnsubscribe();
        galleryDataUnsubscribe();
        photoDetailsItemUnsubscribe();
      };
    };

    if (!didCancel) {
      supplyData();
    }

    return () => {
      didCancel = true;
    };
  }, [COLLECTION_URL, IMAGE_URLS, fbase.db, gid, pid]);

  return {
    gallery,
    galleryItemInfo,
    photos,
    photoDetails,
    isShare,
  };
}

export default useFirebaseSupplyGalleryData;
