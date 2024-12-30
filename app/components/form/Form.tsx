/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react"; // Importing React and the useState hook
import Card from "../card/Card"; // Importing the Card component
import "./form.css"; // Importing the CSS file for styling the form
import Loader from "./loader/Loader";

function Form() {
  // State to manage loading status (true or false)
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative h-fit flex flex-col items-center pt-4 max-w-full overflow-x-hidden">
      {/* Heading for the form section */}
      <h1 className="inline-block text-2xl border-b-8 text-Text1 border-S-Orange leading-none font-bold mb-[3vh]">Choose Plan</h1>
      <h2 className="text-center text-Text2 mb-2 text-4xl 2xl:text-5xl font-bold">Choose Your Plan Type</h2>

     

      {/* Card component with the loading state passed as a prop */}
      <div className="relative">
        <Card setLoading={setLoading} />
      </div>
    </div>
  );
}

export default Form;
