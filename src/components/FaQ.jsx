import React, { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import SmallCrumb from "./SmallCrumb";
import { useEffect } from "react";

const faqs = [
  {
    category: "Registration",
    questions: [
      {
        question: "How to Register?",
        answer: "Here is the answer to registration.",
      },
      {
        question: "How much does it cost to register?",
        answer: "It costs X amount to register.",
      },
    ],
  },
  {
    category: "Search",
    questions: [
      {
        question: "Lorem ipsum dolor sit amet consectetur?",
        answer: "Lorem ipsum dolor sit amet.",
      },
      {
        question: "Lorem ipsum dolor sit amet consectetur?",
        answer: "Lorem ipsum dolor sit amet.",
      },
      {
        question: "Lorem ipsum dolor sit amet consectetur?",
        answer: "Lorem ipsum dolor sit amet.",
      },
      {
        question: "Lorem ipsum dolor sit amet consectetur?",
        answer: "Lorem ipsum dolor sit amet.",
      },
    ],
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate(); // ✅ Create navigate function

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className=" min-h-screen  text-left bg-white">
        <div className="pt-16 ">
          <SmallCrumb />
        </div>
        <div className="max-w-[85rem] mx-auto p-6">
          <h1 className="text-2xl font-semibold text-[#004D41]">
            Frequently Asked Questions
          </h1>
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mt-4">
              <h2 className="font-bold text-lg pt-2 text-[#252A31] pb-2 underline">
                {section.category}
              </h2>
              {section.questions.map((faq, index) => {
                const isOpen = openIndex === `${sectionIndex}-${index}`;
                return (
                  <div
                    key={index}
                    className="border-b border-[#cce0de] p-4 cursor-pointer leading-3 text-[#4F5E71] text-base font-[500] bg-white"
                    onClick={() => toggleFAQ(`${sectionIndex}-${index}`)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[#4F5E71]">{faq.question}</span>
                      {isOpen ? (
                        <IoChevronUp size={20} />
                      ) : (
                        <IoChevronDown size={20} />
                      )}
                    </div>
                    {isOpen && (
                      <p className="text-[#4F5E71] mt-2 bg-[#ECF8F7] p-3 rounded">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="text-center pb-6 mt-auto">
          <button
            className="bg-[#00A991] text-white px-4 py-2 rounded-sm"
            onClick={() => navigate("/")} // ✅ Navigate to home on click
          >
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default FAQ;
