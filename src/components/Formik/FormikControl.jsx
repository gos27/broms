import React from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import DateInput from "./DateInput";
import SelectButton from "./SelectButton";
import RadioButtons from "./RadioButtons";
import CheckboxOption from "./CheckboxOption"; // 👈 Make sure this is correct

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "date":
      return <DateInput {...rest} />;
    case "select":
      return <SelectButton {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckboxOption {...rest} />;
    default:
      return (
        <p style={{ color: "red" }}>
          ⚠️ Unknown Formik control: <strong>{control}</strong>
        </p>
      );
  }
};

export default FormikControl;
