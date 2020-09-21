import React from 'react';
import { useParams } from 'react-router-dom';

import UploadForm from 'components/shared/UploadForm';
import { Heading } from 'components/shared';

const GalleryPhotoLocation = () => {
  const COLLECTION_URL = 'galleries';
  const IMAGE_URLS = 'imageUrls';
  const { gid } = useParams();

  const handleLocation = () => {
    const dbLocation = `/${COLLECTION_URL}/${gid}/${IMAGE_URLS}`;
    return dbLocation;
  };

  return (
    <>
      <Heading>Add new photo</Heading>
      <UploadForm photoLocation={handleLocation} />
    </>
  );
};

export default GalleryPhotoLocation;
