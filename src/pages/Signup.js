import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

function Signup() {
  const navigate = useNavigate();
  const [companyID, setCompanyID] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    pwConfirm: "",
    inviteCode: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const checkCompany = async () => {
    let newErrors = {};
    const q = query(
      collection(db, "companies"),
      where("companyInvite", "==", formData.inviteCode)
    );
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 1) {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setCompanyID(doc.id);
          setCompanyName(doc.data().companyName);
        });
      } else {
        newErrors.inviteCode = "Please Check Your Invite Code And Try Again";
      }
    } catch (error) {
      console.log(error);
    }
    setErrors(newErrors);
  };
  const checkExistingEmail = async () => {
    let newErrors = {};
    const q = query(
      collection(db, `companies/${companyID}/users`),
      where("email", "==", formData.email)
    );
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 1) {
        newErrors.email = "This Email is already registered, please sign in.";
      }
    } catch (error) {
      console.log(error);
    }
    setErrors(newErrors);
  };
  const emailFocus = () => {
    let newErrors = {};
    console.log(companyID);
    if (companyID === "") {
      newErrors.emailFocus = "Please Input Your Invite Code First";
    }
    setErrors(newErrors);
  };
  const passwordsMatch = () => {
    let newErrors = {};
    if (formData.password !== formData.pwConfirm) {
      newErrors.confirmPassword = "Passwords Do NOT Match";
    }
    setErrors(newErrors);
  };
  const passwordFocus = () => {
    document.getElementById("message").style.display = "block";
  };
  const passwordOnBlur = () => {
    document.getElementById("message").style.display = "none";
  };
  const passwordKeyUp = () => {
    const myInput = formData.password;
    const letter = document.getElementById("letter");
    const capital = document.getElementById("capital");
    const number = document.getElementById("number");
    const length = document.getElementById("length");

    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate length
    if (myInput.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  };
  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    passwordsMatch();

    if (isObjEmpty(errors)) {
      console.log("no errors");

      // make API call to submit data to server

      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user.uid;
          const setProfileToCompany = async () => {
            try {
              await setDoc(doc(db, `companies/${companyID}/users`, user), {
                email: formData.email,
                userLevel: Number(1),
                companyID: companyID,
                timeStamp: serverTimestamp(),
              });
              navigate(`/userProfile/${companyID}/${formData.email}`);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          };
          setProfileToCompany();
          console.log(user);

          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          // ..
        });
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <input
          type='text'
          name='inviteCode'
          placeholder='Company Invite Code'
          onChange={handleChange}
          onBlur={checkCompany}
          required
        />
        {errors.inviteCode && (
          <span className='error-message'>{errors.inviteCode}</span>
        )}
        {companyID && <span className='company-message'>{companyName}</span>}
        <br />
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          onBlur={checkExistingEmail}
          onFocus={emailFocus}
          required
        />
        {errors.email && <span className='error-message'>{errors.email}</span>}
        {errors.emailFocus && (
          <span className='error-message'>{errors.emailFocus}</span>
        )}

        <br />

        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
          onFocus={passwordFocus}
          onBlur={passwordOnBlur}
          onKeyUp={passwordKeyUp}
          pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
          title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
          required
        />
        <div id='message'>
          <span>Password must contain the following:</span>
          <p id='letter' className='invalid'>
            A <b>lowercase</b> letter
          </p>
          <p id='capital' className='invalid'>
            A <b>capital (uppercase)</b> letter
          </p>
          <p id='number' className='invalid'>
            A <b>number</b>
          </p>
          <p id='length' className='invalid'>
            Minimum <b>8 characters</b>
          </p>
        </div>

        <br />

        <input
          type='password'
          name='pwConfirm'
          placeholder='Confirm Password'
          onChange={handleChange}
          onBlur={passwordsMatch}
          required
        />
        {errors.confirmPassword && (
          <span className='error-message'>{errors.confirmPassword}</span>
        )}

        <br />
        <button type='submit'>Sign Up</button>
      </form>
      <br></br>
      <p>Already have an account? Click to Sign In.</p>
      <button onClick={() => navigate("/login")}>Sign In</button>
    </div>
  );
}

export default Signup;
