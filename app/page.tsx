/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// native  modules
import Image from "next/image";

// custom components
import Banner from "./components/banner/Banner";
import Cook from "./components/cook/Cook";
import SaveMoney from "./components/saveMoney/SaveMoney";
import DiscoverBenifits from "./components/discoverBenifits/DiscoverBenifits";
import Save from "./components/save/Save";
import Faq from "./components/faq/Faq";

// assets
import srcimg from "../public/Resource/couple-teamwork-kitchen.jpg";
import bgimg from "../public/Resource/aa890aa8e363918f0c0a94e60eee432c.jpg";
import workinglady from "../public/Resource/workinglady.jpg";
import Navbar from "./components/navbar/Navbar";
import WeeklyOverlap from "./components/weeklyOverlap/WeeklyOverlap";
import bgfront from "../public/Resource/bgfront.jpg";
import ndlady from "../public/Resource/2ndlady.jpg";
import Cta from "./components/cta/Cta";
import Footer from "./components/footer/Footer";
import CopyRight from "./components/copyRight/copyRight";

export default function Home() {
  return (
    <>
      <>
        <Navbar />
        <Banner />
        <Cook
          subtitle="Healthy Meal "
          description="Our meal planning service takes the stress out of deciding what to cook and ensures you eat nutritious meals every day. With our carefully curated meal plans, you can enjoy the benefits of a healthy diet without the hassle of planning and shopping."
          srcimg={srcimg}
          // shadowcolor="#738065"
        />
        <SaveMoney
          left="-6.6vw"
          subtitle="Discover"
          bspecialtext="Cook Fresh, "
          specialtext="Eat Well,"
          aspecialtext=" Live Better"
          display="block"
          description="Experience the benefits of cooking at home with fresh ingredients.
      Our meal planner makes it easy to create delicious and healthy
      meals."
          bgimg={workinglady.src}
          leftfancy="Save Time"
          descleft=" Plan your meals in advance and spend less time figuring out what to cook."
          rightfancy="Eat Healthier"
          righdesc="Enjoy nutritious meals made with fresh ingredients that support your well-being."
        />
        <WeeklyOverlap
          bgimg={bgimg.src}
          bgfront={bgfront.src}
          inputdisplay="none"
          displayfvicon="none"
          subtitle="Healthy"
          title="Discover the Health Benefits of Mediterranean and Centenarian Diets"
          description="The Mediterranean and Centenarian diets are renowned for their health benefits. Packed with fresh fruits, vegetables, whole grains, and lean proteins, these diets promote heart health, weight management and longevity.Our balanced diet is based on the mediterranean and centenarian diet."
          titlefont={""}
          downbtndescription={""}
          btndisplay={""}
        />

        <DiscoverBenifits subtitle={""} />
        <Save srcimg={ndlady.src} />

        <Faq
          description="Frequently asked questions ordered by popularity. Remember that if the visitor has not committed to the call to action, they may still have questions (doubts) that can be answered."
          question1="How does it work?" ans1={""}          
     
        />

        <Cta
          title="Still Have Questions? "
          description="Feel free to reach out to us."
        />
        <Footer />
        <CopyRight />
      </>
    </>
  );
}
