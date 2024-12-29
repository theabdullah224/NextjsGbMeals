/* eslint-disable @typescript-eslint/ban-ts-comment */


import React from "react";
import Navbar from "../components/navbar/Navbar";
import FrontPage from "./components/frontpage/FrontPage";
import Reciptcomp from "./components/reciptComp/ReciptComp";
import Testimonials from "./components/testimonials/Testimonials";

// import images

import bgimge from "../../public/Resource/image2.jpg";
import delecious from "../../public/Resource/delicious.jpg";
import Breakfast1 from "../../public/Resource/breakfast1.png";
import Breakfast2 from "../../public/Resource/breakfast2.png";
import Breakfast3 from "../../public/Resource/breakfast3.png";
import Favicon from "../../public/Resource/favicon.png";
import Image from "next/image";
import SaveMoney from "./components/saveMoney/SaveMoney";
import PriceCard from "./components/priceCard/PriceCard";
import bgimg from "../../public/Resource/aa890aa8e363918f0c0a94e60eee432c.jpg";
import wbgimg from "../../public/Resource/wbgimg.jpg";

import love from '../../public/Resource/love-letter 1.svg'
import WeeklyOverlap from "../components/weeklyOverlap/WeeklyOverlap";
import Faq from "../components/faq/Faq";
import Cta from "../components/cta/Cta";
import Footer from "../components/footer/Footer";
import CopyRight from "../components/copyRight/copyRight";

export default function page() {
  return (
    <>
    
      <Navbar />
      <FrontPage 
      title="Subscribe And Enjoy 30 Days For Free." 
      description="Receive a weekly meal plan tailored to your preferences and dietary needs." bgimg={bgimge.src} display="block" btndisplay="none" />
      
    

      {/* component */}

      <div className="customizable">
        <div className="">
          <div className="">
            <h4 className="text-2xl border-b-8 border-S-Orange leading-none font-bold inline-block text-Text1" style={{ marginBottom: `5vh` }}>
              Meal Plan
            </h4>
            <Reciptcomp
            // @ts-ignore
              ricon={Breakfast1}
              title="Tailored Meal Plans"
              description="Receive personalized meal plans designed to meet your dietary needs and preferences. Our plans are carefully crafted by nutrition experts to ensure a balanced and healthy diet."
            />
            <Reciptcomp
            // @ts-ignore
              ricon={Breakfast2}
              title="Easy-to-Follow Recipes"
              description="Our recipes are simple and straightforward, making it easy for you to prepare delicious meals at home. Each recipe comes with step-by-step instructions and cooking tips."
            />
            <Reciptcomp
            // @ts-ignore
              ricon={Breakfast3}
              title="Convenient Shopping List"
              description="Save time and eliminate the guesswork with our convenient shopping list. We provide you with a detailed list of ingredients needed for each recipe, making grocery shopping a breeze."
            />
          </div>
        </div>
        <div className="image-side">
          <div className="image">
            <div className="imgcccc">
              <Image className="favicon111" width={100} height={100} src={Favicon.src} alt="" />
            </div>
          </div>
        </div>
      </div>

      <SaveMoney
        left="-6.6vw"
        bgimg={delecious.src}
        subtitle="Meal Plan"
        bspecialtext="Get Your "
        specialtext="Weekly Meal"
        aspecialtext=" Plan in PDF"
        display="none"
        description="Subscribe now and receive a delicious and healthy meal plan every Friday in PDF format. Take the hassle out of meal planning and enjoy the convenience of having your meals ready for the week." orderleft={""} leftfancy={""} descleft={""} rightfancy={""} righdesc={""} orderimg={""} imgscale={""}      />

      <PriceCard />
      
      <Testimonials
      display="block"
      border="2px solid #F5A228"
      logo={love.src}
      // @ts-ignore
        subtitle="Subscribe"
        title="Get your meal plan now "
        description= "Subscribe to receive your weekly meal plan PDF"
        // bgimg={Testbg}
        testcolor="rgba(255, 255, 255, 0.95)"
      />
 <WeeklyOverlap
        titlefont="65px"
        btndisplay="none"
        bgimg={bgimg.src}
        bgfront={wbgimg.src}
        inputdisplay="block"
        displayfvicon="none"
        downbtndescription="By joining, you agree to our Terms and Conditions"
        //  subtitle=''
        title="Subscribe to our Meal Plan"
        description="Get delicious and healthy meal plans every week" subtitle={""}      />

<div className="heighth">
        
        </div>


        <div id='faqs'>
      <Faq
        description="Find answers to common questions about our meal plans, portion sizes, dietary restrictions, and subscription details."
        question1="What are the portion sizes?"
        // @ts-ignore
        question2="Are there any dietary restrictions?"
        question3="How does the subscription work?"
        question4="Can I customize the servings?"
        question5="Still have questions?"
        
        ans1="Our meal plans provide recommended portion sizes based on the Mediterranean and centenarian diets. These portion sizes are designed to promote a balanced and healthy lifestyle."
        ans2=""
        ans3=""
        ans4=""
        ans5=""
        />
        </div>

        <Cta
      title="Contact us"
      description="Have more questions? Get in touch with us."
    />
    <Footer/>
    <CopyRight/>

    </>
  );
}
