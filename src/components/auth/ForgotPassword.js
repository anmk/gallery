import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';

import { Paragraph, Button, Heading } from 'components/shared';
import {
  StyledAuthInput, StyledAuthHeading, StyledAuthWrapper, StyledAuthContainer, StyledAuthBox,
} from 'components/auth/authStyled';
import FirebaseContext from '../../firebase/context';

const StyledLocation = css`
  align-self: center;
`;

const StyledButton = styled(Button)`
  cursor: pointer;
  width: ${({ theme }) => theme.width.long};
  ${StyledLocation}
`;

const StyledOuterErrorContainer = styled(Heading)`
 height: 1rem;
`;

const ForgotPassword = () => {
  const { firebase } = useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [userPasswordReset, setUserPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);

  const handleResetPassword = async () => {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setUserPasswordReset(true);
      setPasswordResetError(null);
    } catch (err) {
      console.error('Error sending email', err);
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
          <StyledOuterErrorContainer />
          <StyledButton secondary="true" onClick={handleResetPassword}>
            Reset password
          </StyledButton>
          {userPasswordReset && <Paragraph>Check email to reset password</Paragraph>}
          {passwordResetError && <Paragraph>{passwordResetError}</Paragraph>}
        </StyledAuthBox>
      </StyledAuthContainer>
    </StyledAuthWrapper>
  );
};

export default ForgotPassword;
