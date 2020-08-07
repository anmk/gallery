import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Button, Heading } from 'components/shared';
import {
  StyledAuthInput, StyledAuthHeading, StyledAuthWrapper, StyledAuthContainer, StyledAuthBox,
} from 'components/auth/authStyled';
import useFormValidation from 'components/auth/useFormValidation';
import LoginValidation from 'components/auth/LoginValidation';
import firebase from '../../firebase';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

const StyledLocation = css`
  align-self: center;
`;

const StyledLittleFont = css`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  text-decoration: none;
`;

const StyledOuterErrorContainer = styled(Heading)`
 height: 1rem;
`;

const StyledButton = styled(Button)`
  cursor: pointer;
  ${StyledLocation}
  width: ${({ theme }) => theme.width.medium};
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.veryDarkGrey}; 
  margin-top: 1.5rem; 
  cursor: pointer;
  ${StyledLocation}
  ${StyledLittleFont};
`;

const StyledError = styled.p`
  ${StyledLittleFont};
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.error}; 
`;

const Login = () => {
  const {
    handleChange, handleSubmit, handleBlur, isSubmitting, values, errors,
  } = useFormValidation(INITIAL_STATE, LoginValidation, authenticateUser);
  const [firebaseError, setFirebaseError] = useState(null);
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      const response = login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      navigate('/galleries');
      console.log(response.user.displayName);
    } catch (err) {
      console.error('Authentication error', err);
      setFirebaseError(err.message);
    }
  }

  return (
    <div>
      <StyledAuthWrapper>
        <form onSubmit={handleSubmit}>
          <StyledAuthContainer>
            <StyledAuthBox>
              <StyledAuthHeading>{login ? 'Login' : 'Create Account'}</StyledAuthHeading>
              {!login && (
                <>
                  <StyledAuthInput
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="off"
                  />
                  <StyledOuterErrorContainer />
                </>
              )}
              <StyledAuthInput
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name="email"
                type="email"
                placeholder="Your email"
                autoComplete="off"
              />
              <StyledOuterErrorContainer>
                {errors.email && <StyledError>{errors.email}</StyledError>}
              </StyledOuterErrorContainer>
              <StyledAuthInput
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name="password"
                type="password"
                placeholder="Your password"
                autoComplete="off"
              />
              <StyledOuterErrorContainer>
                {errors.password && <StyledError>{errors.password}</StyledError>}
                {firebaseError && <StyledError>{firebaseError}</StyledError>}
              </StyledOuterErrorContainer>
              <StyledButton
                secondary="true"
                type="submit"
                disabled={isSubmitting}
                style={{ border: isSubmitting ? 'grey' : 'orange' }}
              >
                {login ? 'Login' : 'Register'}
              </StyledButton>
              <StyledLink
                type="button"
                onClick={() => setLogin((prevLogin) => !prevLogin)}
              >
                {login ? 'Need to create account' : 'Already have an account?'}
              </StyledLink>
              <StyledLink as={NavLink} to="/forgot" type="button">
                Forgot password?
              </StyledLink>
            </StyledAuthBox>
          </StyledAuthContainer>
        </form>
      </StyledAuthWrapper>
    </div>
  );
};

export default Login;
