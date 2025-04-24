import React from "react";
import { useField, useFormikContext } from "formik";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio as MuiRadio,
  FormHelperText,
} from "@mui/material";

const RadioButtons = ({ label, name, options = [], ...rest }) => {
  const { touched, errors } = useFormikContext();
  const [field] = useField(name);

  const showError = touched[name] && errors[name];

  return (
    <FormControl component="fieldset" error={Boolean(showError)}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row={rest.row} // Use the row prop from the spread rest
        {...field}
        name={name}
        onChange={(e) => field.onChange(e)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<MuiRadio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {showError && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

export default RadioButtons;
