import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';

import { Button } from 'components/shared';
import { StyledOuterContainer, StyledFormError } from 'components/componentsStyled';
import {
  StyledAuthInput, StyledAuthHeading, StyledAuthWrapper, StyledAuthContainer, StyledAuthBox,
} from 'components/auth/authStyled';
import AppContext from 'context';

const StyledLocation = css`
  align-self: center;
`;

const StyledButton = styled(Button)`
  cursor: pointer;
  width: ${({ theme }) => theme.width.long};
  ${StyledLocation}
`;

const ForgotPassword = () => {
  const { fbase } = useContext(AppContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [userPasswordReset, setUserPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);

  const firebaseResetPassword = async (email) => {
    await fbase.auth.sendPasswordResetEmail(email);
  };

  const handleResetPassword = async () => {
    try {
      await firebaseResetPassword(resetPasswordEmail);
      setUserPasswordReset(true);
      setPasswordResetError(null);
    } catch (err) {
      setPasswordResetError(err.message);
      setUserPasswordReset(false);
    }
  };

  return (
    <StyledAuthWrapper>
      <StyledAuthContainer>
        <StyledAuthBox>
          <StyledAuthHeading>Forgot password</StyledAuthHeading>
          <StyledAuthInput
            type="email"
            placeholder="Provide your account email"
            onChange={(event) => setResetPasswordEmail(event.target.value)}
          />
          <StyledOuterContainer />
          <StyledButton secondary="true" onClick={handleResetPassword}>
            Reset password
          </StyledButton>
          {userPasswordReset && <StyledFormError>Check email to reset password</StyledFormError>}
          {passwordResetError && <StyledFormError>{passwordResetError}</StyledFormError>}
        </StyledAuthBox>
      </StyledAuthContainer>
    </StyledAuthWrapper>
  );
};

export default ForgotPassword;
