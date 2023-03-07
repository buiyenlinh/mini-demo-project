import { Field } from "@progress/kendo-react-form";
import { isEmailValidator, isPhoneNumberValidator } from "../../helper";
import InputError from "../input/input-error";

const Contact = () => {
  const addressValidator = (value: string) => {
    return value ? "" : "This field is required.";
  };

  const emailValidator = (value: string) => {
    return isEmailValidator(value) ? "" : "Please enter a valid email.";
  };

  const phoneNumberValidator = (value: string) => {
    return isPhoneNumberValidator(value)
      ? ""
      : "Please enter a valid phone number.";
  };

  return (
    <div>
      <div className="mb-3">
        <Field
          name="email"
          component={InputError}
          label="Email"
          validator={emailValidator}
        />
      </div>

      <div className="mb-3">
        <Field
          name="phoneNumber"
          component={InputError}
          label="Phone number"
          validator={phoneNumberValidator}
        />
      </div>

      <div className="mb-3">
        <Field
          name={"address"}
          component={InputError}
          label="Address"
          validator={addressValidator}
        />
      </div>
    </div>
  );
};

export default Contact;
