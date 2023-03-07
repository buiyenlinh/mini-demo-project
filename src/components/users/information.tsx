import { Dispatch, SetStateAction } from "react";
import {
  DatePicker,
  DatePickerChangeEvent,
} from "@progress/kendo-react-dateinputs";
import { Field, FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import InputError from "../input/input-error";
import FieldRadioGroup from "../radio";

interface InformationProps {
  birthday: Date;
  setBirthday: Dispatch<SetStateAction<Date>>;
}
const Information = ({ birthday, setBirthday }: InformationProps) => {
  const fullNameValidator = (value: string) => {
    return value ? "" : "This field is required.";
  };

  const handleChangeBirthday = (event: DatePickerChangeEvent) => {
    if (event.value) {
      setBirthday(event.value);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <Field
          name="fullName"
          component={InputError}
          label="Full name"
          validator={fullNameValidator}
        />
      </div>
      <div className="mb-3">
        <Field
          name="gender"
          component={FieldRadioGroup}
          label="Gender"
          data={[
            {
              label: "Female",
              value: "female",
            },
            { label: "Male", value: "male" },
            { label: "Other", value: "other" },
          ]}
        />
      </div>
      <div className="mb-3">
        <FieldWrapper>
          <Label>Birthday</Label>
          <DatePicker
            defaultValue={birthday}
            format="dd/MM/yyyy"
            onChange={handleChangeBirthday}
          />
        </FieldWrapper>
      </div>
    </div>
  );
};

export default Information;
