import React, {
  useContext, useEffect, useState, useRef,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { StyledOuterContainer, StyledFormError } from 'components/componentsStyled';
import { Input, Textarea, Button } from 'components/shared';
import photoValidation from 'validations/photoValidation';
import useFirebaseUpload from 'hooks/useFirebaseUpload';
import useFormValidation from 'hooks/useFormValidation';
import FirebaseContext from '../../firebase/context';

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

const GalleryPhotoUpload = () => {
  const COLLECTION_URL = 'galleries';
  const IMAGE_URLS = 'imageUrls';
  const { gid } = useParams();
  const PHOTO_LOCATION = `/${COLLECTION_URL}/${gid}/${IMAGE_URLS}`;
  const navigate = useNavigate();
  const { fbase, user } = useContext(FirebaseContext);
  const [isDbSubmitting, setDbSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const inputLoader = useRef(null);
  const {
    dataResponse, progress, setFileData,
  } = useFirebaseUpload(INITIAL_STATE);
  const {
    handleChange, handleBlur, values, errors, clearErrors,
  } = useFormValidation(INITIAL_STATE, photoValidation);

  const handleButtonLoader = () => {
    handleBlur();
    inputLoader.current.value = '';
    setTimeout(() => {
      clearErrors();
      dataResponse.downloadUrl = '';
    }, 0);
  };

  useEffect(() => {
    const { name, description, imageUrl } = values;
    values.imageUrl = dataResponse?.downloadUrl;

    if (!values.imageUrl) {
      values.imageUrl = '';
    }
    if (values.imageUrl.length > 0 && Object.keys(errors).length === 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    const addPhotoInfoToFirebase = () => {
      setIsDisabled(true);
      const newPhoto = {
        name,
        description,
        imageUrl,
        created: Date.now(),
      };
      const addNewPhoto = !user
        ? navigate('/login')
        : fbase.db.collection(PHOTO_LOCATION).add(newPhoto);
      return addNewPhoto;
    };

    const noErrors = (Object.keys(errors).length === 0 && isDbSubmitting);
    if (noErrors) {
      const handleAddPhotoInfo = () => {
        if (!dataResponse?.downloadUrl || Object.keys(errors).length > 0
        ) {
          // console.log('No downloadUrl');
        } else {
          addPhotoInfoToFirebase();
        }
      };
      handleAddPhotoInfo();
      setDbSubmitting(false);
    } else {
      setDbSubmitting(false);
    }
  }, [PHOTO_LOCATION, isDisabled, fbase.db, navigate, dataResponse, values, user, errors, isDbSubmitting]);

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

export default GalleryPhotoUpload;
