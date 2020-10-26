import React, { useContext } from 'react';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import { StyledGalleryWrapper, StyledGalleryImage } from 'components/Gallery/galleryStyled';
import noImageAvailable from 'assets/images/no-image-available.svg';
import AppContext from 'context';

const StyledWrapper = styled(StyledGalleryWrapper)`
  height: 90px;
  width: 90px;
  margin: 2px;
  background-color: ${({ theme }) => theme.veryLightGrey};
  box-shadow: 0 3px 10px -3px hsla(0, 0%, 0%, 0.5);
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-radius: 5px;
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

const GalleryDetails = ({
  imageUrl, name, pid, userId, share,
}) => {
  const { gid } = useParams();
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const COLLECTION_URL = 'galleries';
  const PHOTO_URL = `/${COLLECTION_URL}/${gid}/${pid}`;

  const handleCardClick = () => {
    navigate(PHOTO_URL);
  };

  return (
    ((user && user.uid === userId) || share === true) && (
    <StyledWrapper as={NavLink} to={PHOTO_URL} type="button" onClick={handleCardClick}>
      <StyledPhoto src={imageUrl || noImageAvailable} alt={name} />
    </StyledWrapper>
    )
  );
};

GalleryDetails.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  pid: PropTypes.string,
  userId: PropTypes.string,
  share: PropTypes.bool,
};

GalleryDetails.defaultProps = {
  imageUrl: '',
  name: '',
  pid: '',
  userId: '',
  share: false,
};

export default GalleryDetails;
