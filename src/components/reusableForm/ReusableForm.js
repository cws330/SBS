import React, { useState } from "react";
import "./forms.css";
import PhoneInput from "react-phone-input-2";
import { serverTimestamp } from "firebase/firestore";

const ReusableForm = ({ formData, onSubmit, user, formName }) => {
  const [inputs, setInputs] = useState({
    addedBy: user,
    timestamp: serverTimestamp(),
  });

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(inputs);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-title'>{formName}</div>

        {formData.map((field) => {
          switch (field.type) {
            case "text":
              return (
                <div key={field.name} className='form-group'>
                  {field.label}
                  <input
                    type='text'
                    className='form-control'
                    id={field.name}
                    name={field.name}
                    placeholder={field.label}
                    value={inputs[field.name] || ""}
                    onChange={handleInputChange}
                    required={field.required}
                  />
                </div>
              );
            case "number":
              return (
                <div key={field.name} className='form-group'>
                  {field.label}
                  <input
                    type='text'
                    className='form-control'
                    id={field.name}
                    name={field.name}
                    placeholder={field.label}
                    value={Number(inputs[field.name]) || ""}
                    onChange={handleInputChange}
                    required={field.required}
                  />
                </div>
              );

            case "email":
              return (
                <div key={field.name} className='form-group'>
                  <input
                    type='email'
                    id={field.name}
                    name={field.name}
                    className='form-control'
                    placeholder={field.label}
                    value={inputs[field.name] || ""}
                    onChange={handleInputChange}
                    required={field.required}
                  />
                </div>
              );
            case "phone":
              return (
                <div key={field.name} className='form-group'>
                  <input
                    type='tel'
                    id={field.name}
                    name={field.name}
                    value={inputs[field.name] || ""}
                    placeholder={field.label}
                    onChange={handleInputChange}
                    required={field.required}
                    pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                  />
                </div>
              );
            case "textarea":
              return (
                <div key={field.name} className='form-group'>
                  <br />
                  {field.label}
                  <textarea
                    id={field.name}
                    name={field.name}
                    placeholder={field.label}
                    className='form-control'
                    value={inputs[field.name] || ""}
                    onChange={handleInputChange}
                    required={field.required}
                  />
                </div>
              );
            case "password":
              return (
                <div key={field.name} className='form-group'>
                  <input
                    type='password'
                    id={field.name}
                    name={field.name}
                    placeholder={field.label}
                    className='form-control'
                    value={inputs[field.name] || ""}
                    onChange={handleInputChange}
                    required={field.required}
                  />
                </div>
              );
            case "address":
              return (
                <div className='form-group' key={field.name}>
                  <br />
                  {field.label}

                  <input
                    type='street'
                    className='form-control'
                    id='autocomplete'
                    name='street'
                    placeholder='Street'
                    onChange={handleInputChange}
                    required={field.required}
                  />

                  <input
                    type='city'
                    className='form-control'
                    id='inputCity'
                    placeholder='City'
                    name='city'
                    onChange={handleInputChange}
                    required={field.required}
                  />

                  <input
                    type='state'
                    className='form-control'
                    id='inputState'
                    placeholder='State'
                    name='state'
                    onChange={handleInputChange}
                    required={field.required}
                  />

                  <input
                    type='zip'
                    className='form-control'
                    id='inputZip'
                    placeholder='Zip'
                    name='zip'
                    onChange={handleInputChange}
                    required={field.required}
                  />

                  <input
                    type='county'
                    className='form-control'
                    id='inputCounty'
                    placeholder='County'
                    name='county'
                    onChange={handleInputChange}
                    required={field.required}
                  />

                  <input
                    type='country'
                    name='country'
                    className='form-control'
                    id='inputCountry'
                    placeholder='Country'
                    onChange={handleInputChange}
                    required={field.required}
                  />
                </div>
              );
            case "contact":
              return (
                <div key={field.name} className='form-group'>
                  <br />
                  {field.label}

                  <input
                    type='text'
                    className='form-control'
                    id='inputContactName'
                    name='contactName'
                    placeholder='Contact Name'
                    onChange={handleInputChange}
                    required={field.required}
                  />
                  <input
                    type='email'
                    className='form-control'
                    id='inputContactEmail'
                    name='contactEmail'
                    placeholder='Email'
                    onChange={handleInputChange}
                    required={field.required}
                  />
                  {/* <input
                    type='tel'
                    id='inputPhone'
                    className='form-control'
                    name='contactPhoneNumber'
                    pattern='[0-9]{3}-[0-9]{3}-[0-9]{3}'
                    placeholder='Phone #'
                    onChange={handleInputChange}
                    required={field.required}
                  /> */}

                  <PhoneInput
                    inputClass='contactPhoneNumber'
                    disableDropdown='true'
                    buttonClass='displayNone'
                    dropdownClass='displayNone'
                    disableSearchIcon='true'
                    country='us'
                    inputProps={{
                      name: "contactPhoneNumber",
                      required: true,
                      autoFocus: false,
                    }}
                    onChange={(phone, country, _, formattedNumber) => {
                      setInputs((inputs) => ({
                        ...inputs,
                        contactPhoneNumber: formattedNumber,
                      }));
                    }}
                  />
                </div>
              );
            default:
              return null;
          }
        })}
        <div className='form-group'>
          <button type='submit' className='form-control'>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ReusableForm;
