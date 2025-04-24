import * as Yup from "yup";

export const ContactSchema = Yup.object().shape({
  fname: Yup.string()
    .trim()
    .min(5, "Minimum of 5 characters required")
    .required("Name is required"),
  email: Yup.string()
    .lowercase()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  message: Yup.string()
    .min(20, "Minimum of 20 characters required")
    .max(300, "Maximum of 300 characters required")
    .required("Message is required"),
});

export const EventSchema = Yup.object({
  name: Yup.string().required("Event name is required"),
  event: Yup.string().required("Event description is required"),
  message: Yup.string()
    .min(20, "Minimum of 20 characters")
    .required("Message is required"),
  // date: Yup.date().required("Date is required"),
  // subject: Yup.string().required("Subject is required"),
  // eventFor: Yup.array()
  //   .min(1, "At least one audience should be selected")
  //   .required("Event audience is required"),
  // date: Yup.date().required("Date is required").nullable(),
});

export const PrimarySchema = Yup.object().shape({
  name: Yup.string().required("Student name is required"),
  class: Yup.string()
    .oneOf([
      "Creche",
      "KG-1",
      "KG-2",
      "Nursery-1",
      "Nursery-2",
      "Primary-1",
      "Primary-2",
      "Primary-3",
      "Primary-4",
      "Primary-5",
    ])
    .required("Class is required"),
  gender: Yup.string()
    .oneOf(["Male", "Female", "Other"], "Please select a valid gender")
    .required("Gender is required"),
  house: Yup.string()
    .oneOf(["red", "yellow", "blue", "green"], "Select a sport house ")
    .required("Student house is required"),
  status: Yup.string()
    .oneOf(["paid", "not-Paid", "scholarship"], "Select a payment ")
    .required("Payment Status is required"),
});

export const CollegeSchema = Yup.object().shape({
  name: Yup.string().required("Student name is required"),
  class: Yup.string()
    .oneOf([
      "JSS-1",
      "JSS-2",
      "JSS-3",
      "SSS-1",
      "SSS-2",
      "SSS-3",
    ])
    .required("Class is required"),
  gender: Yup.string()
    .oneOf(["Male", "Female", "Other"], "Please select a valid gender")
    .required("Gender is required"),
  house: Yup.string()
    .oneOf(["red", "yellow", "blue", "green"], "Select a sport house ")
    .required("Student house is required"),
  status: Yup.string()
    .oneOf(["paid", "not-Paid", "scholarship"], "Select a payment ")
    .required("Payment Status is required"),
});

export const AcademicSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  subject: Yup.string().required("Subject is required"),
  score: Yup.number()
    .typeError("Score must be a number")
    .required("Score is required"),
  gender: Yup.string()
    .oneOf(["Male", "Female", "Other"], "Please select a valid gender")
    .required("Gender is required"),
});

export const TestimonialSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});
