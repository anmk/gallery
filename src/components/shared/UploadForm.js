import React, { useEffect, useState, useRef } from 'react';
import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';

import photoValidation from 'validations/photoValidation';
import useStorageUpload from 'hooks/useStorageUpload';
import useFirebaseUpload from 'hooks/useFirebaseUpload';
import useFormValidation from 'hooks/useFormValidation';
import { StyledOuterContainer, StyledFormError } from 'components/componentsStyled';
import { Input, Textarea, Button } from 'components/shared';

const INITIAL_STATE = {
  name: '',
  description: '',
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

const StyledUploadElement = styled.div`
  ${StyledFlexPreferences};
  justify-content: center;
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
  &:disabled {
    color: ${({ theme }) => theme.veryDarkGrey};
    background-color: ${({ theme }) => theme.lightGrey};
    border: 1px solid ${({ theme }) => theme.darkGrey};
  }
`;

const StyledProgress = styled.progress`
  width: 100%;
`;

const UploadForm = ({ photoLocation }) => {
  const [isDbSubmitting, setDbSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const inputLoader = useRef(null);

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
    }, 0);
  };

  useEffect(() => {
    let didCancel = false;

    const prepareData = () => {
      values.imageUrl = dataResponse?.downloadUrl;

      if (!values.imageUrl) {
        values.imageUrl = '';
      }

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
  }, [dataResponse, values, errors, isDbSubmitting, setReadyToSend]);

  const handleDbSubmit = (event) => {
    event.preventDefault();
    setDbSubmitting(true);
  };

  return (
    <>
      <form autoComplete="off" onSubmit={handleDbSubmit}>
        <StyledUploadWrapper>
          <StyledUploadElement>
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
          </StyledUploadElement>
          <StyledUploadElement>
            <Textarea
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              placeholder="Description"
              type="text"
            />
          </StyledUploadElement>
          <StyledOuterContainer />
          <StyledUploadElement>
            <InputLoader
              id="input-loader"
              ref={inputLoader}
              onBlur={handleBlur}
              type="file"
              onChange={(e) => {
                setFileData(e.target.files[0]);
              }}
            />
          </StyledUploadElement>
          <StyledOuterContainer />
          <StyledUploadElement>
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
          </StyledUploadElement>
        </StyledUploadWrapper>
      </form>
      <StyledOuterContainer />
      <StyledUploadElement>
        {(progress) && (
          <StyledProgress value={progress?.value} />
        )}
      </StyledUploadElement>
    </>
  );
};

UploadForm.propTypes = {
  photoLocation: PropTypes.func.isRequired,
};

export default UploadForm;
