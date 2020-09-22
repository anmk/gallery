import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import UploadForm from 'components/shared/UploadForm';
import { Heading } from 'components/shared';

const StyledWrapper = styled.div`
  border-left: 10px solid ${({ theme }) => theme.primary};
  position: fixed;
  display: flex;
  padding: 100px 90px;
  flex-direction: column;
  right: 0;
  top: 10rem;
  bottom: 10rem;
  width: 50rem;
  height: 50rem;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(${({ isVisible }) => (isVisible ? '-4%' : '100%')});
  transition: transform 0.3s ease-in-out;
  z-index: 100;
`;

const GalleryNewItemPanel = ({ isVisible }) => {
  const COLLECTION_URL = 'galleries';

  const handleLocation = () => {
    const dbLocation = `/${COLLECTION_URL}`;
    return dbLocation;
  };

  return (
    <StyledWrapper isVisible={isVisible}>
      <Heading>Create new gallery</Heading>
      <UploadForm photoLocation={handleLocation} />
    </StyledWrapper>
  );
};

GalleryNewItemPanel.propTypes = {
  isVisible: PropTypes.bool,
};

GalleryNewItemPanel.defaultProps = {
  isVisible: false,
};

export default GalleryNewItemPanel;
