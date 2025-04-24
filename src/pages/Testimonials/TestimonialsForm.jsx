import React from "react";
import ReusableForm from "../../components/ReusableForm";
import { TestimonialSchema } from "../../components/schemas/schemas";

// In TestimonialsForm.jsx

const TestimonialsForm = ({ initialData = {}, handlePost, handleUpdate }) => {
  const initialValues = {
    id: initialData?.id || "",
    name: initialData?.name || "",
    subject: initialData?.subject || "",
    message: initialData?.message || "",
  };

  const fields = [
    {
      name: "name",
      label: "Enter Name",
      control: "input",
      placeholder: "Enter Name",
      id: "name",
    },
    {
      name: "subject",
      label: "Enter Subject",
      control: "input",
      placeholder: "Enter Subject",
      id: "subject",
    },

    {
      name: "message",
      label: "Enter Message",
      control: "textarea",
      placeholder: "Enter Message",
      id: "message",
    },
  ];

  const onSubmit = (values) => {
    if (initialData?.id) {
      handleUpdate(values); // Handle update
    } else {
      handlePost(values); // Handle new post
    }
  };

  return (
    <ReusableForm
      initialValues={initialValues}
      validationSchema={TestimonialSchema}
      fields={fields}
      onSubmit={onSubmit}
      submitLabel={initialData?.id ? "Update Testimonial" : "Add Testimonial"}
      enableReinitialize
    />
  );
};

export default TestimonialsForm;
