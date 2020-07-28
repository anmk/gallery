import styled, { css } from 'styled-components';

import Input from 'components/shared/Input';
import Heading from 'components/shared/Heading';

const StyledLocation = css`
  align-self: center;
`;

const StyledDisplay = css`
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled(Input)`
  height: 2rem;
  box-shadow: none;
`;

export const StyledHeading = styled(Heading)`
  ${StyledLocation}
  margin-bottom: 4rem;
`;

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem; 
`;

export const StyledContainer = styled.div`
  width: 28rem;
`;

export const StyledBox = styled.div`
  ${StyledDisplay}
`;
