import { useState, useEffect } from 'react';

const useFormValidation = (initialState, validate, authenticate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const clearErrors = () => {
    setErrors(Object.keys(errors).length === 0);
    setValues({
      name: '',
      description: '',
      imageUrl: '',
    });
  };

  useEffect(() => {
    let didCancel = false;

    const prepareErrors = () => {
      const noErrors = (Object.keys(errors).length === 0 && isSubmitting);
      if (noErrors) {
        authenticate();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    };

    if (!didCancel) {
      prepareErrors();
    }

    return () => {
      didCancel = true;
    };
  }, [errors, isSubmitting, authenticate]);

  const handleChange = (event) => {
    event.persist();
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    values,
    errors,
    clearErrors,
  };
};

export default useFormValidation;
