"use client";
import Link from "next/link";
import Navbar from "../components/navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, UserRound, X, Edit, AtSign, CreditCard, BadgeX, MessageSquareDot, File, FileSpreadsheet, Trash2, Copyright } from "lucide-react";
import { useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import axios from "axios";
import Cta from "../components/cta/Cta";
import Footer from "../components/footer/Footer";
import ShowPdf from "../components/showPdf/ShowPdf";
import ContactUsPage from "../components/contactPageUser/ContactUsPage";
import Pref from "../pref/Pref";
import Temp from "../components/temp/Temp";
import { LocaleRouteNormalizer } from "next/dist/server/normalizers/locale-route-normalizer";
import CopyRight from "../components/copyRight/copyRight";

export default function page() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pdf");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const inputRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [save, setsave] = useState("Save");
  const [colories, setcolories] = useState("");
  const [servings, setServings] = useState("");
  const [familymember, setfamilymember] = useState("1");
  const [allergy, setallergy] = useState("");
  const [dislike, setdislike] = useState("");
  const [diatryrestriction, setdiatryrestriction] = useState("");
  const [pdfs, setPdfs] = useState([]);
  const [pdfList, setPdfList] = useState([]);
  const router = useRouter();

 



  const handleDelete = (id) => {
    const updatedList = pdfList.filter((pdf) => pdf.id !== id);
    setPdfList(updatedList);
    localStorage.setItem("pdfList", JSON.stringify(updatedList));
  };
  const handleEditClick = () => {
    setIsEditable((prev) => !prev);

    // Focus the input when it becomes editable
    setTimeout(() => {
      if (!isEditable && inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };
  const handleEmailEditClick = () => {
    setIsEmailEditable((prev) => !prev);

    // Focus the input when it becomes editable
    setTimeout(() => {
      if (!isEditable && inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  useEffect(() => {
  
    if (session) {
      
      setName(session?.user?.name || "Not available");
      setemail(session?.user?.email || "Not available");
    }

  }, []); 
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
  
  };

  
  // const fetchUserData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`https://meeel.xyz/show`, {
  //       headers: { Authorization: userId.toString() },
  //     });

  //     if (response.data && typeof response.data === "object") {
  //       setUserData(response.data);

  //       setName(response.data.name || "Not available");
  //       setemail(response.data.email || "Not available");
  //       setServings(response.data.servings || "Not available");
  //       setallergy(response.data.food_allergy || "Not available");
  //       setdiatryrestriction(response.data.dietary_restriction || "Not available");
  //       setdislike(response.data.dislikes || "Not available");
  //       setfamilymember(response.data.preferred_meal || "Not available");

  //       setcolories(response.data.total_calories || "Not available");
  //       localStorage.setItem("userdata", JSON.stringify(response.data));

  //       // Log the response data (or the saved data)
  //     } else {
  //       throw new Error("Unexpected response format");
  //     }
  //   } catch (error) {
  //     setError("Failed to fetch user data: " + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const MenuItem = ({ icon: Icon, text, onClick, isActive }) => (
    <div className={`flex items-center py-3 px-4 rounded-lg text-Text2 hover:bg-P-Green2/20 hover:cursor-pointer transition-all duration-300 ${isActive ? "bg-P-Green2/30 text-Text1" : ""}`} onClick={onClick}>
      <Icon size={20} className={isActive ? "" : "text-P-Green1"} />
      <span className={`ml-4 ${!isOpen && "hidden"} lg:block font-medium`}>{text}</span>
    </div>
  );
  const handleSaveNameClick = async () => {
    if (session?.user) {
      const userId = session.user.id;
      const userName = session.user.name;
  
      setLoading(true);
      try {
        const response = await axios.put(
          `/api/update`,
          { 
            id: userId, 
            name: name || userName 
          },
          {
            headers: { Authorization: userId.toString() },
          }
        );
  
        if (response.status === 200) {
          // fetchUserData(); // Refetch user data to get the latest info
          setIsEditable(false);
        }
      } catch (error) {
        setError(`Failed to update user data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };
  // const handleSaveEmailClick = async () => {
  //   // eslint-disable-next-line no-restricted-globals
  //   if (confirm("Are you sure you want to change your email? This action will cancel your current subscription plan.")) {
      

  //     if (session) {
  //       const userId = session?.user?.id;
  //       const email = session?.user?.email;

  //       // setsave("Saving...");
  //       setLoading(true);

  //       try {
  //         const response = await axios.put(
  //           `/api/emailUpdate`,
  //           { email },
  //           {
  //             headers: { Authorization: userId.toString() },
  //           }
  //         );

  //         if (response.status === 200) {
  //           setIsEditable(false);
  //           // fetchUserData(); // Refetch user data to get the latest info
  //         }
  //       } catch (error) {
  //         setError("Failed to update user data: " + error.message);
  //       } finally {
  //         setLoading(false);

  //         setIsEmailEditable(false);
  //       }
  //     }
  //   } else {
  //     setIsEmailEditable(false);
  //   }
  // };
  const handleSaveEmailClick = async () => {
    if (confirm("Are you sure you want to change your email? This action will cancel your current subscription plan.")) {
      if (session) {
        const userId = session?.user?.id;
        const Useremail = session?.user?.email;
  
        setLoading(true);
  
        try {
          const response = await axios.put(
            '/api/emailUpdate',
            { 
              id: userId, 
              email :email || Useremail },
            {
              headers: { Authorization: userId.toString() },
            }
          );
  
          if (response.status === 200) {
            setIsEditable(false);
          }
        } catch (error) {
          setError("Failed to update user data: " + error.message);
        } finally {
          setLoading(false);
          setIsEmailEditable(false);
        }
      }
    } else {
      setIsEmailEditable(false);
    }
  };

  const handleSaveServingsClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.user_id;

      setsave("Saving...");
      setLoading(true);

      try {
        const response = await axios.put(
          `https://meeel.xyz/update`,
          { servings },
          {
            headers: { Authorization: userId.toString() },
          }
        );

        if (response.status === 200) {
          setIsEditable(false);
          fetchUserData(); // Refetch user data to get the latest info
        }
      } catch (error) {
        setError("Failed to update servings: " + error.message);
      } finally {
        setLoading(false);
        setsave("Save successful!");
        setTimeout(() => {
          setsave("Save");
          setIsEditable(false);
        }, 2000);
      }
    }
  };

  const handleFoodAllergy = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.user_id;

      setsave("Saving...");
      setLoading(true);

      try {
        const response = await axios.put(
          `https://meeel.xyz/update`,
          { food_allergy: allergy },
          {
            headers: { Authorization: userId.toString() },
          }
        );

        if (response.status === 200) {
          setIsEditable(false);
          fetchUserData(); // Refetch user data to get the latest info
        }
      } catch (error) {
        setError("Failed to update servings: " + error.message);
      } finally {
        setLoading(false);
        setsave("Save successful!");
        setTimeout(() => {
          setsave("Save");
          setIsEditable(false);
        }, 2000);
      }
    }
  };

  // const handledislike = async () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     const userId = user.user_id;

  //     setsave("Saving...");
  //     setLoading(true);

  //     try {
  //       const response = await axios.put(
  //         `https://meeel.xyz/update`,
  //         { dislikes: dislike },
  //         {
  //           headers: { Authorization: userId.toString() },
  //         }
  //       );

  //       if (response.status === 200) {
  //         setIsEditable(false);
  //         fetchUserData(); // Refetch user data to get the latest info
  //       }
  //     } catch (error) {
  //       setError("Failed to update servings: " + error.message);
  //     } finally {
  //       setLoading(false);
  //       setsave("Save successful!");
  //       setTimeout(() => {
  //         setsave("Save");
  //         setIsEditable(false);
  //       }, 2000);
  //     }
  //   }
  // };
  // const handlepreferredmeal = async () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     const userId = user.user_id;

  //     setsave("Saving...");
  //     setLoading(true);

  //     try {
  //       const response = await axios.put(
  //         `https://meeel.xyz/update`,
  //         { dietary_restriction: diatryrestriction },
  //         {
  //           headers: { Authorization: userId.toString() },
  //         }
  //       );

  //       if (response.status === 200) {
  //         setIsEditable(false);
  //         fetchUserData(); // Refetch user data to get the latest info
  //       }
  //     } catch (error) {
  //       setError("Failed to update servings: " + error.message);
  //     } finally {
  //       setLoading(false);
  //       setsave("Save successful!");
  //       setTimeout(() => {
  //         setsave("Save");
  //         setIsEditable(false);
  //       }, 2000);
  //     }
  //   }
  // };
  // const handlefamily = async () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     const userId = user.user_id;

  //     setsave("Saving...");
  //     setLoading(true);

  //     try {
  //       const response = await axios.put(
  //         `https://meeel.xyz/update`,
  //         { preferred_meal: familymember },
  //         {
  //           headers: { Authorization: userId.toString() },
  //         }
  //       );

  //       if (response.status === 200) {
  //         setIsEditable(false);
  //         fetchUserData(); // Refetch user data to get the latest info
  //       }
  //     } catch (error) {
  //       setError("Failed to update servings: " + error.message);
  //     } finally {
  //       setLoading(false);
  //       setsave("Save successful!");
  //       setTimeout(() => {
  //         setsave("Save");
  //         setIsEditable(false);
  //       }, 2000);
  //     }
  //   }
  // };
  // const handlecolories = async () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     const userId = user.user_id;

  //     setsave("Saving...");
  //     setLoading(true);

  //     try {
  //       const response = await axios.put(
  //         `https://meeel.xyz/update`,
  //         { total_calories: colories },
  //         {
  //           headers: { Authorization: userId.toString() },
  //         }
  //       );

  //       if (response.status === 200) {
  //         setIsEditable(false);
  //         fetchUserData(); // Refetch user data to get the latest info
  //       }
  //     } catch (error) {
  //       setError("Failed to update servings: " + error.message);
  //     } finally {
  //       setLoading(false);
  //       setsave("Save successful!");
  //       setTimeout(() => {
  //         setsave("Save");
  //         setIsEditable(false);
  //       }, 2000);
  //     }
  //   }
  // };
  // .............................................................................................. functions .............................................

  const handleCtaClick = () => {  
    setActiveTab('contact');
  };
  return (
    <>
    <div className="min-h-screen">
      <Navbar />
      <div className="flex min-h-screen bg-white">
        {/* Sidebar */}

        <div id="sidebarid" className={`bg-white absolute shadow-lg transition-all duration-300 overflow-y-auto h-screen z-50 ${isOpen ? "w-64" : "w-12"} lg:w-[20rem]`}>
          <div className="flex items-center justify-between px-4">
            {/* <h2
              className={`text-xl font-semibold ${
                !isOpen && "hidden"
              } lg:block`}
            >
              Profile
            </h2> */}
            <button onClick={toggleSidebar} className="lg:hidden">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <nav>
            <div className={`p-4 ${!isOpen && "hidden"} lg:block`}>
              <h3 className="text-lg font-semibold mb-2 capitalize ">Profile</h3>
            </div>

            <div
              className={`${
                isOpen ? "bg-gradient-to-r from-P-Green2/30 to-P-Green2/10 px-4 py-4 rounded-xl mx-4 mb-6 shadow-inner" : " lg:bg-gradient-to-r lg:from-P-Green2/30 lg:to-P-Green2/10 lg:px-4 lg:py-4 lg:rounded-xl lg:mx-4 lg:mb-6 lg:shadow-inner "
              }`}
            >
              <MenuItem
                icon={UserRound}
                text={name} 
                onClick={() => {
                  setActiveTab("name");
                  setIsEditable(false);
                }}
                isActive={activeTab === "name"}
              />
              <div className="flex items-center justify-center py-3 px-4 rounded-lg text-Text2  transition-all duration-300 ">
                {!isEditable && <UserRound size={25} className="text-P-Green1" />}
                <input
                  id="name"
                  type="text"
                  ref={inputRef}
                  className={` border-Text2 py-3 px-4 capitalize  bg-transparent rounded-lg w-full placeholder-Text2 text-Text2 focus:outline-none focus:ring-2 focus:ring-transparent transition duration-300 ${
                    isEditable ? "border-P-Green1 bg-white" : "border-gray-300 bg-gray-100"
                  }`}
                  value={name }
                
                  disabled={!isEditable}
                  onChange={(e) => setName(e.target.value)}
                />
                {!isEditable && <Edit size={20} className="text-P-Green1" onClick={handleEditClick} />}
                {isEditable && (
                  <button
                    className="ml-2 py-2 px-4 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                    onClick={handleSaveNameClick}
                  >
                    {save}
                  </button>
                )}
              </div>

              <div className="flex items-center justify-center py-3 px-4 rounded-lg text-Text2  transition-all duration-300 ">
                {!isEmailEditable && <AtSign size={25} className="text-P-Green1" />}

                <input
                  id="email"
                  type="email"
                  ref={inputRef}
                  className={` border-Text2 py-3 px-4 capitalize  bg-transparent rounded-lg w-full placeholder-Text2 text-Text2 focus:outline-none focus:ring-2 focus:ring-transparent transition duration-300 ${
                    isEmailEditable ? "border-P-Green1 bg-white" : "border-gray-300 bg-gray-100"
                  }`}
                  value={email}
                  disabled={!isEmailEditable}
                  onChange={(e) => setemail(e.target.value)}
                />
                {!isEmailEditable && <Edit size={20} className="text-P-Green1" onClick={handleEmailEditClick} />}
                {isEmailEditable && (
                  <button
                    className="ml-2 py-2 px-4 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                    onClick={handleSaveEmailClick}
                  >
                    {save}
                  </button>
                )}
              </div>
            </div>

            <div className={`px-4  border-gray-200 ${!isOpen && "hidden"} lg:block`}>
              <h3 className="text-lg font-medium mb-2">Subscription</h3>
            </div>

            <div
              className={`${
                isOpen ? "bg-gradient-to-r from-P-Green2/30 to-P-Green2/10 px-4 py-4 rounded-xl mx-4 mb-6 shadow-inner" : " lg:bg-gradient-to-r lg:from-P-Green2/30 lg:to-P-Green2/10 lg:px-4 lg:py-4 lg:rounded-xl lg:mx-4 lg:mb-6 lg:shadow-inner "
              }`}
            >
              <MenuItem
                icon={CreditCard}
                text="Manage Subscription"
                onClick={() => {
                  setActiveTab("payment");
                  setIsOpen(false);
                  setIsEditable(false);
                }}
                isActive={activeTab === "payment"}
              />
            </div>

            <div className={`px-4  border-gray-200 ${!isOpen && "hidden"} lg:block`}>
              <h3 className="text-lg font-medium mb-2">My Files</h3>
            </div>
            <div
              className={`${
                isOpen ? "bg-gradient-to-r from-P-Green2/30 to-P-Green2/10 px-4 py-4 rounded-xl mx-4 mb-6 shadow-inner" : " lg:bg-gradient-to-r lg:from-P-Green2/30 lg:to-P-Green2/10 lg:px-4 lg:py-4 lg:rounded-xl lg:mx-4 lg:mb-6 lg:shadow-inner "
              }`}
            >
              <MenuItem
                icon={File}
                text="Resource Center"
                onClick={() => {
                  setActiveTab("pdf");
                  setIsOpen(false);
                  setIsEditable(false);
                }}
                isActive={activeTab === "pdf"}
              />
            </div>
            <div className={`px-4  border-gray-200 ${!isOpen && "hidden"} lg:block`}>
              <h3 className="text-lg font-medium mb-2">Preferences</h3>
            </div>

            <div
              className={`${
                isOpen ? "bg-gradient-to-r from-P-Green2/30 to-P-Green2/10 px-4 py-4 rounded-xl mx-4 mb-6 shadow-inner" : " lg:bg-gradient-to-r lg:from-P-Green2/30 lg:to-P-Green2/10 lg:px-4 lg:py-4 lg:rounded-xl lg:mx-4 lg:mb-6 lg:shadow-inner "
              }`}
            >
              <MenuItem
                icon={FileSpreadsheet}
                text="Manage Preferences"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth", // This adds smooth scrolling
                  });
                  setActiveTab("pdfgenerate");
                  setIsOpen(false);
                  setIsEditable(false);
                }}
                isActive={activeTab === "pdfgenerate"}
              />
            </div>
            <div className={`px-4  border-gray-200 ${!isOpen && "hidden"} lg:block`}>
              <h3 className="text-lg font-medium mb-2">Contact & Support</h3>
            </div>
            <div
              className={`${
                isOpen ? "bg-gradient-to-r from-P-Green2/30 to-P-Green2/10 px-4 py-4 rounded-xl mx-4 mb-6 shadow-inner" : " lg:bg-gradient-to-r lg:from-P-Green2/30 lg:to-P-Green2/10 lg:px-4 lg:py-4 lg:rounded-xl lg:mx-4 lg:mb-6 lg:shadow-inner "
              }`}
            >
              <MenuItem
                icon={MessageSquareDot}
                text="Contact Us"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                  setActiveTab("contact");
                  setIsOpen(false);
                  setIsEditable(false);
                }}
                isActive={activeTab === "contact"}
              />
            </div>
            <div className={`px-4  border-gray-200 ${!isOpen && "hidden"} lg:block`}>
              <h3 className="text-lg font-medium mb-2">Delete Account</h3>
            </div>
            <div
              className={`${
                isOpen ? "bg-gradient-to-r from-P-Green2/30 to-P-Green2/10 px-4 py-4 rounded-xl mx-4 mb-6 shadow-inner" : " lg:bg-gradient-to-r lg:from-P-Green2/30 lg:to-P-Green2/10 lg:px-4 lg:py-4 lg:rounded-xl lg:mx-4 lg:mb-6 lg:shadow-inner "
              }`}
            >
              <MenuItem
                icon={Trash2}
                text="Delete Account"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth", // This adds smooth scrolling
                  });
                  setActiveTab("account");
                  setIsOpen(false);
                  setIsEditable(false);
                }}
                isActive={activeTab === "account"}
              />
            </div>
          </nav>
        </div>
        <div className={`${isOpen ? "w-64" : "w-16"} lg:w-72`}></div>
        {/* Main content */}

        <div className="flex-1  h-fit sm:h-screen   flex items-start justify-start lg:ml-8  py-2 sm:py-2">
          <div className="flex-1   sm:p-8  bg-white  overflow-hidden max-w-4xl w-fit   items-start justify-start flex  h-fit  sm:mx-6   overflow-y-auto ">
            {activeTab === "payment" && <Temp />}
            {activeTab === "account" && (
              <div className=" py-4 flex items-center justify-center ">
                <Link href="/deleteAccount" >
                  <button
                    onClick={() => {
                      window.confirm("Are you sure you want to delete your account? This action is permanent and cannot be undone. All your data will be lost.");
                    }}
                    className="py-2    mx-auto md:mx-0 px-6 sm:px-8 box-border rounded-lg flex items-center justify-center bg-transparent border-2 border-Text1 text-Text1   hover:bg-red-600 hover:text-white transition-all font-roboto font-medium text-xs sm:text-base"
                  >
                    Delete Account
                  </button>
                </Link>
              </div>
            )}
            {activeTab === "pdf" && (
              <>

         
              <ShowPdf/>
              </>
            )}
            {activeTab === "contact" && <ContactUsPage />}

            {activeTab === "pdfgenerate" && <Pref />}
          </div>
        </div>
      </div>

      <Cta
      title="Contact us"
      description="Have more questions? Get in touch with us."
      onClick={handleCtaClick}
    /> 
     <Footer/>
      <CopyRight/>
    </div>
    </>
  );
}
