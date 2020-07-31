import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from 'components/shared';
import FirebaseContext from '../../firebase/context';

const StyledWrapper = styled.nav`
  background-color: ${({ activeColor, theme }) => (activeColor ? theme[activeColor] : theme.primary)};
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
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

const Navbar = ({ pageType }) => {
  const { user, firebase } = useContext(FirebaseContext);
  return (
    <StyledWrapper activeColor={pageType}>
      <StyledUlList>
        <StyledLiList><Button nav="true" as={NavLink} to="/home" activeclass="active">Home</Button></StyledLiList>
        {user && (
          <StyledLiList>
            <Button nav="true" as={NavLink} to="/galleryList" activeclass="active">Gallery</Button>
          </StyledLiList>
        )}
        <StyledLiList>
          {user ? (
            <Button nav="true" as={NavLink} to="/login" onClick={() => firebase.logout()} activeclass="active">{user.displayName} | Logout</Button>
          ) : (
            <Button nav="true" as={NavLink} to="/login" activeclass="active">Login</Button>
          )}
        </StyledLiList>
      </StyledUlList>
    </StyledWrapper>
  );
};

Navbar.propTypes = {
  pageType: PropTypes.oneOf([
    'home', 'primary', 'login',
  ]),
};

Navbar.defaultProps = {
  pageType: 'primary',
};

export default Navbar;
