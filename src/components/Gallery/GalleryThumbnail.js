import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

import PhotoLocation from 'components/Gallery/PhotoLocation';
import { Paragraph, Button } from 'components/shared';
import {
  StyledGalleryWrapper, StyledGalleryInnerWrapper, StyledGalleryHeading, StyledGalleryImage,
} from 'components/Gallery/galleryStyled';
import noImageAvailable from 'assets/images/no-image-available.svg';
import useFirebaseSupplyGalleryData from 'hooks/useFirebaseSupplyGalleryData';

const StyledThumbnailWrapper = styled(StyledGalleryWrapper)`
  flex-direction: column;
`;

export const StyledInnerThumbnailWrapper = styled(StyledGalleryInnerWrapper)`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const StyledThumbnailElement = styled.div`
  display: flex;
  justify-content: start;
  padding: 1rem;
  margin-left: 2rem;
`;

const StyledUploadContainer = styled.div`
  position: absolute;
  top: 3rem;
`;

const StyledPhoto = styled(StyledGalleryImage)`
  width: 100%;
  margin-top: 1rem;
  border-radius: 1rem;
  opacity: 0.2;
`;

const GalleryThumbnail = () => {
  const COLLECTION_URL = 'galleries';
  const IMAGE_URLS = 'imageUrls';
  const { gid } = useParams();
  const { gallery } = useFirebaseSupplyGalleryData(COLLECTION_URL, IMAGE_URLS, gid);

  return (
    <StyledThumbnailWrapper>
      <StyledThumbnailElement>
        <StyledGalleryHeading>Gallery: {gallery?.name}</StyledGalleryHeading>
      </StyledThumbnailElement>
      <StyledInnerThumbnailWrapper>
        <StyledPhoto src={gallery?.imageUrl || noImageAvailable} alt={gallery?.name} />
        <StyledUploadContainer>
          <PhotoLocation />
        </StyledUploadContainer>
      </StyledInnerThumbnailWrapper>
      <StyledThumbnailElement>
        <Paragraph>{gallery?.description}</Paragraph>
      </StyledThumbnailElement>
      <StyledThumbnailElement>
        <Button secondary="true" as={Link} to="../">Go to all galleries</Button>
      </StyledThumbnailElement>
    </StyledThumbnailWrapper>
  );
};

export default GalleryThumbnail;
