import { useState, useEffect } from 'react';

const useFormValidation = (initialState, validate, authenticate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    const noErrors = (Object.keys(errors).length === 0 && isSubmitting);
    if (noErrors) {
      authenticate();
      setSubmitting(false);
    } else {
      setSubmitting(false);
    }
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
    handleChange, handleSubmit, handleBlur, isSubmitting, values, errors,
  };
};

export default useFormValidation;
