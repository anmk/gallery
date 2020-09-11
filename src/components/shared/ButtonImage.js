import styled from 'styled-components';

const ButtonImage = styled.button`
  display: block;
  width: 67px;
  height: 67px;
  border-radius: 10px;
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 40%;
  border: none;
  background-color: ${({ theme }) => (theme.secondary)};
  cursor: pointer;
  
  &.active {
    background-color: ${({ theme }) => theme.middleGray};
  }
`;

export default ButtonImage;
