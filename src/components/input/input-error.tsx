import { FieldRenderProps } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Error } from "@progress/kendo-react-labels";

const InputError = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;

  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

export default InputError;
