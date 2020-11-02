import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import UploadForm from 'components/shared/UploadForm';
import { Heading } from 'components/shared';
import { StyledGalleryHeading } from 'components/Gallery/galleryStyled';
import AppContext from 'context';

const StyledLogoutInfo = styled(StyledGalleryHeading)`
  font-weight: ${({ theme }) => theme.fontWeight.light};
  font-size: ${({ theme }) => (theme.fontSize.xs)};
`;
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
      {(!user) && (<StyledLogoutInfo>Adding photos is available only after logging in</StyledLogoutInfo>)}
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
