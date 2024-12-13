"use client"
import React from "react"; 
import Cta from "../components/cta/Cta"; 
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import CopyRight from "../components/copyRight/copyRight";

import Tab from "./tab/Tab";


const page: React.FC = () => {




  return (
    <div className="!w-full overflow-x-hidden">
      <Navbar />
      
      <Tab />
      <Cta
        title="Still have Questions?"
        description="Feel free to reach out to us."
      />
      <Footer />
      <CopyRight />
    </div>
  );
};

export default page;
