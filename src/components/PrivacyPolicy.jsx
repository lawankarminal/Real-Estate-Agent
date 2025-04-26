import React from "react";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import SmallCrumb from "./SmallCrumb";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col text-left ">
        <div className="pt-16 ">
          <SmallCrumb />
        </div>

        <div className="max-w-[85rem] mx-auto p-6">
          <h1 className="text-2xl font-semibold text-[#004D41] mt-5 mb-8 ml-6">
            Privacy Policy
          </h1>
          <p className="text-[#697D95] font-[500] text-base mt-4 leading-relaxed ml-6">
            Lorem ipsum dolor sit amet consectetur. Sit hendrerit felis a id
            magna elit faucibus sit egestas. Elementum turpis felis tristique
            vestibulum sed integer commodo pellentesque. Scelerisque erat
            scelerisque in velit id nullam. Velit amet tempor duis diam elit
            semper orci massa massa. Ornare felis ultricies tempus purus
            tristique. Lectus nec nec turpis fermentum tellus morbi habitant
            enim. Facilisis felis aliquam tempor pellentesque. Risus purus erat
            sit vitae adipiscing in. Sodales massa scelerisque quis enim
            hendrerit. Adipiscing vel nunc purus quisque dapibus tellus.
            Sagittis tellus faucibus volutpat curabitur posuere. Eget risus
            mattis volutpat urna scelerisque eu amet dignissim. Sollicitudin
            faucibus in pellentesque arcu sed massa. Purus in imperdiet iaculis
            id. Turpis elit non pharetra pulvinar in ut nulla amet mi.
            Consectetur habitasse adipiscing in vitae. Cras pellentesque
            faucibus eu nulla in a ut. Habitante malesuada commodo eget ac
            laoreet id. Aliquam velit egestas sed vitae cursus proin. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Qui enim rem
            harum explicabo inventore, nostrum quos aut. Consequuntur quas nisi
            molestias recusandae incidunt numquam, odit reprehenderit aliquam,
            earum quisquam autem.
          </p>
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

export default PrivacyPolicy;
