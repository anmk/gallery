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

export const StyledAuthInput = styled(Input)`
  height: 3rem;
  box-shadow: none;
`;

export const StyledAuthHeading = styled(Heading)`
  ${StyledLocation}
  margin-bottom: 4rem;
`;

export const StyledAuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem; 
`;

export const StyledAuthContainer = styled.div`
  width: 28rem;
`;

export const StyledAuthBox = styled.div`
  ${StyledDisplay}
`;
