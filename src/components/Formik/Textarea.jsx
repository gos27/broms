import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";

const Textarea = ({ label, name, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className="my-5">
          <TextField
            {...field}
            {...rest}
            id={name}
            fullWidth
            variant="outlined"
            label={label}
            multiline
            rows={10}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
          />
        </div>
      )}
    </Field>
  );
};

export default Textarea;
