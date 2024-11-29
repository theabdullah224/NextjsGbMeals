import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import puppeteer from "puppeteer";
import { SavePdfAws } from "../../lib/SavePdfAws";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { sendPdf } from "@/app/lib/sendPdf";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

function cleanResponseContent(content: string): string {
  return content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/\.\.\./g, "")
    .trim();
}

function parseMealPlanToHtml(jsonResponse: string): string {
  try {
    // Parse the JSON response
    const data = JSON.parse(jsonResponse);

    // Start building the HTML content
    let htmlOutput = '<div class="maindiv">';

    // Loop through each day in the meal plan
    for (const day of data.mealPlan) {
      htmlOutput += `
                <div class="upone">
                    <h2>Day ${day.day}</h2>
                    <table class="firsttable">
                        <thead>
                            <tr>
                                <th><b>Meals</b></th>
                                <th><b>Ingredients</b></th>
                                <th><b>Instructions</b></th>
                            </tr>
                        </thead>
                        <tbody>
            `;

      // Loop through each meal
      for (let idx = 0; idx < day.meals.length; idx++) {
        const meal = day.meals[idx];
        htmlOutput += `
                    <tr class="trblock">
                        <td class="firstcolumn">
                            <div class="firstcolumndiv">
                                <span class="meal">Meal ${idx + 1}</span>
                                <h3 class="maindish">${meal.mainDish.name}</h3>
                                <h4 class="sidedish">${meal.sideDish.name}</h4>
                            </div>
                            <table class="timetable">
                                <thead>
                                    <tr>
                                        <th>Prep</th>
                                        <th>Cook</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${meal.mainDish.prepTime}</td>
                                        <td>${meal.mainDish.cookTime}</td>
                                        <td>${meal.mainDish.totalTime}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="margin-top: 16px;">
                                <h5>Nutritional Information</h5>
                                <table class="nutritable">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Main</th>
                                            <th>Side</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Calories</td>
                                            <td>${meal.mainDish.calories}</td>
                                            <td>${meal.sideDish.calories}</td>
                                            <td>${meal.mainDish.calories + meal.sideDish.calories}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                        <td class="secondcolumn">
                            <div>
                                <h6>Main Dish Ingredients</h6>
                                <ol>
                `;

        // Main Dish Ingredients
        for (const ingredient of meal.mainDish.ingredients) {
          htmlOutput += `<li>${ingredient.name} - ${ingredient.quantity}</li>`;
        }

        htmlOutput += `
                                </ol>
                            </div>
                            <div>
                                <h6>Side Dish Ingredients</h6>
                                <ol>
                `;

        // Side Dish Ingredients
        for (const ingredient of meal.sideDish.ingredients) {
          htmlOutput += `<li>${ingredient.name} - ${ingredient.quantity}</li>`;
        }

        htmlOutput += `
                                </ol>
                            </div>
                        </td>
                        <td class="secondcolumn">
                            <div>
                                <h6>Main Dish Instructions</h6>
                                <p>${meal.mainDish.instructions}</p>
                            </div>
                            <div>
                                <h6>Side Dish Instructions</h6>
                                <p>${meal.sideDish.instructions}</p>
                            </div>
                        </td>
                    </tr>
                `;
      }

      htmlOutput += `
                        </tbody>
                    </table>
                </div>
            `;
    }

    // Add the shopping list section
    htmlOutput += `
            <h1>Weekly Shopping List</h1>
            <div class="container22">
        `;

    // Loop through the shopping list categories
    for (const category of data.shoppingList) {
      htmlOutput += `
                <div class="column22">
                    <div class="category22">
                        <span>${category.category}</span>
                        <ul>
            `;

      // Loop through items in each category
      for (const item of category.items) {
        htmlOutput += `<li>${item.name} - ${item.quantity}</li>`;
      }

      htmlOutput += `
                        </ul>
                    </div>
                </div>
            `;
    }

    htmlOutput += "</div></div>"; // Closing tags for container22 and maindiv

    return htmlOutput;
  } catch (error) {
    console.error("Error parsing the meal plan JSON:", error);
    return "<p>Error: Invalid JSON data.</p>";
  }
}

