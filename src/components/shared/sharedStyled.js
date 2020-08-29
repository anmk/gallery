import { css } from 'styled-components';

const StyledGalleryBasicFont = css`
  font-family: 'Lato', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-decoration: none;
  padding: 0 .5rem;
`;

export const StyledGalleryBasicElement = css`
  ${StyledGalleryBasicFont};
  color: ${({ theme }) => theme.veryDarkGrey};
  background-color: ${({ theme }) => theme.lightGray};
  padding: .2rem .5rem;
  outline: none;
`;

export const StyledGalleryPlaceholderElement = css`
  ${StyledGalleryBasicFont};
  color: ${({ theme }) => theme.darkGrey};
  letter-spacing: 1px;
`;
