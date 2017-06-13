import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * validateInput - description
 *
 * @param  {type} data description
 * @return {type}      description
 */
export default function validateInput(data) {
  const errors = {};
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid. Try again.';
  }

  if (data.password && data.password.length < 6) {
    errors.password = 'Passwords must have at least 6 characters.';
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
