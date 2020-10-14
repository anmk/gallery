export default function photoValidation(values) {
  const errors = {};
  // Name errors
  if (!values.name) {
    errors.name = 'Name required';
  } else if (values.name.length < 2 || values.name.length > 13) {
    errors.name = 'Name must be between 2 and 13 characters';
  }
  // Description errors
  if (values.description.length > 24) {
    errors.description = 'Description can be up to 24 characters long';
  }
  return errors;
}
