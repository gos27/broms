import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Container,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import FormikControl from "../../components/Formik/FormikControl";
import { ContactSchema } from "../../components/schemas/schemas";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Contact = () => {
  const pageTitle = "Contact";
  useEffect(() => {
    document.title = pageTitle || "Broms";
  }, [pageTitle]);

  const [records, SetRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    fname: "",
    email: "",
    phone: "",
    message: "",
  };

  const handleSubmit = async (formData, actions) => {
    setLoading(true); // Start loading
    try {
      console.log("Submitting form data:", formData);
      const docRef = await addDoc(collection(db, "contacts"), formData);
      SetRecords((prev) => [...prev, { id: docRef.id, ...formData }]);
      toast.success("Message sent successfully", { icon: "✅", theme: "dark" });
      setOpen(true);
      actions.resetForm();
    } catch (error) {
      toast.error("Error sending message!", { icon: "⚠️", theme: "dark" });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className="">
        <Box className="bg-blue-600 py-16 text-center text-white">
          <h2 className="text-4xl font-bold">Contact Us</h2>
          <p className="mt-4 text-lg">
            📧 Email:
            <a
              href="mailto:contact@school.edu"
              className="underline hover:text-yellow-300"
            >
              contact@school.edu
            </a>
          </p>
          <p className="mt-2 text-lg">
            <a
              href="tel:+1234567890"
              className="underline hover:text-yellow-300"
            >
              +123 456 7890
            </a>
          </p>
          <address className="mt-2 text-lg">
            📍 Amuyo Street, Offa 250101, Kwara
          </address>

          {/* Call-to-action button */}
          <div className="mt-6">
            <a
              href="mailto:contact@school.edu"
              className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-blue-900 shadow-lg transition hover:bg-yellow-500"
            >
              Send a Message
            </a>
          </div>

          {/* Contact Form */}
          <Container className="mx-auto mt-10 max-w-lg rounded-lg bg-white p-6 text-gray-800 shadow-md">
            <h3 className="mb-4 text-2xl font-semibold text-blue-700">
              Send Us a Message
            </h3>
            <Paper elevation={3} className="rounded-lg p-6">
              <Formik
                initialValues={initialValues}
                validationSchema={ContactSchema}
                onSubmit={handleSubmit} // Fix to call handleSubmit correctly
              >
                {({ errors, touched, isValid, dirty }) => (
                  <Form autoComplete="off">
                    <Snackbar
                      open={open}
                      autoHideDuration={4000}
                      onClose={() => setOpen(false)}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                      <Alert
                        onClose={() => setOpen(false)}
                        severity="success"
                        sx={{ width: "100%" }}
                      >
                        Form Submitted successfully...!
                      </Alert>
                    </Snackbar>
                    <div>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Full Name"
                        name="fname"
                        id="fname"
                        placeholder="Full Name"
                        error={errors.fname && touched.fname}
                        helperText={touched.fname && errors.fname}
                      />
                    </div>

                    <FormikControl
                      control="input"
                      type="email"
                      label="Email address"
                      name="email"
                      id="email"
                      autoComplete="off"
                      placeholder="Enter Email Address"
                      error={errors.email && touched.email}
                      helperText={touched.email && errors.email}
                    />
                    <FormikControl
                      control="input"
                      type="tel"
                      label="Phone Number"
                      name="phone"
                      id="phone"
                      autoComplete="off"
                      placeholder="Enter Phone Number"
                      error={errors.phone && touched.phone}
                      helperText={touched.phone && errors.phone}
                    />
                    <FormikControl
                      control="textarea"
                      label="Enter your message ..."
                      placeholder="Enter message here...."
                      name="message"
                      error={errors.message && touched.message}
                      helperText={touched.message && errors.message}
                    />

                    {/* Submit Button with Spinner */}
                    <Button
                      type="submit"
                      disabled={!isValid || !dirty || loading}
                      fullWidth
                      variant="contained"
                      endIcon={!loading && <SendIcon />}
                      sx={{
                        mt: 4,
                        position: "relative",
                        borderRadius: "30px",
                        padding: "12px 24px",
                        "&:hover": {
                          backgroundColor: "success.dark",
                        },
                      }}
                    >
                      {loading ? (
                        <CircularProgress
                          size={24}
                          color="inherit"
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Container>
        </Box>
      </div>
    </>
  );
};

export default Contact;
