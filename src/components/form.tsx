import React, { useState, useEffect , useRef} from "react";
import { Formio } from "formiojs";
import formDataJson from "./JsonFiles/EditFormBuilder.json";
import initialSubmissionData from "./JsonFiles/editformData.json";

const FormRenderComponent = () => {
  const formioContainer = useRef<HTMLDivElement>(null);
  const [showEmptyForm, setShowEmptyForm] = useState(true);
  const [formData, setFormData] = useState({});

// handle form submisssion function
  const handleSubmission = (submission:any) => {
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

  //map function to map the data from json file
  const mapDataToFormio = (jsonData:any) => {
    const formioData = {
      components: jsonData.components.map((component:any) => {
        let formioComponent = {
          type: component.type,
          key: component.key,
          label: component.label,
          validate: component.validate,
          placeholder:component.placeholder
        };
        return formioComponent;
      }),
    };
    return formioData;
  };

  // map the json data in mapDataToFormio function
  const formioFormData = mapDataToFormio(formDataJson);
  useEffect(() => {
    if (!showEmptyForm) {

      // Create the Edit Form.io form and attach it to the container
      Formio.createForm(formioContainer.current, formioFormData)
        .then((form) => {
          // Set the initial submission data
          form.submission = initialSubmissionData;

          //call the handlesubmission function on submit of form
          form.on("submit", (submission:any) => {
            handleSubmission(submission);
          });
        })
        .catch((error) => {
          console.error("Error creating Form.io form:", error);
        });
    } else {
     // Create the new Form.io form and attach it to the container
      Formio.createForm(formioContainer.current, formioFormData)
        .then((form) => {
          // Add a submit event listener to the form
          form.on("submit", (submission:any) => {
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
