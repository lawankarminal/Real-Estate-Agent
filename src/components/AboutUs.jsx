import React from "react";

import SmallCrumb from "./SmallCrumb";

import Nav from "./Navbar/Nav";

const AboutUs = () => {
  //use breadcrumb
  return (
    <>
      <Nav />
      <div className="pt-16 flex">
        <SmallCrumb />
      </div>
      <div className="min-h-screen font-['inter'] bg-white">
        <div className="max-w-7xl  mx-auto p-6">
          <h1 className="text-xl font-semibold text-[#252A31]">About Us</h1>
          <p className="text-[#697D95] font-[500] text-base mt-4 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Sit hendrerit felis a id
            magna elit faucibus sit egestas. Elementum turpis felis tristique
            vestibulum sed integer commodo pellentesque. Scelerisque erat
            scelerisque in velit id nullam. Velit amet tempor duis diam elit
            semper orci massa massa. Ornare felis ultricies tempus purus
            tristique. Lectus nec nec turpis fermentum tellus morbi habitant
            enim. Facilisis felis aliquam tempor pellentesque. Risus purus erat
            sit vitae adipiscing in. Sodales massa scelerisque quis enim
            hendrerit. Adipiscing vel nunc purus quisque dapibus tellus.
            Sagittis tellus faucibus volutpat curabitur posuere.Purus in
            imperdiet iaculis id. Turpis elit non pharetra pulvinar in ut nulla
            amet mi. Consectetur habitasse adipiscing in vitae. Cras
            pellentesque faucibus eu nulla in a ut. Habitante malesuada commodo
            eget ac laoreet id. Aliquam velit egestas sed vitae cursus proin.
          </p>
          <h1 className="text-xl font-semibold text-[#252A31] mt-8">Know Us</h1>
          <p className="text-[#697D95] font-[500] text-base mt-4 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Sit hendrerit felis a id
            magna elit faucibus sit egestas. Elementum turpis felis tristique
            vestibulum sed integer commodo pellentesque. Scelerisque erat
            scelerisque in velit id nullam. Velit amet tempor duis diam elit
            semper orci massa massa. Ornare felis ultricies tempus purus
            tristique.scelerisque quis enim hendrerit. Adipiscing vel nunc purus
            quisque dapibus tellus. Sagittis tellus faucibus volutpat curabitur
            posuere. Eget risus mattis volutpat urna scelerisque eu amet
            dignissim. Sollicitudin faucibus in pellentesque arcu sed massa.
            Purus in imperdiet iaculis id. Turpis elit non pharetra pulvinar in
            ut nulla amet mi. Consectetur habitasse adipiscing in vitae. Cras
            pellentesque faucibus eu nulla in a ut. Habitante malesuada commodo
            eget ac laoreet id. Aliquam velit egestas sed vitae cursus proin.
          </p>
        </div>
        <div className="text-center mt-12 pb-6 flex justify-center gap-4">
          <button className="bg-[#ECF8F7] text-[#007F6D] px-4 py-2 rounded-sm">
            Read Privacy Policy
          </button>
          <button className="bg-[#00A991] text-white px-4 py-2 rounded-sm">
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
