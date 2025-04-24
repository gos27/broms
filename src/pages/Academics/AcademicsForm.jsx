// import React from "react";
// import ReusableForm from "../../components/ReusableForm";
// import { AcademicSchema } from "../../components/schemas/schemas";

// const AcademicForm = ({ initialData = {}, handlePost, handleUpdate }) => {
//   const safeData = initialData || {};

//   const initialValues = {
//     id: safeData.id || "",
//     name: safeData.name || "",
//     subject: safeData.subject || "",
//     score: safeData.score || "",
//   };

//   const fields = [
//     {
//       name: "name",
//       label: "Name",
//       control: "input",
//       placeholder: "Enter name",
//     },
//     {
//       name: "subject",
//       label: "Subject",
//       control: "input",
//       placeholder: "Enter subject",
//     },
//     {
//       name: "score",
//       label: "Score",
//       control: "input",
//       type: "number",
//       placeholder: "Enter score",
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
//       validationSchema={AcademicSchema}
//       fields={fields}
//       onSubmit={onSubmit}
//       submitLabel={safeData.id ? "Update" : "Add"}
//       mode={safeData.id ? "update" : "create"}
//     />
//   );
// };

// export default AcademicForm;
