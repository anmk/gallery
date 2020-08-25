import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Button } from 'components/shared';
import {
  StyledAuthInput, StyledAuthHeading, StyledAuthWrapper, StyledAuthContainer, StyledAuthBox,
} from 'components/auth/authStyled';
import { StyledOuterContainer, StyledFormError } from 'components/componentsStyled';
import useFormValidation from 'hooks/useFormValidation';
import loginValidation from 'validations/loginValidation';
import fbase from '../../firebase';

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

const StyledAuthElement = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
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

const firebaseLogout = async () => {
  await fbase.auth.signOut();
};

const Login = () => {
  const {
    handleChange, handleSubmit, handleBlur, isSubmitting, values, errors,
  } = useFormValidation(INITIAL_STATE, loginValidation, authenticateUser);
  const [firebaseError, setFirebaseError] = useState(null);
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  const firebaseRegister = async (name, email, password) => {
    const newUser = await fbase.auth.createUserWithEmailAndPassword(
      email,
      password,
    );
    const updateProfile = await newUser.user.updateProfile({
      displayName: name,
    });
    return updateProfile;
  };

  const firebaseLogin = async (email, password) => {
    const signIn = await fbase.auth.signInWithEmailAndPassword(email, password);
    return signIn;
  };

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebaseLogin(email, password)
        : await firebaseRegister(name, email, password);
      navigate('/galleries');
    } catch (err) {
      // console.error('Authentication error', err);
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
                <StyledAuthElement>
                  <StyledAuthInput
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="off"
                  />
                  <StyledOuterContainer />
                </StyledAuthElement>
              )}
              <StyledAuthElement>
                <StyledAuthInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name="email"
                  type="email"
                  placeholder="Your email"
                  autoComplete="off"
                />
              </StyledAuthElement>
              <StyledOuterContainer>
                {errors.email && <StyledFormError>{errors.email}</StyledFormError>}
              </StyledOuterContainer>
              <StyledAuthElement>
                <StyledAuthInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  name="password"
                  type="password"
                  placeholder="Your password"
                  autoComplete="off"
                />
              </StyledAuthElement>
              <StyledOuterContainer>
                {errors.password && <StyledFormError>{errors.password}</StyledFormError>}
                {firebaseError && <StyledFormError>{firebaseError}</StyledFormError>}
              </StyledOuterContainer>
              <StyledAuthElement>
                <StyledButton
                  secondary="true"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ border: isSubmitting ? 'grey' : 'orange' }}
                >
                  {login ? 'Login' : 'Register'}
                </StyledButton>
              </StyledAuthElement>
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

export { firebaseLogout, Login as default };
