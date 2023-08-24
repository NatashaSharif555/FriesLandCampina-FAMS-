import React, { useState, useEffect } from "react";
import { Formio } from "formiojs";
import formDataJson from "./formData.json";
import initialSubmissionData from "./editformData.json";

const FormRenderComponent = () => {
  const formioContainer = React.createRef();
  const [showEmptyForm, setShowEmptyForm] = useState(true);
  const [formData, setFormData] = useState({});
  const handleSubmission = (submission) => {
    console.log("Form Submission Data:", submission.data);
    setFormData(submission.data);
    // Save the submission data to a JSON file
    const blob = new Blob([JSON.stringify(submission.data)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "edit.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const mapDataToFormio = (jsonData) => {
    const formioData = {
      components: jsonData.components.map((component) => {
        let formioComponent = {
          type: component.type,
          key: component.key,
          label: component.label,
        };
        return formioComponent;
      }),
    };
    return formioData;
  };
  const formioFormData = mapDataToFormio(formDataJson);
  useEffect(() => {
    if (!showEmptyForm) {
      // Create the Form.io form and attach it to the container
      Formio.createForm(formioContainer.current, formioFormData)
        .then((form) => {
          // Set the initial submission data
          form.submission = initialSubmissionData;

          form.on("submit", (submission) => {
            handleSubmission(submission);
          });
        })
        .catch((error) => {
          console.error("Error creating Form.io form:", error);
        });
    } else {
      Formio.createForm(formioContainer.current, formioFormData)
        .then((form) => {
          // Add a submit event listener to the form
          form.on("submit", (submission) => {
            handleSubmission(submission);
          });
        })
        .catch((error) => {
          console.error("Error creating Form.io form with data:", error);
        });
    }
  }, [showEmptyForm, formDataJson]);

  return (
    <div>
      <h1>Form Render</h1>
      {showEmptyForm && (
        <button onClick={() => setShowEmptyForm(!showEmptyForm)}>
          {showEmptyForm && "Edit Form"}
        </button>
      )}
      <div ref={formioContainer}></div>
    </div>
  );
};

export default FormRenderComponent;





