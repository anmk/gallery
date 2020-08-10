import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.veryDarkGrey};
  padding: .2rem .5rem;
  margin: 0;
`;

export default Paragraph;
