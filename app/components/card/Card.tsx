"use client";
// Importing React,necessary hooks, and assets for managing state and layout effects
import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Ensure you have this package installed
// import "./card.css"; // Import the CSS file
import Favicon from "./Resource/favicon.png";
import Logo from "../../../public/Resource/logo2.png";
import "jspdf-autotable"; // Ensure you have this package installed
// import "./card.css"; // Import the CSS file
// import { useNavigate } from "react-router-dom";

// import Payment from "./payment";

import cardbgimg from "../../../public/Resource/bgcardimg.png";
import tickIcon from "../../../public/Resource/tick.svg";
import egg from "../../../public/Resource/eggs.svg";
import cheese from "../../../public/Resource/cheese.svg";
import tufo from "../../../public/Resource/tofu.svg";
import butter from "../../../public/Resource/butter.svg";
import coconut from "../../../public/Resource/coconut.svg";
import plus from "../../../public/Resource/plusc.svg";
import chicken from "../../../public/Resource/Chicken.svg";
import pork from "../../../public/Resource/pork.svg";
import beef from "../../../public/Resource/beef.svg";
import fish from "../../../public/Resource/fish.svg";
import mashroom from "../../../public/Resource/mashroom.svg";
import lowcarb from "../../../public/Resource/lowcarbs.svg";
import balancediet from "../../../public/Resource/balanceddiet.svg";
import carnivore from "../../../public/Resource/cornivorediet.svg";
import paleo from "../../../public/Resource/paleodiet.svg";
import diaryfree from "./Resource/diaryfree.svg";
import glotenfree from "../../../public/Resource/glotenfree.svg";
import servings from "../../../public/Resource/servings.svg";
import minus from "./Resource/minus.svg";
// import plus from './Resource/plusc.svg'
import arrow from "./Resource/arrow.svg";
import Loader from "../../../public/Resource/spinner.svg";
import useStore from "../store/Store";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const parseMealPlanData = (mealPlan: any) => {
  if (typeof mealPlan !== "string" || mealPlan.trim() === "") {
    return [];
  }

  const result = [];
  const dayRegex = /\d+:/g;
  const daySections = mealPlan.split(dayRegex);
  const dayNumbers = mealPlan.match(dayRegex);

  const boldMealNumber = (text) => {
    return text.replace(/(Meal \d+)/, "$1");
  };

  const numberIngredients = (ingredients: any) => {
    const sections = ingredients.split("-------------------------");
    return sections
      .map((section: any) => {
        let count = 1;
        return section
          .split("\n")
          .map((line: any) => {
            line = line.trim();
            if (line.startsWith("-")) {
              return `${count++}. ${line.substring(1).trim()}`;
            }
            return line;
          })
          .join("\n");
      })
      .join("\n-------------------------\n");
  };

  const processMeal = (meal: any, index: any) => {
    const mealNumber = `Meal ${index + 1}`;
    let [mealSection, ingredientsSection, instructionsSection] = meal.split(/Ingredients:|Instructions:/);

    const mealLines = mealSection.split("\n").filter((line: any) => line.trim());
    const restructuredMealLines = mealLines.map((line: any) => {
      if (line.toLowerCase().includes("side dish:")) return "\n" + line;
      if (line.toLowerCase().includes("cooking time:")) return "\n" + line;
      if (line.toLowerCase().includes("nutritional information:")) return "\n" + line;
      // if (line.toLowerCase().includes("total:\ncalories")) return "\n" + line;
      if (line.toLowerCase().includes("total:")) return "\n" + line;
      return line;
    });

    // Join the restructured lines and bold the meal number
    const mealData = boldMealNumber(restructuredMealLines.join("\n"));

    const ingredientsLines = ingredientsSection ? ingredientsSection.split("\n").filter((line: any) => line.trim()) : [];
    const restructuredIngredientsLines = ingredientsLines.map((line: any) => {
      if (line.toLowerCase().includes("main dish:")) return line; // No newline before Main Dish:
      if (line.toLowerCase().includes("side dish:")) return "\n" + line;
      return line;
    });
    const ingredients = restructuredIngredientsLines.join("\n");

    // Process instructions lines
    const instructionsLines = instructionsSection ? instructionsSection.split("\n").filter((line: any) => line.trim()) : [];
    const restructuredInstructionLines = instructionsLines.map((line: any) => {
      if (line.toLowerCase().includes("side dish:")) return "\n" + line;
      return line;
    });
    const instructions = restructuredInstructionLines.join("\n");

    return `${mealData}\n\nIngredients:\n${ingredients}\n\nInstructions:\n${instructions}`;
  };

  for (let i = 1; i < daySections.length; i++) {
    const dayNumber = dayNumbers[i - 1].trim();
    const dayContent = daySections[i].trim();

    const meals = dayContent.split(/Meal \d+/).filter(Boolean);
    const dayRow = [dayNumber];

    meals.forEach((meal, index) => {
      dayRow.push(processMeal(meal, index));
    });

    result.push(dayRow);
  }

  return result;
};

