/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {  useEffect, useState } from "react";
import downarrow from "../../public/Resource/downarrow.svg";
import "jspdf-autotable"; 
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";

interface prefprops{
  userData:any
}

function Pref({userData}:prefprops) {

  const [loader, setLoader] = useState(false);
  const [selectedPreferredMeal, setSelectedPreferredMeal] = useState([]);
  const [selectedFoodAllergies, setSelectedFoodAllergies] = useState([]);
  const [selecteddietaryRestrictions, setSelecteddietaryRestrictions] = useState([]);
  const [selecteddislike, setSelecteddislike] = useState([]);
  const [selectedServings, setSelectedServings] = useState("");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState("1");
  const [isEditable, setIsEditable] = useState(false);
  const [colories, setcolories] = useState("");
  const [servingss, setservingss] = useState("");
  const [familymember, setfamilymember] = useState("1");
  const [allergy, setallergy] = useState("");
  const [dislike, setdislike] = useState("");
  const [diatryrestriction, setdiatryrestriction] = useState("");
  const [Error, setError] = useState("");
  const { data: session } = useSession();
  const [userdata, setuserdata] = useState("")

  // @ts-ignore
  const UserId  = session?.user?.id


  const fetchUserData = async () => {
    // @ts-ignore
    const userId =session?.user?.id
    try {
      const response = await fetch("/api/Fetch-User-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok) {

        setuserdata(data.user);

      } else {
        setError(data.error || "Error fetching user data");
      }
    } catch (error) {
      setError("Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [session]);







  
  


  const [menuStates, setMenuStates] = useState({
    mealPerDay: { open: false, selected: "" },
    servings: { open: false, selected: "" },
    allergy: { open: false, selected: "" },
    Calories: { open: false, selected:"" },
    dislike: { open: false, selected: "" },
    PreferredMeal: { open: false, selected:"" },
    
  });


  useEffect(() => {
    if (userdata) {
      setMenuStates({
        // @ts-ignore
        mealPerDay: { open: false, selected: userdata?.mealPerDay || "" },
        // @ts-ignore
        servings: { open: false, selected: userdata?.persons || "" },
        // @ts-ignore
        allergy: { open: false, selected: userdata?.foodAllergies || "" },
        // @ts-ignore
        Calories: { open: false, selected: userdata?.totalCalories || "" },
        // @ts-ignore
        dislike: { open: false, selected: userdata?.dislikes || "" },
        // @ts-ignore
        PreferredMeal: { open: false, selected: userdata?.prefMeal || "" },
      });
    }
  }, [userdata]);






  const renderMenuItem = (menu, title, placeholder, options) => (
    <li className="relative text-Text1">
      <span className="text-base font-roboto font-bold truncate">{title}</span>
      <button
      aria-label="allergy"
        onClick={() => isEditable && handleMenuClick(menu)}
        className={`text-sm text-Text2 border-2 rounded-lg border-[#A6AE9D] px-4 py-3 w-[75vw] sm:w-[30rem] flex justify-between items-center truncate  ${
          !isEditable && "opacity-50 cursor-not-allowed"
        }`}
        disabled={!isEditable}
      >
        {(menu === "allergy" || menu === "dislike") &&
        Array.isArray(menuStates[menu].selected)
          ? menuStates[menu].selected.join(", ")
          : menuStates[menu].selected || placeholder}
        <span>
          <Image src={downarrow} className="w-5 ml-3" alt="" />
        </span>
      </button>
      {menuStates[menu].open && (
        <ul className="absolute z-50 left-0 mt-2 bg-white border border-gray-300 w-full px-2 py-2">
          {(title === "Tell us about your food allergy" ||
            title === "Tell us about the food you dislike") && (
            <div className="flex w-full border  text-xs sm:text-sm rounded-md sm:rounded-lg  mb-2 m-0.5 overflow-hidden">
              <input
                type="text"
                autoFocus
                value={menuStates[menu].inputValue || ""}
                onChange={(e) => handleInputChange(menu, e.target.value)}
                onKeyDown={(e) => handleInputKeyDown(menu, e)}
                className="w-full py-2  px-2 focus:ring-0 focus:ring-transparent outline-none"
                placeholder={`Type and press Enter to add custom ${
                  menu === "allergy" ? "allergy" : "dislike"
                }`}
              />
              <button
              aria-label="add"
                  onClick={() => {
                    // Call addCustomOption with the current input value
                    addCustomOption(menu, menuStates[menu].inputValue.trim());
                  }}
              className="   min-h-full px-4 sm:px-6 box-border  flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base">
                Add
              </button>
            </div>
          )}

          {options.map((option) => (
            <li key={option}>
              {title === "Tell us about your food allergy" ||
              title === "Tell us about the food you dislike" ? (
                <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      Array.isArray(menuStates[menu].selected) &&
                      menuStates[menu].selected.includes(option)
                    }
                    onChange={() => handleOptionSelect(menu, option)}
                    className="mr-2"
                  />
                  <span onClick={() => handleOptionSelect(menu, option)}>
                    {option}
                  </span>
                </div>
              ) : (
                <span
                  onClick={() => handleOptionSelect(menu, option)}
                  className="block px-4 py-2 hover:bg-gray-300 cursor-pointer"
                >
                  {option}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  const handleOptionSelect = (menu, option) => {
    if (menu === "allergy" || menu === "dislike") {
      setMenuStates((prev) => {
        const currentSelected = Array.isArray(prev[menu].selected)
          ? prev[menu].selected
          : [];
        const updatedSelected = currentSelected.includes(option)
          ? currentSelected.filter((item) => item !== option)
          : [...currentSelected, option];

        return {
          ...prev,
          [menu]: {
            ...prev[menu],
            selected: updatedSelected,
            open: true, // Keep the menu open for multi-select
          },
        };
      });
    } else {
      // Original single-select behavior for other menus
      setMenuStates((prevState) => ({
        ...prevState,
        [menu]: { open: false, selected: option },
      }));
    }
  };
  const addCustomOption = (menu, value) => {
    if (!value) return;

    setMenuStates((prev) => {
      const currentSelected = Array.isArray(prev[menu].selected)
        ? prev[menu].selected
        : [];
      if (!currentSelected.includes(value)) {
        return {
          ...prev,
          [menu]: {
            ...prev[menu],
            selected: [...currentSelected, value],
            inputValue: "",
          },
        };
      }
      return prev;
    });
  };
  
  const handleInputChange = (menu, value) => {
    setMenuStates({
      ...menuStates,
      [menu]: {
        ...menuStates[menu],
        inputValue: value, // Update the input field value
      },
    });
  };
  const handleInputKeyDown = (menu, e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      addCustomOption(menu, e.target.value.trim());
    }
  };
  const handleMenuClick = (menu) => {
    setMenuStates((prevState) => ({
      ...prevState,
      [menu]: { ...prevState[menu], open: !prevState[menu].open },
    }));
  };
  const handleEditClick = () => {
    setIsEditable((prev) => !prev);
  };

 

  const handleGeneratePDF = async () => {
    // @ts-ignore
    const email = await session?.user.email
    // @ts-ignore
    if (userData.status === "active") {
      setLoader(true);
  
      const payload = {
        mealPerDay: menuStates.mealPerDay.selected,
        persons: menuStates.servings.selected,
        foodAllergies: menuStates.allergy.selected,
        dislikes: menuStates.dislike.selected,
        prefMeal: menuStates.PreferredMeal.selected,
        totalCalories: menuStates.Calories.selected,
        id: UserId,
        email:email
      };
  
      try {
        // Await the POST request
        const res = await axios.post("/api/generate", payload);
        alert("Your meal plan has been successfully generated and sent to your email.");
      } catch (error) {
        console.error("Error generating meal plan:", error);
      } finally {
        // Ensure loader is turned off after request completes
        setLoader(false);
      }
    } else {
      alert("To generate a meal plan, please subscribe to one of our plans.");

    }
  };
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsEditable(false)
    const response = await fetch('/api/update-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // @ts-ignore
        userId:session?.user.id,
        prefMeal:menuStates.PreferredMeal.selected,
        persons:menuStates.servings.selected,
        totalCalories:menuStates.Calories.selected,
        foodAllergies:menuStates.allergy.selected,
        dislikes:menuStates.dislike.selected,
        mealPerDay:menuStates.mealPerDay.selected,

      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('User data updated successfully');
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div className="w-fit">
      <div className="w-fit">
        <div className="max-w-[40rem]  my-[2rem] sm:my-[5rem] xl:px-14 mx-auto">
          <div className="m-auto xl:m-0  w-fit flex flex-col xl:items-start items-center "></div>

          <div className=" flex  flex-col justify-center items-center xl:justify-start xl:items-start">
            <ul className="w-full gap-4 flex flex-col xl:flex-row items-center xl:flex-wrap">
              {renderMenuItem(
                "mealPerDay",
                "How many Meals are required per Day?",
                menuStates.mealPerDay.selected || "Enter/select Meal/day",

                ["2 Meal", "3 Meal", "4 Meal", "5 Meal"]
              )}

              {renderMenuItem("servings", "How Many Servings Do You Need?", `${menuStates.servings.selected || "Select servings"}`, ["1 Person", "2 People", "3 People", "4 People"])}
              {renderMenuItem(
                "allergy",
                "Tell us about your food allergy",
                menuStates.allergy.selected || "Enter/select allergy if you have any",

                ["Eggs", "Cheese", "Tofu", "Butter", "Coconut"]
              )}
              {renderMenuItem("dislike", "Tell us about the food you dislike", menuStates.dislike.selected || "Enter/select food dislikes", ["Fish", "Mushrooms", "Chicken", "Pork", "Beef"])}
              {renderMenuItem("PreferredMeal", "Choose your preferred meal plan", menuStates.PreferredMeal.selected || "select preferred meal plan", [
                "Carb (promotes weight loss)",
                "Balanced diet ( Mediterranean diet)",
                "Carnivore diet",
                "Paleo diet",
                "Vegetarian",
              ])}

              {renderMenuItem("Calories", "Choose Your Preferred Calories", menuStates.Calories.selected || "Enter/select preferred Calories", [
                "Low (Under 1,500 calories)",
                "Moderate (1,500 - 2,500 calories)",
                "High (2,500 - 3,500 calories)",
                "Very High (3,500+ calories)",
              ])}
            </ul>

            <div className="flex gap-2 flex-col sm:flex-row sm:gap-2 flex-wrap items-center justify-center">
            <button
            aria-label="generate pdf"
                onClick={()=>{handleGeneratePDF();}}
                className={`${
                  loader && "disabled:opacity-50 cursor-not-allowed"
                } mt-4    py-2 px-6 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base`}
                disabled={loader}
              >
                {loader === true ? "Generating..." : "Generate PDF"}
              </button>
              {isEditable ? (
                <button
                aria-label="save"
                  onClick={handleSubmit}
                  className="sm:mt-4   py-2 px-14 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                >
                  save
                </button>
              ) : (
                <button
                aria-label="edit"
                  onClick={handleEditClick}
                  className="sm:mt-4   py-2 px-14 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pref;
