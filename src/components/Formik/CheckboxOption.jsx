import React from "react";
import { Field } from "formik";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";

const CheckboxOption = ({
  name,
  label,
  options = [],
  error,
  helperText,
  ...rest
}) => {
  return (
    <FormControl component="fieldset" error={error}>
      <FormLabel component="legend" htmlFor={name}>
        {label}
      </FormLabel>
      <Field name={name}>
        {({ field, meta }) => (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                id={option.name}
                key={option.value}
                control={
                  <Checkbox
                    {...field}
                    value={option.value}
                    checked={field.value.includes(option.value)}
                    onChange={(event) => {
                      const setValue = event.target.checked
                        ? [...field.value, option.value]
                        : field.value.filter((val) => val !== option.value);
                      field.onChange({ target: { name, value: setValue } });
                    }}
                    {...rest} // ❌ this might be spreading helperText to the DOM!
                  />
                }
                label={option.value}
              />
            ))}
            {/* Show error message from Formik's meta or passed error */}
            {(meta.touched && meta.error) || error ? (
              <FormHelperText>{meta.error || helperText}</FormHelperText>
            ) : null}
          </FormGroup>
        )}
      </Field>
    </FormControl>
  );
};

export default CheckboxOption;
