import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { onUpdateSuccess, onUpdateFailure } from 'toasts/toasts';

import { Button, Paragraph } from 'components/shared';
import {
  StyledGalleryWrapper, StyledGalleryInnerWrapper, StyledGalleryHeading, StyledGalleryImage, StyledButtonImage,
} from 'components/Gallery/galleryStyled';
import noImageAvailable from 'assets/images/no-image-available.svg';
import deleteImage from 'assets/images/icons8-cancel.svg';
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
  position: relative;
`;

const StyledPhoto = styled(StyledGalleryImage)`
  margin-top: 1rem;
  border-radius: 1rem;
`;

const StyledDescription = styled(Paragraph)`
  margin: 0 0 1rem 0;
`;

const StyledButtonDetailsItemImage = styled(StyledButtonImage)`
  border-radius: 50%;
  background-size: 140%;
`;

const GalleryDetailsItem = () => {
  const COLLECTION_URL = 'galleries';
  const IMAGE_URLS = 'imageUrls';
  const { gid } = useParams();
  const { pid } = useParams();
  const { fbase } = useContext(AppContext);
  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    let didCancel = false;

    const uploadData = async () => {
      const unsubscribe = await fbase.db
        .doc(`${COLLECTION_URL}/${gid}/${IMAGE_URLS}/${pid}`)
        .onSnapshot((doc) => {
          const photos = doc.data();
          setPhoto(photos);
          return (photos);
        });
      return () => unsubscribe();
    };

    if (!didCancel) {
      uploadData();
    }

    return () => {
      didCancel = true;
    };
  }, [fbase.db, gid, pid]);

  const handleCardDelete = async () => {
    await fbase.storage().ref('images').child(photo?.nameInStorage).delete()
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
      });
  };

  return (
    <StyledWrapper>
      <StyledGalleryInnerWrapper>
        <StyledGalleryHeadingWrapper>
          <StyledGalleryHeading>{photo?.name}</StyledGalleryHeading>
          <StyledButtonDetailsItemImage onClick={handleCardDelete} image={deleteImage} />
        </StyledGalleryHeadingWrapper>
        <StyledPhoto src={photo?.imageUrl || noImageAvailable} alt={photo?.name} />
        <StyledDescription>{photo?.description}</StyledDescription>
        <StyledGalleryElement>
          <Button secondary="true" as={Link} to="../">Add photos</Button>
          <Button secondary="true" as={Link} to="../../">Go to all galleries</Button>
        </StyledGalleryElement>
      </StyledGalleryInnerWrapper>
    </StyledWrapper>
  );
};

export default GalleryDetailsItem;
