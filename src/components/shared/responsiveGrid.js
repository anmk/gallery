import styled from 'styled-components';

const getWidth = (size) => {
  if (!size) { return false; }
  const width = (size / 12) * 100;
  return `width: ${width}%;`;
};

export const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export const Col = styled.div`
  display: flex;
  justify-content: center;
  ${({ xs }) => (xs ? getWidth(xs) : 'width: 100%')}
  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidth(sm)}
  }
  @media only screen and (min-width: 992px) {
    ${({ md }) => md && getWidth(md)}
  }
  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidth(lg)}
  }
`;
