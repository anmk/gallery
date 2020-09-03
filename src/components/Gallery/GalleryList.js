import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { StyledGalleryWrapper } from 'components/Gallery/galleryStyled';
import GalleryCard from 'components/Gallery/GalleryCard';
import FirebaseContext from '../../firebase/context';

const StyledWrapper = styled(StyledGalleryWrapper)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 3rem;
`;

const GalleryList = () => {
  const GALLERIES_URL = 'galleries';
  const { fbase } = useContext(FirebaseContext);
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const handleSnapshot = (snapshot) => {
      const galleryList = snapshot.docs.map((doc) => ({
        gid: doc.id, ...doc.data(),
      }));
      setGalleries(galleryList);
    };
    fbase.db.collection(GALLERIES_URL).onSnapshot(handleSnapshot);
  }, [fbase.db]);

  return (
    <StyledWrapper>
      {galleries.map((gallery) => (
        <div key={gallery.gid}>
          <GalleryCard {...gallery} />
        </div>
      ))}
    </StyledWrapper>
  );
};

export default GalleryList;
