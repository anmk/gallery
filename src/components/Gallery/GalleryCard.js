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
  margin: 1.5rem;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.5);
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-radius: 1rem;
  cursor: pointer;
`;

const StyledText = styled.div`
   display: flex;
   flex-direction: column;
  justify-content: flex-start;
`;

const StyledHeader = styled.div`
   display: flex;
   flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0;
  padding-bottom: 0;
`;

const StyledPhoto = styled(StyledGalleryImage)`
  width: 28rem;
  margin-top: 1rem;
  border-radius: 1rem;
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
        <StyledHeader>
          <StyledText>
            <StyledGalleryHeading>{name}</StyledGalleryHeading>
            <Paragraph>{description}</Paragraph>
          </StyledText>
        </StyledHeader>
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
