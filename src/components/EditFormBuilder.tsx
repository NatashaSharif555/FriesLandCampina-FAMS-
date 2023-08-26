import React, { useState } from "react";
import { FormBuilder } from "react-formio";
import formDataJson from "./JsonFiles/formBuilderData.json";

interface FormComponent {
  type: string;
  key: string;
  label: string;
  validate: any; // Adjust the type as needed
  // Add more properties as needed
}

interface Form {
  components: FormComponent[];
  // Add more properties as needed
}

const FormEditBuilderComponent = () => {
  const [form, setForm] = useState<Form>({ components: [] });
  //set the data from form to form state
  const onSubmit = (schema:any) => {
    setForm(schema);
  };
  //map data from json file function
  const mapDataToFormio = (jsonData:any) => {
    const formioData = {
      components: jsonData.components.map((component:any) => {
        let formioComponent = {
          type: component.type,
          key: component.key,
          label: component.label,
          validate: component.validate,
          placeholder: component.placeholder,
        };
        return formioComponent;
      }),
    };
    return formioData;
  };

  const formioFormData = mapDataToFormio(formDataJson);

  //saving data to a file
  const saveFormConfigurationToFile = async () => {
   
    let formData: any ={}; 
     formData = formioFormData;


    // Loop through form components to collect field values
    form.components.forEach((component:any) => {
      if (component.key) {
        formData[component.key] = component.defaultValue;
      }
    });
    //Convert the form data to json
    const jsonData = JSON.stringify(formData, null, 2);

    //creating blob to download json file
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
      <FormBuilder form={formioFormData} onSave={onSubmit} />
      <button onClick={saveFormConfigurationToFile}>Export Form</button>
      {form.components.length > 0 && (
        <div className="form-preview">
          <h2>Form Preview</h2>
        </div>
      )}
    </div>
  );
};

export default FormEditBuilderComponent;
