import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

import GalleryPhotoUpload from 'components/Gallery/GalleryPhotoUpload';
import { Paragraph, Button } from 'components/shared';
import {
  StyledGalleryWrapper, StyledGalleryInnerWrapper, StyledGalleryHeading, StyledGalleryImage,
} from 'components/Gallery/galleryStyled';
import noImageAvailable from 'assets/images/no-image-available.svg';
import FirebaseContext from '../../firebase/context';


const StyledThumbnailWrapper = styled(StyledGalleryWrapper)`
  flex-direction: column;
  margin: 1.5rem;
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
  top: 30px;
`;

const StyledPhoto = styled(StyledGalleryImage)`
  width: 100%;
  margin-top: 1rem;
  border-radius: 1rem;
  opacity: 0.2;
`;

const GalleryThumbnail = () => {
  const COLLECTION_URL = 'galleries';
  const { gid } = useParams();
  const { fbase } = useContext(FirebaseContext);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fbase.db.doc(`${COLLECTION_URL}/${gid}`).onSnapshot((doc) => {
      const galleryInfo = doc.data();
      setGallery(galleryInfo);
    });
  }, [fbase.db, gid]);

  return (
    <StyledThumbnailWrapper>
      <StyledThumbnailElement>
        <StyledGalleryHeading>Gallery: {gallery?.name}</StyledGalleryHeading>
      </StyledThumbnailElement>
      <StyledInnerThumbnailWrapper>
        <StyledPhoto src={gallery?.imageUrl || noImageAvailable} alt={gallery?.name} />
        <StyledUploadContainer>
          <GalleryPhotoUpload />
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