const styleData = `
body {font-family: Arial, sans-serif;background-color: #fff;color: #333;margin: 0;padding: 20px;}
.trblock{border-bottom: 2px solid #e5e7eb;}
h1{text-align: center; color: #2d3748; font-size: 24px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.1em;}
.maindiv{width: 100%; margin: 0 auto; padding: 15px; box-sizing: border-box;}
.firsttable{page-break-after: always; width: 100%; border-collapse: separate; border-spacing: 0; background: white; border-radius: 12px; overflow: hidden; margin-bottom: 40px;}
.firsttable thead tr th{
    width: 33.33%; background-color: #738065; color: white; text-transform: uppercase; letter-spacing: 0.05em; padding: 16px 12px; font-size: 14px; border-right: 1px solid rgba(255, 255, 255, 0.2);
}
.firsttable tbody tr td {
  border-bottom: 2px solid #e5e7eb;
}
.firstcolumn{padding: 20px 16px; border-right: 2px solid #e5e7eb;  border-left: 2px solid #e5e7eb; background-color: white; font-size: 13px; vertical-align: top;}
.firstcolumndiv{background-color: #f8fafc; padding: 12px; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);}
.meal{font-size: 13px; color: #313131; font-weight: 600; display: block; margin-bottom: 4px;}
.maindish{font-size: 16px; font-weight: 600; color: #313131; margin: 8px 0 4px 0;}
.sidedish{font-size: 14px; font-weight: 500; color: #666; font-style: italic; margin: 4px 0 8px 0;}
.timetable{width: 100%; margin: 16px 0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border-collapse: collapse; background-color: #f8fafc;}
.timetable thead tr th{background-color: #A6AE9D; color: #313131; font-size: 14px; padding: 8px; border: 1px solid #d1d5db; width: 33%;}
.timetable tbody tr td{font-size: 14px; text-align: center; padding: 8px; border: 1px solid #d1d5db;}
h5{font-size: 14px; font-weight: 600; color: #313131; margin: 12px 0 8px 0; background-color: #f3f4f6; padding: 8px; border-radius: 6px;}
.nutritable{width: 100%; margin: 8px 0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border-collapse: collapse; background-color: #f8fafc;}
.nutritable thead tr th{background-color: #A6AE9D; color: #313131; font-size: 14px; padding: 8px; border: 1px solid #d1d5db; width: 25%;}
.nutritable tbody tr td{font-size: 14px; text-align: center; padding: 8px; border: 1px solid #d1d5db;}
.secondcolumn{padding: 20px 16px; border-right: 2px solid #e5e7eb; background-color: white; font-size: 13px; vertical-align: top;}
.secondcolumn div{background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);}
.secondcolumn h6{margin: 0 0 12px 0; font-size: 14px; color: #313131; font-weight: 600;}
.secondcolumn ol{padding-left: 20px; color: #4a5568; margin: 0;}
.secondcolumn li {margin-bottom: 8px; font-size: 14px;}
.secondcolumn p{color: #4a5568; line-height: 1.6; margin: 0; font-size: 14px;}
.container22 {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 900px;
    margin: 0 auto;
    justify-content: space-between;
}
.column22 {
    flex: 1 1 calc(50% - 20px);
    box-sizing: border-box;
    padding: 15px;
}
.category22 {margin-bottom: 20px;}
.category22 span {font-size: 1.3rem;color: #333;font-weight: bold;margin: 0 0 10px;width: fit-content;}
.category22 ul {
    list-style-type: disc;
    padding-left: 20px;
    margin: 0;
}
.category22 li {
    font-size: 0.9rem;
    margin-bottom: 5px;
}
`;