const cards = [
  {
    //card 3
    subtitle: "Discover",
    title: "Choose Your Preferred/Popular Meal Plan",
    description: "Tell us about the Preferred/Popular Meal Plan",

    // image: "image1.jpg",
    elements: [
      // { type: "radio", name: "preferredMeal", label: "Vegetarian",image:{} },
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
        label: "Vegetarian ",
        image: balancediet.src,
      },
    ],
  },

  {
    //card 4
    subtitle: "Choose",
    title: "How Many Servings Do You Need?",
    description: "Select the number of servings you need per meal.",

    // image: "image1.jpg",
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
    //card 1
    subtitle: "Discover",
    title: "Tell Us About Your Food Allergies",
    description: "We want to make sure your meal plan is tailored to your needs. Let us know if you have any food allergies so we can provide you with delicious and safe recipes.",

    // image: "image1.jpg",
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
  // skip
  {
    //card 3
    subtitle: "Discover",
    title: "Choose Your Preferred Calories",
    description: "Choose your calorie intake based on personal preferences.",

    // image: "image1.jpg",
    elements: [
      // { type: "radio", name: "preferredMeal", label: "Vegetarian",image:{} },
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
    //card 2
    subtitle: "Discover",
    title: "Tell us about the food you dislike",
    description: "Tell us about the food you dislike",

    // image: "image1.jpg",
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
    //card 6
    subtitle: "Details",
    title: "Your Details",
    description: "",

    // image: "image1.jpg",
    elements: [
      { type: "text", placeholder: "Your Name" },
      { type: "email", placeholder: "Email Address" },
      // { type: "tel", placeholder: "Phone" },
      // { type: "text", placeholder: "Address" },
      { type: "password", placeholder: "Password" },
    ],
  },
  {
    //card 7
    subtitle: "Log In",
    title: "",
    description: "",
    // image: "image1.jpg",
    elements: [
      { type: "email", placeholder: "Email Address" },
      { type: "password", placeholder: "Password" },
    ],
  },
];

const CardNavigator = ({ setLoading }) => {
  const API_BASE_URL = "https://meeel.xyz";
  const [eror, seteror] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpendislike, setIsOpendislike] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemNamedislike, setNewItemNamedislike] = useState("");
  const [customItems, setCustomItems] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [dislike, setdislike] = useState([]);
  const [familyMembers, setFamilyMembers] = useState(1);
  const [ispopupOpen, setIspopupOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedPreferredMeal, setSelectedPreferredMeal] = useState("");
  const [selectedFoodAllergies, setSelectedFoodAllergies] = useState([]);
  const [selecteddietaryRestrictions, setSelecteddietaryRestrictions] = useState([]);
  const [selecteddislike, setSelecteddislike] = useState([]);
  const [selectedServings, setSelectedServings] = useState("");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useStore();
  const [hasGeneratedPDF, setHasGeneratedPDF] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [dietrypopup, setdietrypopup] = useState(false);
  const [ispopupOpen3, setIspopupOpen3] = useState(false);
  const popupRef = useRef(null);
  const [card7Values, setCard7Values] = useState({});
  const [card6Values, setCard6Values] = useState({
    Phone: "",
    Address: "",
    "Your Name": "",
    "Email Address": "",
    Password: "",
  });
  const router = useRouter();

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setSelectedPreferredMeal(value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setdietrypopup("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);


  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!selectedAllergies.includes(newItemName.trim())) {
      setSelectedAllergies((prevItems) => [...prevItems, newItemName.trim()]);
      setNewItemName("");
    }
  };


  const handleSubmitdislike = (e: any) => {
    e.preventDefault();
    if (!dislike.includes(newItemNamedislike.trim())) {
      setdislike((prevItems) => [...prevItems, newItemNamedislike.trim()]);
      setNewItemNamedislike("");
    }
  };

  const handleDelete = (index: any) => {
    setSelectedAllergies((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleDeletedislike = (index: any) => {
    setdislike((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleDone = () => {
    // Here you can perform any additional actions needed when done
    setIsOpen(false);
  };

  const openPopup = (cat: any) => {
    setCategory(cat);
    setIsOpen(true);
  };


  // Handle input changes for card 6
  const handleCard6Change = (e: any) => {
    const { placeholder, value } = e.target;
    setCard6Values((prevValues) => ({
      ...prevValues,
      [placeholder]: value,
    }));
    if (placeholder === "Email Address" || placeholder === "Password") {
      setLoginData((prevData) => ({
        ...prevData,
        [placeholder === "Email Address" ? "email" : "password"]: value,
      }));
    }
  };

  // Handle input changes for card 7
  const handleCard7Change = (e: any) => {
    const { placeholder, value } = e.target;
    setCard7Values((prevValues) => ({
      ...prevValues,
      [placeholder]: value,
    }));
    setLoginData((prevData) => ({
      ...prevData,
      [placeholder === "Email Address" ? "email" : "password"]: value,
    }));
  };


  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validate the email
    if (!emailRegex.test(card6Values["Email Address"])) {
      seteror("Please enter a valid email address");
      return; // Exit the function if the email is invalid
    }
    if (card6Values.Password.length < 8) {
      seteror("Password must be Strong and at least 8 characters long");
      return; // Exit the function if the password is invalid
    }

    try {
      setLoader(true);
      const { "Your Name": name, "Email Address": email, Password: password } = card6Values;

      const formData = {
        name,
        email,
        password,
        totalCalories: selectedPreferredMeal,
        dietaryRestriction: selecteddietaryRestrictions,
        foodAllergies: selectedFoodAllergies,
        persons: selectedServings,
        dislikes: selecteddislike + dislike,
       // prefMeal: `${familyMembers} members`,
        prefMeal: `${familyMembers} members`,
        mealPerDay: "3 meals",
        days: "7",
      };

      // Signup request
      const response = await fetch("/api/signUp", {
        // const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });


      // Check if the response is not ok
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (response.ok) {
        // Automatically log the user in
        await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
      } else {
        console.error("Sign-up failed");
      }
      router.push("/payment");

    } catch (error: any) {
      if (error.message.includes("psycopg2.OperationalError") && error.message.includes("SSL connection has been closed unexpectedly")) {
        seteror("Use Strong Password!");
      } else {
        seteror(error.message);
      }
     
    } finally {
      setLoader(false);
    }
  };

  const servings = selectedServings;

  const handleNext = () => {
    // Check if a selection has been made
    const isSelectionMade = () => {
      switch (currentCardIndex) {
        case 0:
          return selecteddietaryRestrictions.length > 0;
        case 1:
          return selectedServings.length > 0;

        default:
          return true; // For cards that don't require selection
      }
    };
    if (!isSelectionMade()) {    
      return;
    }   
    setCurrentCardIndex(currentCardIndex + 1);
  };

  // click to back
  const handleBack = () => {
       setCurrentCardIndex(currentCardIndex - 1);
  }; 

  const handleRadioChange = (event:any) => {
    let { name, value } = event.target;
    if (name === "preferredMeal") {
      setSelectedPreferredMeal((prevSelected) => {
        // If the selected value is already chosen, deselect it
        if (prevSelected === value) {
          return ""; // Deselect the current value
        } else {
          return value; // Set the new value as the selected one
        }
      });
    } else if (name === "servings") {
      setSelectedServings((prevSelected) => (prevSelected === value ? "" : value));
    } else if (name === "FoodAllergies") {
      setSelectedFoodAllergies((prevSelected) => {
        if (prevSelected.includes(value)) {
          return prevSelected.filter((item) => item !== value);
        } else {
          return [...prevSelected, value];
        }
      });
    } else if (name === "dislike") {
      setSelecteddislike((prevSelected) => {
        if (prevSelected.includes(value)) {
          return prevSelected.filter((item) => item !== value);
        } else {
          return [...prevSelected, value];
        }
      });
    } else if (name === "dietaryRestrictions") {
      setdietrypopup((prevSelected) => (prevSelected === value ? "" : value));
      setSelecteddietaryRestrictions((prevSelected) => (prevSelected === value ? "" : value));
    }
  };

  // rendering elements in the card
  const renderElement = (element, index) => {
    switch (element.type) {
      case "radio":
        const isChecked =
          element.name === "FoodAllergies"
            ? selectedFoodAllergies.includes(element.label)
            : element.name === "dislike"
            ? selecteddislike.includes(element.label)
            : element.name === "preferredMeal"
            ? selectedPreferredMeal.includes(element.label)
            : element.name === "dietaryRestrictions"
            ? selecteddietaryRestrictions.includes(element.label)
            : element.name === "servings"
            ? selectedServings === element.label
            : false;

        return (
          <div>
            <div
              key={index}
              className={`radio-div relative flex rounded-md group items-center cursor-pointer border-[1px] border-S-Orange text-white flex-col justify-center w-20 h-20 sm:h-36 sm:w-36 ${isChecked ? "selected" : ""}`}
              onClick={() =>
                handleRadioChange({
                  target: {
                    name: element.name,
                    value: element.label,
                    info: element.info,
                  },
                })
              }
            >
              <div className="border-[1px]  w-3 sm:h-7 h-3 sm:w-7 flex items-center justify-center rounded-full backdrop-blur-lg absolute -top-1 -right-1  sm:-top-2 sm:-right-2">
                <div className="w-[14px] rounded-full h-[1px] bg-white"></div>
              </div>
                           {element.image && <img className=" mb-2 w-5 sm:w-10 select-none" src={element.image} alt={element.label} />}
              <span className="text-white text-xs sm:text-md select-none text-center px-2 ">{element.label}</span>
              {isChecked && (
                <div className="absolute w-3 sm:h-7 h-3 sm:w-7 flex z-40 items-center justify-center select-none  bg-[#32B200] rounded-full -top-1 -right-1  sm:-top-2 sm:-right-2">
                  <img src={tickIcon.src} alt="Selected" className="tick-icon select-none " />
                </div>
              )}
                         </div>
          </div>
        );

      case "text":
      case "email":
      case "tel":
      case "password":
        const value = currentCardIndex === 5 ? card6Values[element.placeholder] : card7Values[element.placeholder];
        const handleChange = currentCardIndex === 5 ? handleCard6Change : handleCard7Change;
        return (
          <div key={index} className="formElement  ">
            <form action="" onSubmit={handleSignUp}>
              <input type={element.type} placeholder={element.placeholder} value={value} onChange={handleChange} className="border-2 border-white py-2   px-2 bg-transparent rounded-lg p-2 w-[19rem]   sm:w-[32rem]  placeholder-white text-white " />
            </form>
          </div>
        );
      default:
        return null;
    }
  };
  // rendering section in the card
  const renderSection = (section, index) => (
    <div key={index} className={`section  ${currentCard.title === "How Many Servings Do You Need?" && index === 0 ? "column" : ""}`}>
      {/* <h5 className="text-P-Green1 font-bold text-xl">{section.heading}</h5> */}
      {section.description && <p className="text-Text2 "> {section.description}</p>}
      {section.type === "radio" && renderElement(section, index)}
    </div>
  );

  const currentCard = cards[currentCardIndex];

  // card code............

  return (
    <div
      className="w-[100vw] min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: `url(${cardbgimg.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {loader && (
        <div className="">
          <img src={Loader} alt="" className="" />
        </div>
      )}

      {!loader && (
        <div className="relative container max-w-[32rem] capitalize ">
          <h4 className="text-xl sm:text-2xl border-b-8 border-S-Orange leading-none font-bold inline-block text-white">{currentCard.subtitle}</h4>
          <h2 className="font-bold text-xl sm:text-3xl text-white">{currentCard.title}</h2>
          <p className="cardp text-white text-sm sm:text-lg mt-4 ">{currentCard.description}</p>

          {/* ---------------popup info */}
          {cards[0].elements[0].label === dietrypopup && (
            <div ref={popupRef} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-blur-xl rounded-md select-none max-w-[20rem] w-full max-h-[20rem] h-full overflow-y-scroll p-2 text-white scroll-smooth">
              <div className="p-2">
                <b className="mb-4">Balanced Diet:</b>
                <ul className="list-disc ml-5">
                  <li>A balanced diet inspired by Mediterranean and centenarian eating habits significantly enhances health. </li>
                  <li>Such a diet focuses on a variety of fruits, vegetables, and whole grains, which naturally helps reduce cholesterol levels and lower the risk of chronic conditions.</li>
                  <li> It's a sustainable, fulfilling way to eat that not only extends your lifespan but also respects the natural environment.</li>
                </ul>
              </div>
            </div>
          )}
          {cards[0].elements[1].label === dietrypopup && (
            <div ref={popupRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-blur-xl rounded-md select-none max-w-[20rem] w-full max-h-[20rem] h-full overflow-y-scroll p-2 text-white scroll-smooth">
              <div className="p-2">
                <b>Low-Carb Diet - Benefits:</b>
                <ul className="list-disc ml-5">
                  <li>May improve metabolic health by reducing insulin levels, helping the body burn fat more efficiently.</li>
                  <li>Often leads to improvements in significant cardiovascular risk factors, such as decreasing triglycerides and increasing HDL cholesterol levels.</li>
                  <li>Beneficial for managing diabetes and reducing insulin resistance.</li>
                </ul>
                <br />
                <b>Diet Considerations:</b>
                <ul className="list-disc ml-5">
                  <li>Some individuals might experience a temporary decrease in energy as the body adjusts to fewer carbohydrates.</li>
                  <li>Ensures sufficient intake of essential nutrients through carefully selected low-carb vegetables and foods.</li>
                </ul>
              </div>
            </div>
          )}
          {cards[0].elements[4].label === dietrypopup && (
            <div ref={popupRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-blur-xl rounded-md select-none max-w-[20rem] w-full max-h-[20rem] h-full overflow-y-scroll p-2 text-white scroll-smooth">
              <div className="p-2 ">
                <b>Vegetarian Diet</b>
                <br />
                <b>Benefits:</b>
                <ul className="list-disc ml-5">
                  <li>Lower levels of cholesterol, lower blood pressure, and reduced risk of heart disease.</li>
                  <li>Some studies show a lower risk of certain types of cancer.</li>
                  <li>Generally lower in calories, helping to manage or reduce weight.</li>
                </ul>
                <br />
                <b>Considerations:</b>
                <ul className="list-disc ml-5">
                  <li>If not carefully managed, can lead to insufficient protein intake.</li>
                  <li>Lack of meat increases the risk of deficiencies in these nutrients.</li>
                  <li>Some vegetarian diets can be high in carbohydrates, which might not suit everyone's health goals.</li>
                </ul>
              </div>
            </div>
          )}
          {cards[0].elements[2].label === dietrypopup && (
            <div ref={popupRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-blur-xl rounded-md select-none max-w-[20rem] w-full max-h-[20rem] h-full overflow-y-scroll p-2 text-white scroll-smooth">
              <div className="p-2 ">
                <b>Carnivore Diet</b>
                <br />
                <b>Benefits:</b>
                <ul className="list-disc ml-5">
                  <li>Focuses primarily on animal-based foods, which streamlines dietary choices.</li>
                  <li>Some people report improvements in autoimmune symptoms.</li>
                  <li>High protein and fat content can naturally help control appetite and reduce calorie intake.</li>
                </ul>
                <br />
                <b>Considerations:</b>
                <ul className="list-disc ml-5">
                  <li>Completely excludes plant-based foods, potentially leading to digestive issues such as constipation.</li>
                  <li>May result in deficiencies in certain vitamins and antioxidants found predominantly in plant foods.</li>
                </ul>
              </div>
            </div>
          )}
          {cards[0].elements[3].label === dietrypopup && (
            <div ref={popupRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-50 backdrop-blur-xl rounded-md select-none max-w-[20rem] w-full max-h-[20rem] h-full overflow-y-scroll p-2 text-white scroll-smooth">
              <div className="p-2 ">
                <b>Paleo Diet</b>
                <br />
                <b>Benefits:</b>
                <ul className="list-disc ml-5">
                  <li>Focuses on consuming whole, unprocessed foods, which can enhance overall health.</li>
                  <li>High fibre intake from fruits and vegetables supports a healthy digestive system.</li>
                  <li>Free from dairy, grains, and processed foods, benefiting those with specific food sensitivities.</li>
                </ul>
                <br />
                <b>Considerations:</b>
                <ul className="list-disc ml-5">
                  <li>Excludes grains and dairy, which can lead to potential gaps in calcium and other nutrients if not properly managed.</li>
                  <li>Sometimes requires more specialized ingredients which can be more expensive and less accessible.</li>
                </ul>
              </div>
            </div>
          )}

          {/* ----------------- */}

          <div className="w-full mt-4 flex">
            <div className=" ">
              {currentCard.section1 && <div className="flex flex-wrap gap-7">{currentCard.section1.map((section, index) => renderSection(section, index))}</div>}
              {currentCard.section2 && currentCard.section2.map(renderSection)}
            </div>
            {currentCard.elements && (
              <div className="flex flex-wrap gap-3 sm:gap-7 ">
                {currentCard.elements.map((element, index) => renderElement(element, index))}
               
                {currentCardIndex === 3 && (
                  <div className="relative">
                    <div onClick={() => setIspopupOpen3(true)} className="relative select-none flex rounded-md group items-center cursor-pointer border-[1px] border-S-Orange text-white flex-col justify-center w-20 h-20 sm:h-36 sm:w-36">
                      {selectedPreferredMeal === "Recomended (2000 - 2500 calories)"
                        ? ""
                        : selectedPreferredMeal && (
                            <div className="absolute  w-3 sm:h-7 h-3 sm:w-7 flex z-40 items-center justify-center select-none  bg-[#32B200] rounded-full  -top-1 -right-1  sm:-top-2 sm:-right-2">
                              <img src={tickIcon} alt="Selected" className="tick-icon select-none w-3 sm:h-7 h-3 sm:w-7 " />
                            </div>
                          )}

                      <img src={plus} alt="" className="w-5 sm:h-7 h-5 sm:w-7 " />
                      <p className="select-none text-xs sm:text-base">Add</p>
                      <p className="text-xs sm:text-sm text-center">{!selectedPreferredMeal || selectedPreferredMeal === "Recomended (2000 - 2500 calories)" ? "" : `${selectedPreferredMeal} calories`}</p>
                    </div>

                    {ispopupOpen3 && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                          <h2 className="text-xl font-bold mb-4 text-gray-800">Enter a Number</h2>

                          <div className="mt-4">
                            <label htmlFor="numberInput" className="block text-gray-700">
                              Number:
                            </label>
                            <input
                              type="text"
                              id="numberInput"
                              value={selectedPreferredMeal}
                              onChange={handleInputChange}
                              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Text1"
                              placeholder="Enter a number"
                            />
                          </div>

                          <div className="mt-4 flex justify-end space-x-2">
                            <button
                              onClick={() => setIspopupOpen3(false)}
                              className="py-2 mt-4 select-none px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {currentCardIndex === 1 && (
                  <div className="relative">
                    <div onClick={() => setIspopupOpen(true)} className="relative select-none flex rounded-md group items-center cursor-pointer border-[1px] border-S-Orange text-white flex-col justify-center  w-20 h-20 sm:h-36 sm:w-36">
                      {selectedServings === "1 Serving" || selectedServings === "2 Servings" || selectedServings === "3 Servings" || selectedServings === "4 Servings" || selectedServings === "" ? (
                        ""
                      ) : (
                        <>
                          <div className="absolute  w-3 sm:h-7 h-3 sm:w-7 flex z-40 items-center justify-center select-none  bg-[#32B200] rounded-full  -top-1 -right-1  sm:-top-2 sm:-right-2">
                            <img src={tickIcon} alt="Selected" className="tick-icon select-none " />
                          </div>
                        </>
                      )}

                      <img src={plus} alt="" className="w-5 sm:h-7 h-5 sm:w-7 " />
                      <p className="select-none text-xs sm:text-base">Add</p>
                      {selectedServings === "1 Serving" || selectedServings === "2 Servings" || selectedServings === "3 Servings" || selectedServings === "4 Servings" || selectedServings === "" ? (
                        ""
                      ) : (
                        <>
                          <p className="text-xs sm:text-sm">
                            {selectedServings || ""}

                            <br />
                          </p>
                        </>
                      )}
                      {familyMembers > 1 && (
                        <>
                          <div className="absolute  w-3 sm:h-7 h-3 sm:w-7 flex z-40 items-center justify-center select-none  bg-[#32B200] rounded-full  -top-1 -right-1  sm:-top-2 sm:-right-2">
                            <img src={tickIcon} alt="Selected" className="tick-icon select-none " />
                          </div>
                          <p className="text-xs sm:text-sm">{familyMembers} Members</p>
                        </>
                      )}
                    </div>

                    {ispopupOpen && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                          <h2 className="text-xl font-bold mb-4 text-gray-800">Select Your Options</h2>

                          {/* Dropdown for servings */}
                          <div className="mt-4">
                            <label htmlFor="servings" className="block text-gray-700">
                              Servings:
                            </label>
                            <select
                              id="servings"
                              value={selectedServings.split(" ")[0] || ""}
                              onChange={(e) => setSelectedServings(e.target.value + " servings")}
                              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Text1"
                            >
                              <option value="">Select servings</option>
                              {[5, 6].map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Dropdown for family members */}
                          <div className="mt-4">
                            <label htmlFor="familyMembers" className="block text-gray-700">
                              Family Members:
                            </label>
                            <select
                              id="familyMembers"
                              value={familyMembers}
                              onChange={(e) => setFamilyMembers(Number(e.target.value))}
                              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Text1"
                            >
                              {[...Array(19).keys()].map((num) => (
                                <option key={num} value={num + 2}>
                                  {num + 2}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="mt-4 flex justify-end space-x-2">
                            <button
                              onClick={() => setIspopupOpen(false)}
                              className="py-2 mt-4 select-none px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* card index 2  */}

                {currentCardIndex === 2 && (
                  <>
                    <div className="relative">
                      <div onClick={() => setIsOpen(true)} className="relative select-none flex rounded-md group items-center cursor-pointer border-[1px] border-S-Orange text-white flex-col justify-center w-20 h-20 sm:h-36 sm:w-36">
                        <img src={plus} alt="" className="w-5 sm:h-7 h-5 sm:w-7 " />
                        <p className="select-none text-xs sm:text-base">Add</p>
                        {selectedAllergies.length > 0 && (
                          <>
                            <div className="absolute  w-3 sm:h-7 h-3 sm:w-7 flex z-40 items-center justify-center select-none  bg-[#32B200] rounded-full  -top-1 -right-1  sm:-top-2 sm:-right-2">
                              <img src={tickIcon} alt="Selected" className="tick-icon select-none " />
                            </div>
                            <p className="absolute bottom-2 text-sm">{selectedAllergies.length} selected</p>
                          </>
                        )}
                      </div>

                      {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                          <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Tell Us About Your Allergies</h2>
                            <form onSubmit={handleSubmit}>
                              <input
                                type="text"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Text1"
                                placeholder="Enter Allergies"
                              />
                              <button
                                type="submit"
                                className="py-2 mt-4 select-none px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                              >
                                Add Item
                              </button>
                            </form>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {selectedAllergies.map((item, index) => (
                                <div key={index} className="bg-gray-100 rounded-md p-2 flex items-center">
                                  <span>{item}</span>
                                  <button onClick={() => handleDelete(index)} className="ml-2 text-red-500 hover:text-red-700">
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                              <button
                                onClick={handleDone}
                                className="py-2 mt-4 select-none px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {currentCardIndex === 4 && (
                  <>
                    <div className="relative">
                      <div onClick={() => setIsOpendislike(true)} className="relative select-none flex rounded-md group items-center cursor-pointer border-[1px] border-S-Orange text-white flex-col justify-center w-20 h-20 sm:h-36 sm:w-36">
                        <img src={plus} alt="" className="w-5 sm:h-7 h-5 sm:w-7 " />
                        <p className="select-none text-xs sm:text-base">Add</p>
                        {dislike.length > 0 && (
                          <>
                            <div className="absolute  w-3 sm:h-7 h-3 sm:w-7 flex z-40 items-center justify-center select-none  bg-[#32B200] rounded-full  -top-1 -right-1  sm:-top-2 sm:-right-2">
                              <img src={tickIcon} alt="Selected" className="tick-icon select-none " />
                            </div>
                            <p className="absolute bottom-2 text-sm">{dislike.length} selected</p>
                          </>
                        )}
                      </div>

                      {isOpendislike && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                          <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Tell Us About Your food dislikes</h2>
                            <form onSubmit={handleSubmitdislike}>
                              <input
                                type="text"
                                value={newItemNamedislike}
                                onChange={(e) => setNewItemNamedislike(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Text1"
                                placeholder="Enter Allergies"
                              />
                              <button
                                type="submit"
                                className="py-2 mt-4 select-none px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                              >
                                Add Item
                              </button>
                            </form>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {dislike.map((item, index) => (
                                <div key={index} className="bg-gray-100 rounded-md p-2 flex items-center">
                                  <span>{item}</span>
                                  <button onClick={() => handleDeletedislike(index)} className="ml-2 text-red-500 hover:text-red-700">
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                              <button
                                onClick={() => {
                                  setIsOpendislike(false);
                                }}
                                className="py-2 mt-4 select-none px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="buttonContainer1">
            {currentCardIndex === 0 && (
              <button
                className="py-2 mt-4 select-none px-10 w-[100px] sm:w-[200px] box-border rounded-md sm:rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-xs sm:text-base"
                onClick={handleNext}
              >
                Next
              </button>
            )}

            {currentCardIndex > 0 && currentCardIndex < 4 && (
              <>
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    className="py-1 sm:py-2 px-4 sm:px-12 w-[100px] sm:w-[200px] select-none box-border rounded-md sm:rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white  hover:cursor-pointer text-white font-roboto font-medium text-xs sm:text-base"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button
                    className="py-2 px-10 select-none w-[100px] sm:w-[200px] box-border rounded-md sm:rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-xs sm:text-base"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
           
            {currentCardIndex === 4 && (
              <>
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    className="py-2 px-4 sm:px-12 select-none w-[100px] sm:w-[200px] box-border rounded-md sm:rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white hover:cursor-pointer text-white font-roboto font-medium text-xs sm:text-base"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button
                    className="py-2 px-10 select-none w-[100px] sm:w-[200px] box-border rounded-md sm:rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-xs sm:text-base"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </>
            )}       

            {currentCardIndex === 5 && (
              <>
                <div className="flex flex-col flex-wrap mt-4 gap-2 ">
                  {eror && <p className="text-red-500 ">{eror}</p>}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      className="py-[1px] sm:py-2 px-4 sm:px-12 w-[100px] sm:w-[200px] select-none box-border rounded-md sm:rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white  hover:cursor-pointer text-white font-roboto font-medium text-xs sm:text-base"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className=" py-2 px-10 select-none w-[100px] sm:w-[200px] box-border rounded-md sm:rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-xs sm:text-base"
                      onClick={handleSignUp}
                    >
                      Sign&nbsp;Up
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-white">Already Have an Account?</p>{" "}
                    <p onClick={() => router.push("/login")} className="text-blue-300 hover:cursor-pointer select-none">
                      Login
                    </p>
                  </div>
                </div>
              </>
            )}

            {currentCardIndex === 6 && !isLoggedIn && ""}
            {currentCardIndex === 6 && !isLoggedIn && (
              <div className="flex flex-wrap  mt-4 gap-2 justify-between ">
                <a className="text-white  order-2 " href="/">
                  Forgot password?
                </a>
                <button
                  className="py-2 order-1 px-12 w-[100px] sm:w-[200px] box-border select-none rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white  hover:cursor-pointer text-white font-roboto font-medium text-base"
                  // onClick={() => handleLogin()}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardNavigator;
