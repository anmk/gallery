import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from 'components/shared';
import FirebaseContext from '../../firebase/context';

const StyledWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: ${({ activeColor, theme }) => (
    activeColor ? theme[activeColor] : theme.primary
  )};
  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledUlList = styled.ul`
  display: flex;
`;

const StyledLiList = styled.li`
  list-style: none;
  padding: 1rem;
`;

const StyledInfo = styled.div`
  color: ${({ theme }) => theme.veryLightGrey};
  padding: 1rem;
`;

const Navbar = () => {
  const { user, firebase } = useContext(FirebaseContext);
  return (
    <StyledWrapper>
      <StyledInfo>
        Hello { user ? user.displayName : 'Stranger' }
      </StyledInfo>
      <StyledUlList>
        <StyledLiList>
          <Button
            nav="true"
            as={NavLink}
            to="/home"
            activeclass="active"
          >Home
          </Button>
        </StyledLiList>
        {user && (
          <StyledLiList>
            <Button
              nav="true"
              as={NavLink}
              to="/galleries"
              activeclass="active"
            >Galleries
            </Button>
          </StyledLiList>
        )}
        <StyledLiList>
          {user ? (
            <Button
              nav="true"
              as={NavLink}
              to="/login"
              onClick={() => firebase.logout()}
              activeclass="active"
            >Logout
            </Button>
          ) : (
            <Button
              nav="true"
              as={NavLink}
              to="/login"
              activeclass="active"
            >Login
            </Button>
          )}
        </StyledLiList>
      </StyledUlList>
    </StyledWrapper>
  );
};

export default Navbar;
