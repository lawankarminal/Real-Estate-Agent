import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SmallCrumb from "./SmallCrumb";
import SinglePropertyCard from "./SinglePropertyCard";

const ListOfProperty = ({ onPropertyClick }) => {  // removed verifiedOnly prop
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  const [properties, setProperties] = useState([
    {
      id: 1,
      isNew: true,
      name: "Luxury Apartment",
      bulding: "3BHK Flat in Hiranandani Estate",
      price: "2.5 Cr",
      pricePerSqft: "20,000",
      area: "1000 sqft",
      areaType: "Super Built-up Area",
      type: "3BHK",
      status: "Ready",
      highlights: ["Sea Facing", "Close to Metro"],
      description: "Spacious 3BHK with modern interiors...",
      dealer: "Dealer",
      postedTime: " 2 weeks ago",
      dealerName: "Name of Dealer",
      postedDate: "04TH JAN 2025",
      isVerified: true,
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1560185007-c5ca9d2c0862?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1560185008-a33f5c7b1844?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      ],
    },
    {
      id: 2,
      isNew: true,
      name: "Luxury Apartment",
      bulding: "3BHK Flat in Hiranandani Estate",
      price: "2.5 Cr",
      pricePerSqft: "20,000",
      area: "1000 sqft",
      areaType: "Super Built-up Area",
      type: "3BHK",
      status: "Ready",
      highlights: ["Sea Facing", "Close to Metro"],
      description: "Spacious 3BHK with modern interiors...",
      dealer: "Dealer",
      postedTime: "2 weeks ago",
      dealerName: "Name of Dealer",
      postedDate: "04TH JAN 2025",
      isVerified: false,
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1560185007-c5ca9d2c0862?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1560185008-a33f5c7b1844?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      ],
    },
    {
      id: 3,
      isNew: true,
      name: "Luxury Apartment",
      bulding: "3BHK Flat in Hiranandani Estate",
      price: "2.5 Cr",
      pricePerSqft: "20,000",
      area: "1000 sqft",
      areaType: "Super Built-up Area",
      type: "3BHK",
      status: "Ready",
      highlights: ["Sea Facing", "Close to Metro"],
      description: "Spacious 3BHK with modern interiors...",
      dealer: "Dealer",
      postedTime: "2 weeks ago",
      dealerName: "Name of Dealer",
      postedDate: "04TH JAN 2025",
      isVerified: true,
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1560185007-c5ca9d2c0862?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1560185008-a33f5c7b1844?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      ],
    },
  ]);

  return (
    <>
      <div className="pt-16 text-left">
        <SmallCrumb />
      </div>
      <div className=" bg-white flex pt-6">
        <div className="w-1/4"></div>
        <div className=" w-1/2 ">
          {properties.map((property) => (
            <div key={property.id} className="cursor-pointer">
              <SinglePropertyCard
                isNew={property.isNew}
                property={property}
                onClick={() => onPropertyClick(property)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListOfProperty;
