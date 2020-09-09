import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from 'components/shared';
import { firebaseLogout } from 'components/auth/Login';
import AppContext from 'context';

const StyledWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
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
  const { user } = useContext(AppContext);

  return (
    <StyledWrapper>
      <StyledInfo>
        {user && <span>Hello </span>}
        {user?.displayName && <span>{user.displayName}</span>}
        {user && !user?.displayName && <span>{user?.email}</span>}
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
              onClick={() => firebaseLogout()}
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
