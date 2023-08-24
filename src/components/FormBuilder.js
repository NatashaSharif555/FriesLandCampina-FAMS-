// // // import React, { useState } from "react";
// // // import 'formiojs/dist/formio.full.min.css'; // Main Form.io CSS
// // // import 'formiojs/dist/formio.builder.min.css'; // Form Builder CSS

// // // import { FormBuilder , FormEdit} from "react-formio";

// // // const FormComponet = () => {
// // //   const [form, setForm] = useState({
// // //     components: [
// // //       {
// // //         type: "textfield",
// // //         key: "firstName",
// // //         label: "First Name",
// // //         input: true,
// // //       },
// // //       {
// // //         type: "textfield",
// // //         key: "lastName",
// // //         label: "Last Name",
// // //         input: true,
// // //       },
// // //       // Add more form components here
// // //     ],
// // //   });

// // //   const handleFormChange = (newForm) => {
// // //     setForm(newForm);
// // //   };
// // //   return (

// // //       <FormEdit saveForm={()=>console.log("aiman")} form={{ display: 'form' }}>
// // //               <FormBuilder form={form} onChange={handleFormChange} />
// // //               </FormEdit>

// // //     )

// // // }

// // // export default FormComponet;

// // import React, { useState } from "react";

// // import { FormBuilder } from "react-formio";

// // const FormComponet = () => {
// //   const [form, setForm] = useState({ components: [] });

// //   const onSubmit = (schema) => {
// //     setForm(schema);
// //   };
// //   const saveData = (data) => {
// //     localStorage.setItem('formdata' , data)
// //   }

// //   return (
// //     <div className="form-builder">
// //      <button onClick={saveData}></button>

// //       <FormBuilder form={form} onSave={onSubmit} />

// //       {form.components.length > 0 && (
// //         <div className="form-preview">
// //           <h2>Form Preview</h2>

// //           {/* Render a preview of the form using formio.js */}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default FormComponet;

// import React, { useState } from "react";

// import { FormBuilder } from "react-formio";

// const FormComponent = () => {
//   const [form, setForm] = useState({ components: [] });

//   const onSubmit = (schema) => {
//     setForm(schema);
//   };

//   const saveData = () => {
//     // Send a POST request to the server to save the data
//     fetch("/saveFormData", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.message);
//       })
//       .catch((error) => {
//         console.error("Error saving data:", error);
//       });
//   };

//   return (
//     <div className="form-builder">
//       <button onClick={saveData}>Save Form Data</button>

//       <FormBuilder form={form} onSave={onSubmit} />

//       {form.components.length > 0 && (
//         <div className="form-preview">
//           <h2>Form Preview</h2>
//           {/* Render a preview of the form using formio.js */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FormComponent;

import React, { useState } from "react";
import { FormBuilder } from "react-formio";

const FormComponent = () => {
  const [form, setForm] = useState({ components: [] });

  const onSubmit = (schema) => {
    setForm(schema);
  };

  const saveFormConfigurationToFile = async () => {
    const formData = {};

    // Loop through form components to collect field values
    form.components.forEach((component) => {
      if (component.key) {
        formData[component.key] = component.defaultValue;
      }
    });

    const jsonData = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "formConfiguration.json"; // Set the download file name
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="form-builder">
      <h1>Form Builder</h1>

      <FormBuilder form={form} onSave={onSubmit} />
      <button onClick={saveFormConfigurationToFile}>Export Form</button>
      {form.components.length > 0 && (
        <div className="form-preview">
          <h2>Form Preview</h2>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
