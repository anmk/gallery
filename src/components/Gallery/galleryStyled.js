import styled, { css } from 'styled-components';

import { Heading, ButtonImage } from 'components/shared';

export const StyledGalleryBorder = css`
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
  display: flex;
  border-radius: 1rem;
  overflow: hidden;
`;

export const StyledGalleryInnerWrapper = styled.div`
  padding: 1rem;
`;

export const StyledButtonImage = styled(ButtonImage)`
  height: 3rem;
  width: 3rem;
  border: 2px solid ${({ theme }) => theme.darkGrey};
  outline: 0;
  z-index: 101;
`;
