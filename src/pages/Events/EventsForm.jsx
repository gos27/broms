// import React from "react";
// import ReusableForm from "../../components/ReusableForm";
// import { EventSchema } from "../../components/schemas/schemas";

// const EventForm = ({ initialData = {}, handlePost, handleUpdate }) => {
//   const safeData = initialData || {};

//   const initialValues = {
//     id: safeData.id || "",
//     name: safeData.name || "",
//     subject: safeData.subject || "",
//     eventFor: Array.isArray(safeData.eventFor) ? safeData.eventFor : [],
//     event: safeData.event || "",
//     date: safeData.date || "",
//   };

//   const eventOptions = [
//     { label: "Students", value: "Students" },
//     { label: "Teachers", value: "Teachers" },
//     { label: "PTA-Groups", value: "PTA-Groups" },
//   ];

//   const fields = [
//     {
//       name: "name",
//       label: "Name",
//       control: "input",
//       placeholder: "Enter Name",
//     },
//     {
//       name: "subject",
//       label: "Subject",
//       control: "input",
//       placeholder: "Enter Subject",
//     },
//     {
//       name: "date",
//       label: "Date",
//       control: "date",
//       placeholder: "Select Date",
//     },
//     {
//       name: "eventFor",
//       label: "Event",
//       control: "checkbox",
//       options: eventOptions,
//     },
//     {
//       name: "event",
//       label: "Event Description",
//       control: "textarea",
//       placeholder: "Enter Event Description",
//     },
//   ];

//   const onSubmit = (values) => {
//     if (values.id) {
//       handleUpdate?.(values);
//     } else {
//       handlePost?.(values);
//     }
//   };

//   return (
//     <ReusableForm
//       initialValues={initialValues}
//       validationSchema={EventSchema}
//       fields={fields}
//       onSubmit={onSubmit}
//       submitLabel={safeData.id ? "Update" : "Add"}
//       mode={safeData.id ? "update" : "create"}
//     />
//   );
// };

// export default EventForm;
