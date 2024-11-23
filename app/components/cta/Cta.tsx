"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import "./cta.css";
import { useSession } from "next-auth/react";

interface CtaProps {
  title: string;
  description: string;
}

const Cta: React.FC<CtaProps> = ({ title, description }) => {
  const router = useRouter();
  const { data: session } = useSession();
  // Function to handle the "Contact Us" button click, navigates to the contact us page
  const handleContactUsClick = () => {
    if (session) {
      router.push("/myAccount");
    } else {
      router.push("/plans");
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<string>("");

  // Handle input changes for form fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("https://meeel.xyz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="ctac">
      <div className="cta1c">
        <div className="citemc">
          <div className="flex gap-8 justify-start flex-col xl:flex-row">
            <div>
              <h3 className="inline-block text-xl border-b-8 border-S-Orange leading-none font-bold">Get in Touch</h3>
              <h2 className="ctah2c text-2xl 2xl:text-5xl font-bold">{title}</h2>
              <p className="ctapc text-lg">{description}</p>
              <button
                className="py-2 px-10 rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                onClick={handleContactUsClick}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
