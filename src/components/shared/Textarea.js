import styled from 'styled-components';

import {
  StyledGalleryBasicElement, StyledGalleryPlaceholderElement,
} from 'components/shared/sharedStyled';

const Textarea = styled.textarea`
  ${StyledGalleryBasicElement};
  height: 5rem;
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-radius: 5px;
  padding-top: .5rem;
  ::placeholder {
    ${StyledGalleryPlaceholderElement};
  }
`;

export default Textarea;
