import React, { useContext, useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import styled from 'styled-components';

import GalleryDetails from 'components/Gallery/GalleryDetails';
import { Paragraph } from 'components/shared';
import {
  StyledGalleryWrapper, StyledGalleryHeading, StyledGalleryImage,
} from 'components/Gallery/galleryStyled';
import noImageAvailable from 'assets/images/no-image-available.svg';
import AppContext from 'context';

const StyledWrapper = styled(StyledGalleryWrapper)`
  padding: 3rem;
  justify-content: space-between;
`;

const StyledTitle = styled.div`
  height: 90px;
  display: flex;
  justify-content: flex-start;
  padding-left: 1rem;
  border: 1px solid ${({ theme }) => theme.lightGrey};
  box-shadow: 0 3px 10px -3px hsla(0, 0%, 0%, 0.5);
  border-radius: 5px;
  align-items: center;
`;

const StyledItem = styled.div`
  width: 49%;
  padding: 1rem;
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

const GalleryItem = () => {
  const COLLECTION_URL = 'galleries';
  const IMAGE_URLS = 'imageUrls';
  const { gid } = useParams();
  const { fbase } = useContext(AppContext);
  const [info, setInfo] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    let didCancel = false;

    const uploadData = async () => {
      const handleSnapshot = (snapshot) => {
        const photoList = snapshot.docs.map((doc) => ({
          pid: doc.id, ...doc.data(),
        }));
        setGallery(photoList);
      };
      const firstUnsubscribe = await fbase.db.collection(COLLECTION_URL)
        .doc(gid)
        .collection(IMAGE_URLS)
        .onSnapshot(handleSnapshot);
      const secondUnsubscribe = await fbase.db.collection(COLLECTION_URL)
        .doc(gid)
        .onSnapshot((doc) => {
          const galleryInfo = doc.data();
          setInfo(galleryInfo);
        });
      return () => {
        firstUnsubscribe();
        secondUnsubscribe();
      };
    };

    if (!didCancel) {
      uploadData();
    }

    return () => {
      didCancel = true;
    };
  }, [fbase.db, gid]);

  return (
    <StyledWrapper>
      <StyledItem>
        <StyledTitle>
          <StyledPhoto src={info?.imageUrl || noImageAvailable} alt={info?.name} />
          <div>
            <StyledGalleryHeading>{info?.name}</StyledGalleryHeading>
            <Paragraph>{info?.description}</Paragraph>
          </div>
        </StyledTitle>

        <StyledBox>
          {gallery.map((photo) => (
            <div key={photo?.pid}>
              <GalleryDetails {...photo} />
            </div>
          ))}
        </StyledBox>
      </StyledItem>

      <StyledItem>
        <Outlet />
      </StyledItem>
    </StyledWrapper>
  );
};

export default GalleryItem;
