export const validate = (values: any) => {
  const errors: any = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.username) {
    errors.username = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  } else if (!/^(\+7)(\s\d{3})(\s\d{3})(-\d{2}){2}$/.test(values.phone)) {
    errors.phone = 'Invalid phone number';
  }

  return errors;
};