export const isEmailValidator = (value: string) => {
  const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);
  return emailRegex.test(value);
};

export const isPhoneNumberValidator = (value: string) => {
  const phoneRegex: RegExp = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8,9})\b/);
  return phoneRegex.test(value);
};
