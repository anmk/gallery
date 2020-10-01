import React, { useContext, useEffect, useState } from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import GalleryDetails from 'components/Gallery/GalleryDetails';
import { Paragraph } from 'components/shared';
import {
  StyledGalleryWrapper, StyledGalleryHeading, StyledGalleryImage, StyledButtonImage,
} from 'components/Gallery/galleryStyled';
import noImageAvailable from 'assets/images/no-image-available.svg';
import deleteImage from 'assets/images/icons8-cancel.svg';
import AppContext from 'context';

const StyledWrapper = styled(StyledGalleryWrapper)`
  padding: 3rem;
  justify-content: space-between;
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
  width: 49%;
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
  const { gid } = useParams();
  const navigate = useNavigate();
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

  const handleCardDelete = async () => {
    // console.log('Gallery: ', gallery.length);
    // console.log('nameInStorage: ', info?.nameInStorage);
    // console.log('name: ', info?.name);
    if (gallery.length > 0) {
      console.log('Remove photos from Gallery: ', gallery.length);
    } else {
      await fbase.storage().ref('images').child(info?.nameInStorage).delete()
        .then(
          console.log('Card has been deleted from storage!', ''),
          await fbase.db.doc(`${COLLECTION_URL}/${gid}`).delete()
            .then(() => console.log('Card data from db has been deleted!', ''))
            .catch((error) => console.log(error.message, '')),
        )
        .catch((error) => console.log(error.message, ''));
      navigate(`/${COLLECTION_URL}`);
    }
  };

  return (
    <StyledWrapper>
      <StyledItem>
        <StyledTitle>
          <StyledPhoto src={info?.imageUrl || noImageAvailable} alt={info?.name} />
          <StyledTitleText>
            <StyledGalleryHeading>{info?.name}</StyledGalleryHeading>
            <Paragraph>{info?.description}</Paragraph>
          </StyledTitleText>
          <StyledButtonItemImage onClick={handleCardDelete} image={deleteImage} />
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
