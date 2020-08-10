import styled from 'styled-components';

const Heading = styled.h1`
  color: ${({ theme }) => theme.veryDarkGrey};
  font-size: ${({ theme, big }) => (big ? theme.fontSize.xl : theme.fontSize.l)};
  font-weight: ${({ theme }) => theme.bold};
  padding: .4rem .5rem;
  margin: 0;
`;

export default Heading;
