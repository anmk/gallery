export default function photoValidation(values) {
  const errors = {};
  // Name errors
  if (!values.name) {
    errors.name = 'Name required';
  } else if (values.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  return errors;
}
