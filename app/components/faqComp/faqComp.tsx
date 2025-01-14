// components/FAQ.tsx
"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import './faqcomp.css'
// Define types for FAQItem props
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
  
    <div className="mb-4  bg-white py-6 w-full max-w-[45rem]   rounded-lg shadow-sm overflow-hidden ">
      <button
       aria-label="open"
        className="w-full text-left p-3 sm:p-4 flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h6 className="text-sm sm:text-base lg:text-lg my-auto font-medium text-gray-800">
          {question}
        </h6>
        <div className="p-[8px] flex items-center justify-center rounded-md bg-orange-400 text-white">
          <FontAwesomeIcon
            icon={isOpen ? faMinus : faPlus}
            className="text-sm sm:text-lg"
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="p-3 sm:p-4 pt-0">
          <p className="text-sm sm:text-base text-gray-700 pr-4 sm:pr-16 text-justify leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// Define types for FAQ data
interface FAQData {
  question: string;
  answer: string;
}

const FAQComp: React.FC = () => {
  const faqData: FAQData[] = [
    {
      question: "What is gbmeals?",
      answer:
        "At gbmeals, we believe that optimal health begins with the food you eat. Our service is built around meticulously crafted meal plans that simplify healthy eating. By using cutting-edge nutritional science, we empower our users to make informed dietary choices, aiming to help you lead a vibrant and balanced life through wholesome, delicious meals.",
    },
    {
      question: "How does gbmeals work?",
      answer:
        "When you sign up for gbmeals, you receive a complete, individualized 6-day meal plan and a shopping list every week by email. Our meal plans are tailored to your dietary needs and preferences, using the latest technology to ensure you enjoy and benefit from every meal.",
    },
    {
      question: "What kind of meal plans does gbmeals offer?",
      answer:
        "We offer a variety of meal plans, including options for carnivore, paleo, and vegetarian diets. Each plan is designed to cater to specific dietary needs and preferences, and we provide detailed explanations of the pros and cons of each diet to help you make informed choices.",
    },
    {
      question: "How much does gbmeals cost?",
      answer:
        "You can subscribe to our service for £6.99 per month or take advantage of our annual subscription for £59. You can cancel your subscription at any time.",
    },
    {
      question:
        "Can I customize my meal plan according to my dietary restrictions?",
      answer:
        "Yes! Our meal plans are highly customizable. We take into account individual dietary needs, preferences, and health goals to create a meal plan that’s just right for you.",
    },
    {
      question: "Why should I cook my own meals?",
      answer:
        "Cooking your own meals gives you control over ingredients and portion sizes, promoting a healthier diet. It also reduces your intake of unhealthy fats, sugars, and sodium. Regular home cooking is associated with a lower risk of chronic diseases and can enhance mental well-being.",
    },
    {
      question:
        "What makes gbmeals different from other meal planning services?",
      answer:
        "Unlike many other services, gbmeals focuses on sustainable, long-term lifestyle changes rather than quick fixes. We emphasize the development of cooking skills and personalized nutrition, ensuring our plans not only meet your dietary needs but also help you establish lifelong healthy eating habits.",
    },
    {
      question: "How can following a meal plan from gbmeals benefit my health?",
      answer:
        "Our meal plans encourage a balanced diet and include a wide range of foods, ensuring you get all the necessary nutrients. This can prevent nutrient deficiencies, promote long-term health, and support weight management.",
    },
    {
      question: "What is the vision of gbmeals?",
      answer:
        "Our vision is to revolutionize health one meal at a time. Inspired by our founder’s personal health transformation, gbmeals is dedicated to empowering individuals to overcome modern lifestyle challenges through informed and healthy food choices.",
    },
  ];

  return (


    <section className="relative h-fit  py-8 sm:py-12 bg-[#f7f7f6] rounded-3xl   overflow-hidden   ">
      {/* Background Vector Image */}
      <Image
        src="/Resource/Vector (1).svg"
        alt=""
        width={500} // Dynamic scaling for responsiveness
        height={500}
        className="absolute -z-1 top-0 left-1/2 transform -translate-x-1/2 sm:left-[35%] sm:w-[300px] md:w-[400px] lg:w-fit"
      />

      {/* Decorative Lines Image */}
      <Image
        src="/Resource/Lines group.svg"
        alt=""
        width={100}
        height={100}
        className="absolute top-4 left-4 w-12 sm:w-16 md:w-24 lg:w-28 -z-1"
      />

      <div className="    relative  mx-auto px-4 z-50 ">
        <div className="flex items-center justify-center flex-wrap  w-full  gap-6">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQComp;
