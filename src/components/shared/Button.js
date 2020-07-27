import styled, { css } from 'styled-components';

const Button = styled.button`
  color: ${({ theme }) => theme.veryDarkGrey};
  background-color: ${({ theme }) => theme.secondary};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  border: none;
  border-radius: 50px;
  text-decoration: none;
  outline: none; /* remove blue selected outline on click */

  &.active {
    background-color: ${({ theme }) => theme.veryLightGrey};
    color: ${({ theme }) => theme.veryDarkGrey};
    border: 2px solid ${({ theme }) => theme.darkGrey};
  }

  ${({ primary }) => (
    primary && css`
      background-color: ${({ theme }) => theme.primary};
      height: 3rem;
      button:focus {outline:0;}
    `
  )}

  ${({ secondary }) => (
    secondary && css`
      background-color: ${({ theme }) => theme.secondary};
      height: 3rem;
    `
  )}

  ${({ nav }) => (
    nav && css`
      background-color: transparent;
      color: ${({ theme }) => theme.veryLightGrey};
      padding: 3px;
      border: none;
    `
  )}
`;

export default Button;
