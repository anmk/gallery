import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Paragraph } from 'components/shared';
import {
  StyledGalleryWrapper, StyledGalleryInnerWrapper, StyledGalleryHeading, StyledGalleryImage,
} from 'components/Gallery/galleryStyled';
import noImageAvailable from 'assets/images/no-image-available.svg';
import FirebaseContext from '../../firebase/context';

const StyledWrapper = styled(StyledGalleryWrapper)`
  flex-flow: row wrap;
  justify-content: center;
  border: 0;
  margin: 15px;
  margin: 0 auto;
`;

const StyledPhoto = styled(StyledGalleryImage)`
  margin-top: 1rem;
  border-radius: 10px;
`;

const StyledDescription = styled(Paragraph)`
  margin: 0 0 1rem 0;
`;

const Photo = () => {
  const COLLECTION_URL = 'galleries';
  const IMAGE_URLS = 'imageUrls';
  const { gid } = useParams();
  const { pid } = useParams();
  const { firebase } = useContext(FirebaseContext);
  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    firebase.db
      .doc(`${COLLECTION_URL}/${gid}/${IMAGE_URLS}/${pid}`)
      .onSnapshot((doc) => {
        const photos = doc.data();
        setPhoto(photos);
        return (photos);
      });
  }, [firebase.db, gid, pid]);

  return (
    <StyledWrapper>
      <StyledGalleryInnerWrapper>
        <StyledGalleryHeading>Photo: {photo.name}</StyledGalleryHeading>
        <StyledPhoto src={photo.imageUrl || noImageAvailable} alt={photo.name} />
        <StyledDescription>{photo.description}</StyledDescription>
        <Button secondary="true" as={Link} to="../">See gallery</Button>
      </StyledGalleryInnerWrapper>
    </StyledWrapper>
  );
};

export default Photo;
