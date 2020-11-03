import styled, { css } from 'styled-components';

import { Heading, ButtonImage } from 'components/shared';

export const StyledGalleryBorder = css`
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-radius: 5px;
`;

export const StyledGalleryHeading = styled(Heading)`
  color: ${({ theme }) => theme.veryDarkGrey};
  font-size: ${({ theme }) => (theme.fontSize.m)};
  text-align: center;
`;

export const StyledGalleryImage = styled.img`
  ${StyledGalleryBorder}
  align-self: center;
`;

export const StyledVisible = styled(StyledGalleryImage)`
  height: 2rem;
  width: 2rem;
  border: none;
`;

export const StyledGalleryWrapper = styled.div`
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
