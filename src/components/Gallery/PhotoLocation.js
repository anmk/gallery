import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import UploadForm from 'components/shared/UploadForm';
import { Heading } from 'components/shared';
import AppContext from 'context';

const PhotoLocation = () => {
  const COLLECTION_URL = 'galleries';
  const IMAGE_URLS = 'imageUrls';
  const { gid } = useParams();
  const { user } = useContext(AppContext);

  const handleLocation = () => {
    const dbLocation = `/${COLLECTION_URL}/${gid}/${IMAGE_URLS}`;
    return dbLocation;
  };

  return (
    <>
      {user && (
        <>
          <Heading>Add new photo</Heading>
          <UploadForm photoLocation={handleLocation} />
        </>
      )}
    </>
  );
};

export default PhotoLocation;
