import styled, { css } from 'styled-components';

import { Heading } from 'components/shared';

export const StyledOuterContainer = styled(Heading)`
  height: 1rem;
`;

export const StyledFormFont = css`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-decoration: none;
`;

export const StyledFormError = styled.p`
  ${StyledFormFont};
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.alert}; 
`;
