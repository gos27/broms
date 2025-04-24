import React from "react";
import { useField, useFormikContext } from "formik";
import { TextField, MenuItem } from "@mui/material";

const Select = ({ label, name, options = [], ...rest }) => {
  const { touched, errors } = useFormikContext();
  const [field] = useField(name);

  const showError = touched[name] && errors[name];

  return (
    <>
      <TextField
        {...field}
        {...rest}
        id={name}
        select
        label={label}
        fullWidth
        error={Boolean(showError)}
        helperText={showError ? errors[name] : ""}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default Select;
