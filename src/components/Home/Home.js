import React, { useContext } from 'react';
import styled from 'styled-components';
import { Heading } from 'components/shared';
import AppContext from 'context';

export const StyledHomeHeading = styled(Heading)`
  color: ${({ theme }) => theme.veryDarkGrey};
  text-align: center;
  margin-top: 3rem;
`;

const StyledHomeText = styled(StyledHomeHeading)`
  font-size: ${({ theme }) => (theme.fontSize.s)};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const Home = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      <StyledHomeHeading>Welcome to the Gallery app!</StyledHomeHeading>
      {(!user) && (
        <>
          <StyledHomeText>Adding galleries and photos is available only after logging in.</StyledHomeText>
          <StyledHomeText>You can create galleries and photos visible to all users or only to you.</StyledHomeText>
        </>
      )}
    </>
  );
};

export default Home;
