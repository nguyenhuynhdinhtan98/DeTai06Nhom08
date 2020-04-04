const emailValidator = val => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    val,
  );
};
const notEmptyValidator = val => {
  return val.trim() !== '';
};
const minLengthValidator = val => {
  return val.length >= 6;
};

export default (key, val) => {
  let isValid = true;
  switch (key) {
    case 'isEmail':
      isValid = isValid && emailValidator(val);
      break;
    case 'notEmpty':
      isValid = isValid && notEmptyValidator(val);
      break;
    case 'minLength':
      isValid = isValid && minLengthValidator(val);
      break;
    default:
      isValid = true;
  }
  return isValid;
};
