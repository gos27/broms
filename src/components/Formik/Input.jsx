import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";

const Input = ({ label, name, ...rest }) => {
  return (
    <div className="my-5">
      <Field name={name}>
        {({ field, meta }) => (
          <TextField
            {...field}
            {...rest}
            fullWidth
            variant="outlined"
            label={label}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
          />
        )}
      </Field>
    </div>
  );
};

export default Input;
