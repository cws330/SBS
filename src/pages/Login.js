import React, { useContext, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./login.css";
import ReusableForm from "../components/reusableForm/ReusableForm";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log(user);

        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const loginFormData = [
    { type: "email", name: "email", label: "Email", required: true },
    { type: "password", name: "password", label: "Password", required: true },
  ];

  const login = (inputs) => {
    signInWithEmailAndPassword(auth, inputs.email, inputs.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...

        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          navigate("/signup");
        }
        // const errorMessage = error.message;
        setError(true);
        setErrMsg(errorCode);
      });
  };

  return (
    <>
      <div className='login'>
        <ReusableForm
          formData={loginFormData}
          onSubmit={login}
          formName='Login'
          error={error || "false"}
          errorMsg={errMsg}
        />
        <div>{error && <span> {errMsg}</span>}</div>

        <button onClick={googleLogin}>Sign In with Google</button>
        <br></br>
        <p>Not registered yet? Click to Signup.</p>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
    </>
  );
}

export default Login;
