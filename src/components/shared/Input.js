import styled, { css } from 'styled-components';

import magnifierIcon from 'assets/images/magnifier.svg';

const Input = styled.input`
  padding: 15px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.regular};
  color: ${({ theme }) => theme.veryDarkGrey};
  background-color: ${({ theme }) => theme.lightGray};
  border: 2px solid ${({ theme }) => theme.grey};
  border-radius: 10px;
  outline: none;
  
  ::placeholder {
    text-decoration: none;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.grey};
  }
  
  ${({ search }) => search && css`
      padding: 10px 20px 10px 40px;
      font-size: ${({ theme }) => theme.fontSize.xs};
      background-image: url(${magnifierIcon});
      background-size: 15px;
      background-position: 15px 50%;
      background-repeat: no-repeat;
  `}
`;

export default Input;
