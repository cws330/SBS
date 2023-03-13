import React, { useState } from "react";

const MultiStepForm = ({ steps }) => {
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState({});

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step === steps.length - 1) {
      console.log(formValues);
      // handle form submission here
    } else {
      setStep((step) => step + 1);
    }
  };

  const handlePrev = () => {
    setStep((step) => step - 1);
  };

  const currentStep = steps[step];

  return (
    <form onSubmit={handleSubmit}>
      {currentStep.fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            onChange={handleChange}
            value={formValues[field.name] || ""}
            required={field.required}
          />
        </div>
      ))}
      {step > 0 && (
        <button type='button' onClick={handlePrev}>
          Back
        </button>
      )}
      <button type='submit'>
        {step === steps.length - 1 ? "Submit" : "Next"}
      </button>
    </form>
  );
};

export default MultiStepForm;
