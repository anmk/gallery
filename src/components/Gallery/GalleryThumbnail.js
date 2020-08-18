import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Paragraph } from 'components/shared';
import {
  StyledGalleryWrapper, StyledGalleryInnerWrapper, StyledGalleryHeading, StyledGalleryImage,
} from 'components/Gallery/galleryStyled';
import noImageAvailable from 'assets/images/no-image-available.svg';
import FirebaseContext from '../../firebase/context';


const StyledWrapper = styled(StyledGalleryWrapper)`
  flex-flow: row wrap;
  justify-content: center;
  margin: 15px;
`;

const StyledPhoto = styled(StyledGalleryImage)`
  margin-top: 1rem;
  border-radius: 10px;
`;

const GalleryThumbnail = () => {
  const COLLECTION_URL = 'galleries';
  const { gid } = useParams();
  const { firebase } = useContext(FirebaseContext);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    firebase.db.doc(`${COLLECTION_URL}/${gid}`).onSnapshot((doc) => {
      const galleryInfo = doc.data();
      setGallery(galleryInfo);
    });
  }, [firebase.db, gid]);

  return (
    <StyledWrapper>
      <StyledGalleryInnerWrapper>
        <StyledGalleryHeading>Gallery: {gallery.name}</StyledGalleryHeading>
        <StyledPhoto src={gallery.imageUrl || noImageAvailable} alt={gallery.name} />
        <Paragraph>{gallery.description}</Paragraph>
      </StyledGalleryInnerWrapper>
    </StyledWrapper>
  );
};

export default GalleryThumbnail;
