export default function LoginValidation(values) {
  const errors = {};
  // Email errors
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  // Password errors
  if (!values.password) {
    errors.password = 'Password required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  return errors;
}
