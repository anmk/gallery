import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import GalleryCard from 'components/Gallery/GalleryCard';
import FirebaseContext from '../../firebase/context';

const StyledWrapper = styled.div`
  padding: 3rem;
`;

const StyledGrid = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledPageHeader = styled.div`
  margin: 25px 0 50px 0;
`;

const GalleryList = () => {
  const GALLERIES_URL = 'galleries';
  const { firebase } = useContext(FirebaseContext);
  const [galleries, setGalleries] = useState([]);

  const handleSnapshot = (snapshot) => {
    const galleryList = snapshot.docs.map((doc) => ({
      id: doc.id, ...doc.data(),
    }));
    console.log(galleryList);
    setGalleries(galleryList);
  };

  useEffect(() => {
    firebase.db.collection(GALLERIES_URL).onSnapshot(handleSnapshot);
  }, [firebase.db]);

  return (
    <>
      <StyledWrapper>
        <StyledPageHeader>Gallery List</StyledPageHeader>
        <StyledGrid>
          {galleries.map((gallery) => (
            <div key={gallery.id}>
              <GalleryCard {...gallery} />
            </div>
          ))}
        </StyledGrid>
      </StyledWrapper>
    </>
  );
};

export default GalleryList;
