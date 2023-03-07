import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { RadioGroup } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";

const FieldRadioGroup = (fieldRenderProps: FieldRenderProps) => {
  const { id, label, valid, disabled, ...others } = fieldRenderProps;
  return (
    <FieldWrapper>
      <Label
        id={label}
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
      >
        {label}
      </Label>
      <RadioGroup {...others} />
    </FieldWrapper>
  );
};

export default FieldRadioGroup;
