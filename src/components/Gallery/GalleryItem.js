import React, { useContext } from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import GalleryDetails from 'components/Gallery/GalleryDetails';
import { Row, Col, Paragraph } from 'components/shared';
import {
  StyledGalleryWrapper,
  StyledGalleryHeading,
  StyledGalleryImage,
  StyledButtonImage,
  StyledVisible,
  StyledAuthInfo,
} from 'components/Gallery/galleryStyled';
import { onUpdateSuccess, onUpdateFailure, onUpdateInfo } from 'toasts/toasts';
import noImageAvailable from 'assets/images/no-image-available.svg';
import deleteImage from 'assets/images/icons8-cancel.svg';
import eyeImage from 'assets/images/eye.svg';
import eyeOffImage from 'assets/images/eye-off.svg';
import useFirebaseSupplyGalleryData from 'hooks/useFirebaseSupplyGalleryData';
import AppContext from 'context';

const StyledWrapper = styled(StyledGalleryWrapper)`
  padding: 3rem;
  justify-content: space-between;
  min-height: 100rem;
  @media only screen and (max-width: 768px) {
    padding: 0 0 .5rem 0;
  }
`;

const StyledTitle = styled.div`
  height: 90px;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.darkGrey};
  box-shadow: 0 3px 10px -3px hsla(0, 0%, 0%, 0.5);
  border-radius: 1rem;
  align-items: center;
`;

const StyledItem = styled.div`
  width: 96%;
  padding: 1rem;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.5);
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-radius: 10px;
  margin-top: 1rem;
`;

const StyledBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 1rem;
`;

const StyledPhoto = styled(StyledGalleryImage)`
  max-width: 80px;
  max-height: 80px;
`;

const StyledButtonItemImage = styled(StyledButtonImage)`
  border-radius: 50%;
  background-size: 140%;
`;

const StyledTitleText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GalleryItem = () => {
  const COLLECTION_URL = 'galleries';
  const IMAGE_URLS = 'imageUrls';
  const navigate = useNavigate();
  const { gid } = useParams();
  const { fbase, user } = useContext(AppContext);
  const { galleryItemInfo, photos } = useFirebaseSupplyGalleryData(COLLECTION_URL, IMAGE_URLS, gid);
  const galleryOwner = user && user.uid === galleryItemInfo?.userId;
  const galleryGuard = (galleryOwner || (galleryItemInfo?.share === true));

  const handleCardDelete = async () => {
    if (photos.length > 0) {
      onUpdateFailure('This gallery could not be deleted.');
      onUpdateInfo(`There are ${photos.length} photo(s) in this gallery. Remove all images to delete the gallery.`);
    } else {
      await fbase.storage().ref('images').child(galleryItemInfo?.nameInStorage).delete()
        .then(
          onUpdateSuccess('Image has been removed from storage!'),
          await fbase.db.doc(`${COLLECTION_URL}/${gid}`).delete()
            .then(() => onUpdateSuccess('Card data has been removed from the database!'))
            .catch((error) => onUpdateFailure(error.message)),
        )
        .catch((error) => onUpdateFailure(error.message));
      navigate(`/${COLLECTION_URL}`);
    }
  };

  return (
    <StyledWrapper>
      <Row>
        <Col xs="12" sm="6" md="6" lg="6">
          <StyledItem>
            <StyledTitle>
              <StyledPhoto
                src={galleryItemInfo?.imageUrl || noImageAvailable}
                alt={galleryItemInfo?.name}
              />
              <StyledTitleText>
                <StyledGalleryHeading>{galleryItemInfo?.name}</StyledGalleryHeading>
                <Paragraph>{galleryItemInfo?.description}</Paragraph>
                {galleryOwner
                  && (
                    <StyledVisible
                      src={(galleryItemInfo?.share && eyeImage) || eyeOffImage}
                      alt={galleryItemInfo?.name}
                    />
                  )}
              </StyledTitleText>
              <div>
                {galleryOwner
                  && (
                    <StyledButtonItemImage
                      onClick={handleCardDelete}
                      image={deleteImage}
                    />
                  )}
              </div>
            </StyledTitle>

            {galleryGuard && (
            <StyledBox>
              {photos.map((photo) => (
                <div key={photo?.pid}>
                  <GalleryDetails {...photo} />
                </div>
              ))}
            </StyledBox>
            )}
            {!galleryGuard && (
              <StyledAuthInfo>
                You cannot access to photo collection from this gallery or the gallery has been deleted.
              </StyledAuthInfo>
            )}
          </StyledItem>
        </Col>
        <Col xs="12" sm="6" md="6" lg="6">
          <StyledItem>
            <Outlet />
          </StyledItem>
        </Col>
      </Row>
    </StyledWrapper>
  );
};

export default GalleryItem;