export async function POST(request: Request) {
  const data = await request.json();
  const session = await getServerSession(authOptions);

  const { days, prefMeal, mealPerDay, persons, totalCalories, foodAllergies, dislikes, id } = data;

  const prompt = `
  MOST IMPORTANT: MUST PROVIDE THE COMPLETE MEAL PLAN ACCORDING TO ${days}
  never give meal plan less than the ${days} days.
  
  Create a detailed meal plan for a ${prefMeal} diet with exactly ${mealPerDay} meals per day for ${days} days, for the ${persons} people (the number of servings refers to the number of people, so if there are ${persons} servings, each meal should be designed for ${persons} people).
  
  - Each meal should provide ${totalCalories} calories per person per day.
  
  - The shopping list should contain accurate quantities in international standard units (kg, g, liters, etc.), considering the ${persons} people.
  
  - Ensure that the generated meals avoid these allergens: ${foodAllergies}.
  
  - Exclude these disliked foods: ${dislikes}.
  
  Please generate a complete and detailed meal plan in **JSON format** with the following requirements:
  
  ### Key Details:
  1. **Days**: The number of days is variable (e.g., ${days}).
  2. **Meals per Day**: Variable, exactly ${mealPerDay} meals per day.
  3. **Servings**: Each meal is designed for ${persons} people.
  4. **Calories**: Each person must receive meals totaling ${totalCalories} calories daily.

  ### Meal Structure:
  For each day (${days}), generate exactly ${mealPerDay} meals with the following structure:
  - Each meal must include:
    - **Main Dish** and **Side Dish**.
    - **Time Estimates**:
      - Preparation Time
      - Cooking Time
      - Total Time
    - **Calories**:
      - Calories for the Main Dish
      - Calories for the Side Dish
      - Total Meal Calories
    - **Ingredients**:
      - Detailed ingredient lists for both the Main Dish and the Side Dish, with precise quantities in international units (e.g., g, kg, ml, liters, dozen).
    - **Cooking Instructions**:
      - Detailed, step-by-step instructions for preparing both the Main Dish and Side Dish. These instructions must be comprehensive enough for someone with no cooking experience.

  ### Additional Requirements:
  1. **Shopping List**:
     - Generate a consolidated weekly shopping list for all ingredients required for the meal plan.
     - Categorize the shopping list by item type (e.g., Vegetables, Fruits, Meat, etc.).
     - Provide weekly quantities for each item in international units (e.g., kg, g, liters).

  2. **Restrictions**:
     - Avoid the following allergens: ${foodAllergies}.
     - Exclude these disliked foods: ${dislikes}.

  ### JSON Structure:
  The output must strictly adhere to the following format:
  {
    "mealPlan": [
      {
        "day": 1,
        "meals": [
          {
            "meal": "Meal 1",
            "mainDish": {
              "name": "Main Dish Name",
              "prepTime": "X min",
              "cookTime": "Y min",
              "totalTime": "Z min",
              "calories": X,
              "ingredients": [
                {"name": "Ingredient1", "quantity": "value unit"},
                {"name": "Ingredient2", "quantity": "value unit"}
              ],
              "instructions": "Step-by-step instructions for the main dish [Provide detail Instructions to make that dish as a user who did not even know cooking can easily make this dish (provide detailed recipes)]"
            },
            "sideDish": {
              "name": "Side Dish Name",
              "prepTime": "X min",
              "cookTime": "Y min",
              "totalTime": "Z min",
              "calories": X,
              "ingredients": [
                {"name": "Ingredient1", "quantity": "value "},
                {"name": "Ingredient2", "quantity": "value "}
              ],
              "instructions": "Step-by-step instructions for the side dish [Provide detail Instructions to make that dish as a user who did not even know cooking can easily make this dish (provide detailed recipes)]"
            }
          },
          {
            "meal": "Meal 2",
            "...": "Same structure as Meal 1"
          }
        ]
      },
      {
        "day": 2,
        "meals": [
          "... same structure as Day 1 meals"
        ]
      }
    ],
    "shoppingList": [
      {
        "category": "Category Name",
        "items": [
          {"name": "Item Name", "quantity": "value unit"}
        ]
      }
    ]
  }
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: [
            `You are a meal planning assistant. Provide the meal plan in JSON format only, with no additional commentary.`,
            `MUST provide the meal plan for exact ${days} days`,
            "never use any thing that distroy the json or is structuring or give error",
            `must provide the meal plan for exact ${days}`,
            `MUST provide the shopping list for ${days} and according to the number of persons that is ${persons}`,
            `Ensure the meal plan consists of exactly ${persons} peoples, each corresponding to one serving.`,
            "Follow the provided structure and do not include any additional information, headers, or categories like 'breakfast' or 'lunch'.",
          ].join(" "),
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      model: "gpt-4o-mini",
    });
    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error("No response content from OpenAI");
    }

    const cleanedContent = cleanResponseContent(responseContent);
    try {
      JSON.parse(cleanedContent);
    } catch (e) {
      throw new Error("Invalid JSON structure in response");
    }
    const mealPlanHtml = parseMealPlanToHtml(cleanedContent);
    const cleanedResponse = mealPlanHtml.replace(/\\n/g, "");

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    function generateMealPlanHTML(cleanedResponse: any) {
      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
        ${styleData}
        </style>
        </head>
        <body>
        <img src="https://www.gbmeals.com/static/media/logo2.2cc494b3c43bf1131ac7.png" 
        alt="Logo" 
        style="display: block; margin: 10px auto; width: 100px; height: auto;" />
        ${cleanedResponse}
        </body>
        </html>
        `;
    }

    const splitMarker = "<h1>Weekly Shopping List</h1>";
    const parts = cleanedResponse.split(splitMarker);

    const part1Response = parts[0];
    const shopingListHTML = generateMealPlanHTML(part1Response);

    const part2Response = parts[1];
    const mealPlanHTML = generateMealPlanHTML(part2Response);

    await page.setContent(mealPlanHTML, { waitUntil: "networkidle0" });
    const mealPlanPDF = await page.pdf({ format: "A4" });

    await page.setContent(shopingListHTML, { waitUntil: "networkidle0" });
    const shoppingListPDF = await page.pdf({ format: "A4" });

    await browser.close();
    //@ts-ignore
    const result = await SavePdfAws(id, shoppingListPDF, mealPlanPDF);

    await sendPdf(mealPlanPDF, shoppingListPDF);

    return new NextResponse("Pdf generated successfully.", {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=meal_plan.pdf",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred while processing the request" }, { status: 500 });
  }
}
