import styled from 'styled-components';

import {
  StyledGalleryBasicElement, StyledGalleryPlaceholderElement,
} from 'components/shared/sharedStyled';

const Paragraph = styled.p`
  ${StyledGalleryBasicElement};
  ::placeholder {
    ${StyledGalleryPlaceholderElement};
  }
`;

export default Paragraph;
