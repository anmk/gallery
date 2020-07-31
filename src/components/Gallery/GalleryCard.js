import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import noImageAvailable from 'assets/images/no-image-available.svg';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.5);
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  margin: 15px;
`;

const InnerWrapper = styled.div`
  padding: 10px;
`;

const ImageElement = styled.img`
  margin-top: 1rem;
  width: 280px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.darkGrey};
`;

const StyledHeading = styled.h3`
  width: 280px;
  color: ${({ theme }) => theme.veryDarkGrey};
  padding: 0;
  margin: 0;
`;

const StyledSubHeading = styled.p`
  width: 280px;
  color: ${({ theme }) => theme.veryDarkGrey};
  padding: 0;
  margin: 0;
`;

const GalleryCard = ({
  id, name, description, imageUrl,
}) => (
  <StyledWrapper>
    <InnerWrapper>
      <StyledHeading>{name}</StyledHeading>
      <StyledSubHeading>{description}</StyledSubHeading>
      <ImageElement src={imageUrl || noImageAvailable} alt={name} />
      <div>{id}</div>
    </InnerWrapper>
  </StyledWrapper>
);

GalleryCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
};

GalleryCard.defaultProps = {
  id: '',
  name: '',
  description: '',
  imageUrl: '',
};

export default GalleryCard;
