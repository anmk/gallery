import React, {
  useEffect, useState, useRef, useContext,
} from 'react';
import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';

import photoValidation from 'validations/photoValidation';
import useStorageUpload from 'hooks/useStorageUpload';
import useFirebaseUpload from 'hooks/useFirebaseUpload';
import useFormValidation from 'hooks/useFormValidation';
import { StyledOuterContainer, StyledFormError } from 'components/componentsStyled';
import { Input, Textarea, Button } from 'components/shared';
import AppContext from 'context';
import eyeImage from 'assets/images/eye.svg';
import eyeOffImage from 'assets/images/eye-off.svg';

const INITIAL_STATE = {
  name: '',
  description: '',
  nameInStorage: '',
  imageUrl: '',
};

const StyledUploadForm = css`
  width: 28rem;
`;

const StyledFlexPreferences = css`
  display: flex;
  flex-direction: column;
`;

const StyledUploadWrapper = styled.div`
  ${StyledUploadForm};
  ${StyledFlexPreferences};
`;

const StyledFormElement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

const StyledFormText = styled.div`
  padding: .3rem 1rem;
  display: flex;
  align-items: baseline;
  color: ${({ theme }) => theme.veryDarkGrey};
`;

const StyledFormField = styled.div`
  ${StyledFlexPreferences};
  margin-top: 1.5rem;
  width: 100%;
`;

const InputLoader = styled(Input)`
  color: ${({ theme }) => theme.veryDarkGrey};
  background-color: ${({ theme }) => theme.secondary};
  border: 1px solid ${({ theme }) => theme.darkGrey};
  height: 3.2rem;
  padding: 5px;
  cursor: pointer;
`;

const ButtonLoader = styled(Button)`
  margin-top: 1rem;
  &:disabled {
    color: ${({ theme }) => theme.veryDarkGrey};
    background-color: ${({ theme }) => theme.lightGrey};
    border: 1px solid ${({ theme }) => theme.darkGrey};
  }
`;

const LabelShared = styled.label`
  background-image: url(${eyeOffImage});
  background-repeat: no-repeat;
  padding-left: 3rem;
  display: flex;
  align-items: baseline;
  cursor: pointer;
`;

const InputShared = styled(Input)`
  display: none;
  &:checked + ${LabelShared} {
    background-image: url(${eyeImage});
  }
`;

const StyledProgress = styled.progress`
  width: 100%;
`;

const UploadForm = ({ photoLocation }) => {
  const [isDbSubmitting, setDbSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isShare, setShare] = useState(false);
  const inputLoader = useRef(null);
  const { user } = useContext(AppContext);

  const {
    dataResponse, progress, setFileData,
  } = useStorageUpload(INITIAL_STATE);

  const {
    handleChange, handleBlur, values, errors, clearErrors,
  } = useFormValidation(INITIAL_STATE, photoValidation);

  const { setDbData, setReadyToSend } = useFirebaseUpload(photoLocation());

  const handleButtonLoader = () => {
    handleBlur();
    setDbData(values);
    inputLoader.current.value = '';
    setTimeout(() => {
      clearErrors();
      dataResponse.downloadUrl = '';
      setShare(false);
    }, 0);
  };

  useEffect(() => {
    let didCancel = false;
    const prepareData = () => {
      values.imageUrl = dataResponse?.downloadUrl;
      values.nameInStorage = dataResponse?.nameInStorage;
      values.share = isShare;
      if (user) { values.userId = user?.uid; }
      if (!values.imageUrl) { values.imageUrl = ''; }
      if (!values.nameInStorage) { values.nameInStorage = ''; }
      if (values.imageUrl.length > 0 && Object.keys(errors).length === 0) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    const prepareErrors = () => {
      const noErrors = (Object.keys(errors).length === 0 && isDbSubmitting);
      if (noErrors) {
        const handleAddPhotoInfo = () => {
          if (!dataResponse?.downloadUrl || Object.keys(errors).length > 0
          ) {
            setReadyToSend(false);
          } else {
            setReadyToSend(true);
          }
        };
        handleAddPhotoInfo();
        setDbSubmitting(false);
      } else {
        setDbSubmitting(false);
      }
    };

    if (!didCancel) {
      prepareData();
      prepareErrors();
    }
    return () => {
      didCancel = true;
    };
  }, [dataResponse, values, errors, isDbSubmitting, setReadyToSend, user, isShare]);

  const handleDbSubmit = (event) => {
    event.preventDefault();
    setDbSubmitting(true);
  };

  const handleCheckbox = () => {
    setShare(!isShare);
  };

  return (
    <>
      <form autoComplete="off" onSubmit={handleDbSubmit}>
        <StyledUploadWrapper>
          <StyledFormField>
            <Input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              placeholder="Name"
              type="text"
            />
            <StyledOuterContainer>
              {errors?.name && <StyledFormError>{errors?.name}</StyledFormError>}
            </StyledOuterContainer>
          </StyledFormField>
          <StyledFormField>
            <Textarea
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              placeholder="Description"
              type="text"
            />
            <StyledOuterContainer>
              {errors?.description && <StyledFormError>{errors?.description}</StyledFormError>}
            </StyledOuterContainer>
          </StyledFormField>
          <StyledOuterContainer />
          <StyledFormField>
            <InputLoader
              id="input-loader"
              ref={inputLoader}
              onBlur={handleBlur}
              type="file"
              onChange={(e) => {
                setFileData(e.target.files[0]);
              }}
            />
          </StyledFormField>
          <StyledOuterContainer />
          <StyledFormField>
            <StyledFormElement>
              <InputShared
                id="input-shared-checkbox"
                value={values.share}
                name="share"
                type="checkbox"
                checked={isShare}
                onChange={handleCheckbox}
              />
              <LabelShared htmlFor="input-shared-checkbox" />
              <StyledFormText>Visible to all users?</StyledFormText>
            </StyledFormElement>
          </StyledFormField>
          <StyledFormField>
            <ButtonLoader
              id="button-loader"
              type="submit"
              onClick={handleButtonLoader}
              secondary="true"
              disabled={isDisabled}
              name="imageUrl"
              value={values.imageUrl}
            >Add a photo to application
            </ButtonLoader>
          </StyledFormField>
        </StyledUploadWrapper>
      </form>
      <StyledOuterContainer />
      <StyledFormField>
        {(progress) && (
          <StyledProgress value={progress?.value} />
        )}
      </StyledFormField>
    </>
  );
};

UploadForm.propTypes = {
  photoLocation: PropTypes.func.isRequired,
};

export default UploadForm;
