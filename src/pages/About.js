import React from "react";
import { userData } from "../context/commonConst";

function About() {
  return (
    <>
      <div>About</div>
      <div>{userData.uid}</div>
    </>
  );
}
export default About;
