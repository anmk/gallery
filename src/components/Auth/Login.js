import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Button } from 'components/shared';
import {
  StyledAuthInput, StyledAuthHeading, StyledAuthWrapper, StyledAuthContainer, StyledAuthBox,
} from 'components/Auth/authStyled';
import { StyledOuterContainer, StyledFormError } from 'components/componentsStyled';
import useFormValidation from 'hooks/useFormValidation';
import loginValidation from 'validations/loginValidation';
import { onUpdateSuccess, onUpdateFailure } from 'toasts/toasts';
import eyeImage from 'assets/images/eye.svg';
import eyeOffImage from 'assets/images/eye-off.svg';
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

const StyledLoginWrapper = styled(StyledAuthWrapper)`
  padding-left: 3rem;
  overflow: hidden;
`;

const StyledFormField = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAuthElement = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 28rem;
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
  await fbase.auth.signOut()
    .then(onUpdateSuccess('Logout was successful!'))
    .catch((error) => onUpdateFailure(error.message));
};

const StyledShowPasswordImage = styled.img`
  margin: 1.5rem 0 0 .5rem;
  padding: 1rem;
  width: 2rem;
  height: 2rem;
  background-image: url(${({ image }) => image});
  background-size: 100%;
  transform: translate(-3rem, 0);
  cursor: pointer;
`;

const Login = () => {
  const {
    handleChange, handleSubmit, handleBlur, isSubmitting, values, errors,
  } = useFormValidation(INITIAL_STATE, loginValidation, authenticateUser);
  const [firebaseError, setFirebaseError] = useState(null);
  const [login, setLogin] = useState(true);
  const [isPasswordShow, setPasswordShow] = useState(false);
  const navigate = useNavigate();

  const firebaseRegister = async (name, email, password) => {
    const newUser = await fbase.auth.createUserWithEmailAndPassword(
      email,
      password,
    )
      .then(onUpdateSuccess('The account has been created!'))
      .catch((error) => onUpdateFailure(error.message));
    const updateProfile = await newUser.user.updateProfile({
      displayName: name,
    })
      .catch((error) => onUpdateFailure(error.message));
    return updateProfile;
  };

  const firebaseLogin = async (email, password) => {
    const signIn = await fbase.auth.signInWithEmailAndPassword(email, password)
      .then(onUpdateSuccess('Login was successful!'))
      .catch((error) => onUpdateFailure(error.message));
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
      onUpdateFailure(`Authentication error: ${err.message}`);
      setFirebaseError(err.message);
    }
  }

  const togglePasswordShown = () => {
    setPasswordShow(!isPasswordShow);
  };

  return (
    <div>
      <StyledLoginWrapper>
        <form onSubmit={handleSubmit} autoComplete="off">
          <StyledAuthContainer>
            <StyledAuthBox>
              <StyledAuthElement>
                <StyledAuthHeading>{login ? 'Login' : 'Create Account'}</StyledAuthHeading>
              </StyledAuthElement>
              {!login && (
                <StyledFormField>
                  <StyledAuthElement>
                    <StyledAuthInput
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      type="text"
                      placeholder="Your name"
                    />
                    <StyledOuterContainer />
                  </StyledAuthElement>
                </StyledFormField>
              )}
              <StyledFormField>
                <StyledAuthElement>
                  <StyledAuthInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    name="email"
                    type="email"
                    placeholder="Your email"
                  />
                </StyledAuthElement>
              </StyledFormField>
              <StyledOuterContainer>
                {errors.email && <StyledFormError>{errors.email}</StyledFormError>}
              </StyledOuterContainer>
              <StyledFormField>
                <StyledAuthElement>
                  <StyledAuthInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    name="password"
                    placeholder="Your password"
                    type={isPasswordShow ? 'text' : 'password'}
                  />
                </StyledAuthElement>
                <StyledShowPasswordImage
                  onClick={togglePasswordShown}
                  image={isPasswordShow ? eyeOffImage : eyeImage}
                />
              </StyledFormField>
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
              <StyledAuthElement>
                <StyledLink
                  type="button"
                  onClick={() => setLogin((prevLogin) => !prevLogin)}
                >
                  {login ? 'Need to create account' : 'Already have an account?'}
                </StyledLink>
                <StyledLink as={NavLink} to="/forgot" type="button">
                  Forgot password?
                </StyledLink>
              </StyledAuthElement>
            </StyledAuthBox>
          </StyledAuthContainer>
        </form>
      </StyledLoginWrapper>
    </div>
  );
};

export { firebaseLogout, Login as default };
