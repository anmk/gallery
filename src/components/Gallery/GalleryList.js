import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { StyledButtonImage } from 'components/Gallery/galleryStyled';
import GalleryCard from 'components/Gallery/GalleryCard';
import GalleryNewItemPanel from 'components/Gallery/GalleryNewItemPanel';
import plusImage from 'assets/images/plus.svg';
import useFirebaseGalleryList from 'hooks/useFirebaseGalleryList';
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
  const COLLECTION_URL = 'galleries';
  const [isNewItemPanelVisible, setNewItemPanelVisible] = useState(false);
  const { user } = useContext(AppContext);
  const { galleries } = useFirebaseGalleryList(COLLECTION_URL);

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
      {user && (
      <>
        <StyledButtonListImage onClick={toggleNewItemPanel} image={plusImage} />
        <GalleryNewItemPanel handleClose={toggleNewItemPanel} isVisible={isNewItemPanelVisible} />
      </>
      )}
    </StyledWrapper>
  );
};

export default GalleryList;
