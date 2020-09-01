import styled, { css } from 'styled-components';

import {
  StyledGalleryBasicElement, StyledGalleryPlaceholderElement,
} from 'components/shared/sharedStyled';
import magnifierIcon from 'assets/images/magnifier.svg';

const Input = styled.input`
  ${StyledGalleryBasicElement};
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-radius: 5px;
  height: 3rem;

  ::placeholder {
    ${StyledGalleryPlaceholderElement};
  }
  
  ${({ search }) => search && css`
      padding: 1rem 2rem 1rem 4rem;
      font-size: ${({ theme }) => theme.fontSize.xs};
      background-image: url(${magnifierIcon});
      background-size: 1.5rem;
      background-position: 1.5rem 50%;
      background-repeat: no-repeat;
  `}
`;

export default Input;
