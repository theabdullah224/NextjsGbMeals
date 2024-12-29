/* eslint-disable @typescript-eslint/no-unused-vars */


import cardbgimg from "../../public/Resource/bgcardimg.png";
import tickIcon from "../../public/Resource/tick.svg";
import egg from "../../public/Resource/eggs.svg";
import cheese from "../../public/Resource/cheese.svg";
import tufo from "../../public/Resource/tofu.svg";
import butter from "../../public/Resource/butter.svg";
import coconut from "../../public/Resource/coconut.svg";
import plus from "../../public/Resource/plusc.svg";
import chicken from "../../public/Resource/Chicken.svg";
import pork from "../../public/Resource/pork.svg";
import beef from "../../public/Resource/beef.svg";
import fish from "../../public/Resource/fish.svg";
import mashroom from "../../public/Resource/mashroom.svg";
import lowcarb from "../../public/Resource/lowcarbs.svg";
import balancediet from "../../public/Resource/balanceddiet.svg";
import carnivore from "../../public/Resource/cornivorediet.svg";
import paleo from "../../public/Resource/paleodiet.svg";
import diaryfree from "./Resource/diaryfree.svg";
import glotenfree from "../../public/Resource/glotenfree.svg";
import servings from "../../public/Resource/servings.svg";
import minus from "./Resource/minus.svg";
import arrow from "./Resource/arrow.svg";
import Loader from "../../../public/Resource/spinner.svg";
import Logo from "../../../public/Resource/logo2.png";

