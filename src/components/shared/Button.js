import styled, { css } from 'styled-components';

import { StyledGalleryBasicElement } from 'components/shared/sharedStyled';

const Button = styled.button`
 ${StyledGalleryBasicElement};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.2rem;
  background-color: ${({ theme }) => theme.secondary};
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-radius: 5px;
  cursor: pointer;
  button:focus {outline:0;}

  &.active {
    background-color: ${({ theme }) => theme.veryLightGrey};
    color: ${({ theme }) => theme.veryDarkGrey};
    border: 2px solid ${({ theme }) => theme.darkGrey};
  }

  ${({ primary }) => (
    primary && css`
      background-color: ${({ theme }) => theme.primary};
    `
  )}

  ${({ secondary }) => (
    secondary && css`
      background-color: ${({ theme }) => theme.secondary};
    `
  )}

  ${({ nav }) => (
    nav && css`
      background-color: transparent;
      color: ${({ theme }) => theme.veryLightGrey};
      border: none;
    `
  )}
`;

export default Button;
