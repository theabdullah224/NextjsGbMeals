import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Banner from "../components/banner/Banner";
import Cook from '../components/cook/Cook';
import SaveMoney from '../components/saveMoney/SaveMoney';

const page = () => {
  return (
    <>
  <Navbar />
      <Banner />
      <Cook
        subtitle="Healthy Meal"
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
        descleft=" Plan your meals in advance and spend less time figuring out what
              to cook."
              rightfancy="Eat Healthier"
              righdesc="Enjoy nutritious meals made with fresh ingredients that support
              your well-being."
      />

    </>
  )
}

export default page