export const cards = [
  {
    subtitle: "Discover",
    title: "Choose Your Preferred/Popular Meal Plan",
    description: "Tell us about the Preferred/Popular Meal Plan",

    elements: [
      {
        type: "radio",
        name: "dietaryRestrictions",
        label: "Balanced diet",
        image: balancediet.src,
        info: `<div style="padding:10px; width:14rem;"><b>Vegetarian Diet</b>
          <b>Benefits:</b>
          <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Lower levels of cholesterol, lower blood pressure, and reduced risk of heart disease.</li>
              <li>Some studies show a lower risk of certain types of cancer.</li>
              <li>Generally lower in calories, helping to manage or reduce weight.</li>
          </ul> <br>
          <b>Considerations:</b>
          <ul style="list-style-type: disc; margin-left: 20px;">
              <li>If not carefully managed, can lead to insufficient protein intake.</li>
              <li>Lack of meat increases the risk of deficiencies in these nutrients.</li>
              <li>Some vegetarian diets can be high in carbohydrates, which might not suit everyone's health goals.</li>
          </ul></div>`,
      },
      {
        type: "radio",
        name: "dietaryRestrictions",
        label: "Low Carb",
        image: lowcarb.src,
        info: `<div style="padding:10px; width:14rem;"><b>Low-Carb Diet - Benefits:</b>
    <ul style="list-style-type: disc; margin-left: 20px;">
      <li>May improve metabolic health by reducing insulin levels, helping the body burn fat more efficiently.</li>
      <li>Often leads to improvements in significant cardiovascular risk factors, such as decreasing triglycerides and increasing HDL cholesterol levels.</li>
      <li>Beneficial for managing diabetes and reducing insulin resistance.</li>
    </ul><br>
    <b>Diet Considerations:</b>
          <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Some individuals might experience a temporary decrease in energy as the body adjusts to fewer carbohydrates.</li>
              <li>Ensures sufficient intake of essential nutrients through carefully selected low-carb vegetables and foods.</li>
          </ul></div>
    `,
      },

      {
        type: "radio",
        name: "dietaryRestrictions",
        label: "Carnivore diet",
        image: carnivore.src,
        info: `<div style="padding:10px; width:14rem;"><b>Carnivore Diet</b>
      <b>Benefits:</b>
      <ul style="list-style-type: disc; margin-left: 20px;">
          <li>Focuses primarily on animal-based foods, which streamlines dietary choices.</li>
          <li>Some people report improvements in autoimmune symptoms.</li>
          <li>High protein and fat content can naturally help control appetite and reduce calorie intake.</li>
      </ul> <br> 
      <b>Considerations:</b>
      <ul style="list-style-type: disc; margin-left: 20px;">
          <li>Completely excludes plant-based foods, potentially leading to digestive issues such as constipation.</li>
          <li>May result in deficiencies in certain vitamins and antioxidants found predominantly in plant foods.</li>
      </ul></div>`,
      },
      {
        type: "radio",
        name: "dietaryRestrictions",
        label: "Paleo diet",
        image: paleo.src,
        info: `<div style="padding:10px; width:14rem;">
          
           <b>Paleo Diet</b>
      <b>Benefits:</b>
      <ul style="list-style-type: disc; margin-left: 20px;">
          <li>Focuses on consuming whole, unprocessed foods, which can enhance overall health.</li>
          <li>High fibre intake from fruits and vegetables supports a healthy digestive system.</li>
          <li>Free from dairy, grains, and processed foods, benefiting those with specific food sensitivities.</li>
      </ul> <br>
      <b>Considerations:</b>
      <ul style="list-style-type: disc; margin-left: 20px;">
          <li>Excludes grains and dairy, which can lead to potential gaps in calcium and other nutrients if not properly managed.</li>
          <li>Sometimes requires more specialized ingredients which can be more expensive and less accessible.</li>
      </ul></div>`,
      },
      {
        type: "radio",
        name: "dietaryRestrictions",
        label: "Vegetarian",
        image: balancediet.src,
      },
    ],
  },

  {
    subtitle: "Choose",
    title: "How Many Servings Do You Need?",
    description: "Select the number of servings you need per meal.",

    elements: [
      {
        type: "radio",
        name: "servings",
        label: "1 Serving",
        image: servings.src,
        info: "",
      },
      {
        type: "radio",
        name: "servings",
        label: "2 Servings",
        image: servings.src,
        info: "",
      },
      {
        type: "radio",
        name: "servings",
        label: "3 Servings",
        image: servings.src,
        info: "",
      },
      {
        type: "radio",
        name: "servings",
        label: "4 Servings",
        image: servings.src,
        info: "",
      },
    ],
  },

  {
    subtitle: "Discover",
    title: "Tell Us About Your Food Allergies",
    description: "We want to make sure your meal plan is tailored to your needs. Let us know if you have any food allergies so we can provide you with delicious and safe recipes.",

    elements: [
      {
        type: "radio",
        name: "FoodAllergies",
        label: "Eggs",
        image: egg.src,
        info: "",
      },
      {
        type: "radio",
        name: "FoodAllergies",
        label: "Cheese",
        image: cheese.src,
        info: "",
      },
      {
        type: "radio",
        name: "FoodAllergies",
        label: "Tofu",
        image: tufo.src,
        info: "",
      },
      {
        type: "radio",
        name: "FoodAllergies",
        label: "Butter",
        image: butter.src,
        info: "",
      },
      {
        type: "radio",
        name: "FoodAllergies",
        label: "Coconut",
        image: coconut.src,
        info: "",
      },
    ],
  },
  {
    subtitle: "Discover",
    title: "Choose Your Preferred Calories",
    description: "Choose your calorie intake based on personal preferences.",

    elements: [
      {
        type: "radio",
        name: "preferredMeal",
        label: "Recomended (2000 - 2500 calories)",
        image: glotenfree.src,
        info: "",
      },
    ],
  },

  {
    subtitle: "Discover",
    title: "Tell us about the food you dislike",
    description: "Tell us about the food you dislike",

    elements: [
      {
        type: "radio",
        name: "dislike",
        label: "Chicken",
        image: chicken.src,
        info: "",
      },
      {
        type: "radio",
        name: "dislike",
        label: "Pork",
        image: pork.src,
        info: "",
      },
      {
        type: "radio",
        name: "dislike",
        label: "Beef",
        image: beef.src,
        info: "",
      },
      { type: "radio", name: "dislike", label: "fish", image: fish },
      {
        type: "radio",
        name: "dislike",
        label: "Mushrooms",
        image: mashroom.src,
        info: "",
      },
    ],
  },

  {
    subtitle: "Details",
    title: "Your Details",
    description: "",

    elements: [
      { type: "text", placeholder: "Your Name" },
      { type: "email", placeholder: "Email Address" },
      { type: "password", placeholder: "Password" },
    ],
  },
  {
    subtitle: "Log In",
    title: "",
    description: "",
    elements: [
      { type: "email", placeholder: "Email Address" },
      { type: "password", placeholder: "Password" },
    ],
  },
];
