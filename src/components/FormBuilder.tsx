import React, { useState } from "react";
import { FormBuilder } from "react-formio";

const FormComponent = () => {
  const [form, setForm] = useState({ components: [] });

  //set the data from form to form state
  const onSubmit = (schema:any) => {
    setForm(schema);
  };

  //saving data to a file
  const saveFormConfigurationToFile = async () => {
    
    const formData :any= {};

    // Loop through form components to collect field values
    form.components.forEach((component:any) => {
      if (component.key) {
        formData[component.key] = component.defaultValue;
      }
    });

//Convert the form data to json
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
