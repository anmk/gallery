import styled, { css } from 'styled-components';

import { Heading } from 'components/shared';

const StyledGalleryBorder = css`
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-radius: 5px;
`;

export const StyledGalleryHeading = styled(Heading)`
  color: ${({ theme }) => theme.veryDarkGrey};
  font-size: ${({ theme }) => (theme.fontSize.m)};
`;

export const StyledGalleryImage = styled.img`
  max-width: 55rem;  
  max-height: 55rem;
  ${StyledGalleryBorder}
  align-self: center;
`;

export const StyledGalleryWrapper = styled.div`
  ${StyledGalleryBorder}
  display: flex;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.5);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 2rem;
`;

export const StyledGalleryInnerWrapper = styled.div`
  padding: 1rem;
`;
