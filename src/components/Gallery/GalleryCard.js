import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Paragraph } from 'components/shared';
import {
  StyledGalleryWrapper, StyledGalleryInnerWrapper, StyledGalleryHeading, StyledGalleryImage,
} from 'components/Gallery/galleryStyled';
import noImageAvailable from 'assets/images/no-image-available.svg';
import eyeImage from 'assets/images/eye.svg';
import eyeOffImage from 'assets/images/eye-off.svg';
import AppContext from 'context';

const StyledWrapper = styled(StyledGalleryWrapper)`
  height: 26.4rem;
  margin: 1.5rem;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.5);
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-radius: 1rem;
  cursor: pointer;
  @media only screen and (max-width: 400px) {
    height: 24rem;
  }
  @media only screen and (max-width: 768px) {
    margin: .5rem;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  padding-bottom: 0;
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledPhoto = styled(StyledGalleryImage)`
  width: 100%;
  max-width: 28rem;
  max-height: 18.7rem;
  margin-top: 1rem;
  border-radius: 1rem;
  object-fit: cover;
  @media only screen and (max-width: 400px) {
    height: 16.4rem;
  }
`;

const StyledVisible = styled.img`
  display: flex;
  justify-content: space-between;
`;

const GalleryCard = ({
  gid, name, description, imageUrl, userId, share,
}) => {
  const COLLECTION_URL = 'galleries';
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const handleCardClick = () => (
    navigate(`/${COLLECTION_URL}/${gid}`)
  );

  return (
    ((user && user.uid === userId) || share === true) && (
      <StyledWrapper type="button" onClick={handleCardClick}>
        <StyledGalleryInnerWrapper>
          <StyledHeader>
            <StyledTitle>
              <StyledGalleryHeading>{name}</StyledGalleryHeading>
              {user && (<StyledVisible src={share ? eyeImage : eyeOffImage} />)}
            </StyledTitle>
            <Paragraph>{description || '\u00A0'}</Paragraph>
          </StyledHeader>
          <StyledPhoto src={imageUrl || noImageAvailable} alt={name} />
        </StyledGalleryInnerWrapper>
      </StyledWrapper>
    )
  );
};

GalleryCard.propTypes = {
  gid: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  userId: PropTypes.string,
  share: PropTypes.bool,
};

GalleryCard.defaultProps = {
  gid: '',
  name: '',
  description: '',
  imageUrl: '',
  userId: '',
  share: false,
};

export default GalleryCard;
