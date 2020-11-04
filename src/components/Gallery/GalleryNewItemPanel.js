import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import UploadForm from 'components/shared/UploadForm';
import { Heading } from 'components/shared';
import AppContext from 'context';

const HeadingPanel = styled(Heading)`
  font-size: ${({ theme }) => (theme.fontSize.m)};
  text-align: center;
  @media only screen and (min-width: 768px) {
    font-size: ${({ theme }) => (theme.fontSize.l)};
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-left: 10px solid ${({ theme }) => theme.primary};
  position: fixed;
  display: flex;
  justify-content: center;
  right: 0;
  top: 8rem;
  width: 29rem;
  height: 46rem;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(${({ isVisible }) => (isVisible ? '-5%' : '100%')});
  transition: transform 0.3s ease-in-out;
  z-index: 100;
  @media only screen and (min-width: 768px) {
    width: 50rem;
  }
`;

const GalleryNewItemPanel = ({ isVisible }) => {
  const COLLECTION_URL = 'galleries';
  const { user } = useContext(AppContext);

  const handleLocation = () => {
    const dbLocation = `/${COLLECTION_URL}`;
    return dbLocation;
  };

  return (
    <StyledWrapper isVisible={isVisible}>
      {user && (
        <>
          <FormWrapper>
            <HeadingPanel>Create gallery</HeadingPanel>
            <UploadForm photoLocation={handleLocation} />
          </FormWrapper>
        </>
      )}
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
