import React, { useState } from "react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import { Formik, Form } from "formik";
import FormikControl from "../components/Formik/FormikControl";

const ReusableForm = ({
  initialValues,
  validationSchema,
  fields = [],
  onSubmit,
  submitLabel,
  mode = "create",
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleFormSubmit = async (values, actions) => {
    try {
      await onSubmit(values);
      const message =
        mode === "update" ? "Updated successfully!" : "Created successfully!";

      setSuccessMessage(message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      actions.setSubmitting(false);

      if (mode !== "update") {
        actions.resetForm();
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      setSuccessMessage("Something went wrong!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      actions.setSubmitting(false); // ✅ make sure to reset submitting state on error too
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched, isValid, dirty, isSubmitting }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {fields
                .filter((field) => !field.hidden) // 👈 skip hidden fields
                .map((field) => (
                  <FormikControl
                    key={field.name}
                    control={field.control}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    options={field.options} // important for checkbox/radio/select
                    error={touched[field.name] && Boolean(errors[field.name])}
                    helperText={touched[field.name] && errors[field.name]}
                  />
                ))}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid || isSubmitting}
              >
                {submitLabel}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReusableForm;
