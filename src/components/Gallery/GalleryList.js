import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { StyledButtonImage } from 'components/Gallery/galleryStyled';
import GalleryCard from 'components/Gallery/GalleryCard';
import GalleryNewItemPanel from 'components/Gallery/GalleryNewItemPanel';
import plusImage from 'assets/images/plus.svg';

import AppContext from 'context';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 3rem;
  margin-top: 1rem;
`;

const StyledButtonListImage = styled(StyledButtonImage)`
  position: fixed;
  top: 12rem;
  right: 3rem;
  height: 4rem;
  width: 4rem;
  background-color: ${({ theme }) => theme.secondary};
  background-size: 40%;
  z-index: 101;
`;

const GalleryList = () => {
  const GALLERIES_URL = 'galleries';
  const { fbase } = useContext(AppContext);
  const [galleries, setGalleries] = useState([]);
  const [isNewItemPanelVisible, setNewItemPanelVisible] = useState(false);

  const handleSnapshot = (snapshot) => {
    const galleryList = snapshot.docs.map((doc) => ({
      gid: doc.id, ...doc.data(),
    }));
    setGalleries(galleryList);
  };

  useEffect(() => {
    let didCancel = false;

    const handleCollection = async () => {
      const unsubscribe = await fbase.db.collection(GALLERIES_URL).onSnapshot(handleSnapshot);
      return () => unsubscribe();
    };

    if (!didCancel) {
      handleCollection();
    }

    return () => {
      didCancel = true;
    };
  }, [fbase.db]);

  const toggleNewItemPanel = () => {
    setNewItemPanelVisible(!isNewItemPanelVisible);
  };

  return (
    <StyledWrapper>
      {galleries.map((gallery) => (
        <div key={gallery.gid}>
          <GalleryCard {...gallery} />
        </div>
      ))}
      <StyledButtonListImage onClick={toggleNewItemPanel} image={plusImage} />
      <GalleryNewItemPanel handleClose={toggleNewItemPanel} isVisible={isNewItemPanelVisible} />
    </StyledWrapper>
  );
};

export default GalleryList;
