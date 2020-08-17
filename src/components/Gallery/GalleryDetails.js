import React from 'react';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import { StyledGalleryWrapper, StyledGalleryImage } from 'components/Gallery/galleryStyled';
import noImageAvailable from 'assets/images/no-image-available.svg';

const StyledWrapper = styled(StyledGalleryWrapper)`
  height: 90px;
  width: 90px;
  box-shadow: 0 3px 10px -3px hsla(0, 0%, 0%, 0.5);
  border-radius: 5px;
  margin: 2px;
  background-color: ${({ theme }) => theme.veryLightGrey};
  cursor: pointer;
  &.active {
    background-color: ${({ theme }) => theme.middleGrey};
    border: 2px solid ${({ theme }) => theme.primary};
  }
`;

const StyledPhoto = styled(StyledGalleryImage)`
  max-width: 80px;
  max-height: 80px;
  margin: 0 auto;
`;

const GalleryDetails = ({ imageUrl, name, pid }) => {
  const { gid } = useParams();
  const navigate = useNavigate();
  const COLLECTION_URL = 'galleries';
  const PHOTO_URL = `/${COLLECTION_URL}/${gid}/${pid}`;

  const handleCardClick = () => {
    navigate(PHOTO_URL);
  };

  return (
    <StyledWrapper as={NavLink} to={PHOTO_URL} type="button" onClick={handleCardClick}>
      <StyledPhoto src={imageUrl || noImageAvailable} alt={name} />
    </StyledWrapper>
  );
};

GalleryDetails.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  pid: PropTypes.string,
};

GalleryDetails.defaultProps = {
  imageUrl: '',
  name: '',
  pid: '',
};

export default GalleryDetails;
