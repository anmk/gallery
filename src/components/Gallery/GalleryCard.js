import React from 'react';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Paragraph } from 'components/shared';
import {
  StyledGalleryWrapper, StyledGalleryInnerWrapper, StyledGalleryHeading, StyledGalleryImage,
} from 'components/Gallery/galleryStyled';
import noImageAvailable from 'assets/images/no-image-available.svg';

const StyledWrapper = styled(StyledGalleryWrapper)`
  height: 26.4rem;
  flex-flow: row wrap;
  justify-content: center;
  margin: 15px;
  cursor: pointer;
`;

const StyledPhoto = styled(StyledGalleryImage)`
  width: 28rem;
  margin-top: 1rem;
  border-radius: 10px;
`;

const GalleryCard = ({
  gid, name, description, imageUrl,
}) => {
  const COLLECTION_URL = 'galleries';
  const navigate = useNavigate();

  const handleCardClick = () => (
    navigate(`/${COLLECTION_URL}/${gid}`)
  );

  return (
    <StyledWrapper type="button" onClick={handleCardClick}>
      <StyledGalleryInnerWrapper>
        <StyledGalleryHeading>{name}</StyledGalleryHeading>
        <Paragraph>{description}</Paragraph>
        <StyledPhoto src={imageUrl || noImageAvailable} alt={name} />
      </StyledGalleryInnerWrapper>
    </StyledWrapper>
  );
};

GalleryCard.propTypes = {
  gid: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
};

GalleryCard.defaultProps = {
  gid: '',
  name: '',
  description: '',
  imageUrl: '',
};

export default GalleryCard;
