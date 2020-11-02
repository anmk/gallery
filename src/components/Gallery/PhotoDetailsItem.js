import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { onUpdateSuccess, onUpdateFailure } from 'toasts/toasts';

import { Button, Paragraph } from 'components/shared';
import {
  StyledGalleryWrapper,
  StyledGalleryInnerWrapper,
  StyledGalleryHeading,
  StyledGalleryImage,
  StyledButtonImage,
  StyledVisible,
} from 'components/Gallery/galleryStyled';
import noImageAvailable from 'assets/images/no-image-available.svg';
import deleteImage from 'assets/images/icons8-cancel.svg';
import eyeImage from 'assets/images/eye.svg';
import eyeOffImage from 'assets/images/eye-off.svg';
import useFirebaseSupplyGalleryData from 'hooks/useFirebaseSupplyGalleryData';
import AppContext from 'context';

const StyledWrapper = styled(StyledGalleryWrapper)`
  flex-flow: row wrap;
  justify-content: center;
  border: 0;
  margin: 1.5rem;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.darkGrey};
`;

const StyledGalleryHeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledGalleryElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledPhoto = styled(StyledGalleryImage)`
  margin-top: 1rem;
  border-radius: 1rem;
  max-width: 100%;
  height: auto;
`;

const StyledDescription = styled(Paragraph)`
  margin: 1rem 0;
`;

const StyledVisibleDescription = styled(Paragraph)`
  display: flex;
  align-items: center;
`;

const StyledButtonDetailsItemImage = styled(StyledButtonImage)`
  border-radius: 50%;
  background-size: 140%;
`;

export const StyledGalleryPhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PhotoDetailsItem = () => {
  const COLLECTION_URL = 'galleries';
  const IMAGE_URLS = 'imageUrls';
  const { gid } = useParams();
  const { pid } = useParams();
  const { fbase, user } = useContext(AppContext);
  const { photoDetails, isShare } = useFirebaseSupplyGalleryData(COLLECTION_URL, IMAGE_URLS, gid, pid);

  const handlePhotoDelete = async () => {
    !photoDetails && onUpdateFailure('The photo has already been deleted.');
    photoDetails && (
      await fbase.storage().ref('images').child(photoDetails?.nameInStorage).delete()
        .then(
          onUpdateSuccess('Image has been removed from storage!'),
          await fbase.db.doc(`${COLLECTION_URL}/${gid}/${IMAGE_URLS}/${pid}`).delete()
            .then(() => {
              onUpdateSuccess('Image data has been removed from the database!');
            })
            .catch((error) => {
              onUpdateFailure(error.message);
            }),
        )
        .catch((error) => {
          onUpdateFailure(error.message);
        })
    );
  };

  return (
    <StyledWrapper>
      <StyledGalleryInnerWrapper>
        <StyledGalleryHeadingWrapper>
          <StyledGalleryHeading>{photoDetails?.name}</StyledGalleryHeading>
          {(user && user.uid === photoDetails?.userId)
          && (<StyledButtonDetailsItemImage onClick={handlePhotoDelete} image={deleteImage} />
          )}
        </StyledGalleryHeadingWrapper>
        <StyledGalleryPhotoWrapper>
          <StyledPhoto src={photoDetails?.imageUrl || noImageAvailable} alt={photoDetails?.name} />
        </StyledGalleryPhotoWrapper>
        <StyledDescription>{photoDetails?.description || '\u00A0'}</StyledDescription>
        <StyledGalleryElement>
          {(user && user.uid === photoDetails?.userId)
          && (<Button secondary="true" as={Link} to="../">Add photos</Button>
          )}
          {!user
          && (<Button secondary="true" as={Link} to="../">Don&apos;t look at the photo</Button>
          )}
          {(user && user.uid === photoDetails?.userId)
          && (
          <StyledVisible
            src={(photoDetails?.share && eyeImage) || eyeOffImage}
            alt={photoDetails?.name}
          />
          )}
          {(user && user.uid === photoDetails?.userId) && !isShare && photoDetails?.share
          && (<StyledVisibleDescription>It would be, but since the invisible gallery is:</StyledVisibleDescription>
          )}
          {(user && user.uid === photoDetails?.userId) && !isShare && photoDetails?.share
          && (
          <StyledVisible
            src={(isShare && photoDetails?.share && eyeImage) || eyeOffImage}
            alt={photoDetails?.name}
          />
          )}
          <Button secondary="true" as={Link} to="../../">Go to all galleries</Button>
        </StyledGalleryElement>
      </StyledGalleryInnerWrapper>
    </StyledWrapper>
  );
};

export default PhotoDetailsItem;
