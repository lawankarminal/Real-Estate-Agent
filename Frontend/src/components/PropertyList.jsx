import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import useFilterStore from "../hooks/useFilterStore";

const PropertyList = ({ onPropertyClick }) => {
  const [properties, setProperties] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useFilterStore((state) => state.filters);
  const query = searchParams.get("query") || "";

  // Fetching min and max price values from filter store (if available)
  const budget = useFilterStore((state) => state.budget);
  const minPrice = 0;
  const maxPrice =
    budget > 0 ? Math.min(budget * 100000, 5000000000) : 5000000000;

  useEffect(() => {
    // Build query params dynamically
    const params = new URLSearchParams();

    if (query) params.append("query", query);

    // 🔹 Collect BHK filters
    const flatType = [];
    if (filters.bhk2) flatType.push("2BHK");
    if (filters.bhk3) flatType.push("3BHK");
    if (flatType.length > 0) params.append("flatType", flatType.join(",")); // Convert array to CSV

    // 🔹 Collect property status filters
    const propertyStatus = [];
    if (filters.readyToMove) propertyStatus.push("Ready to move");
    if (filters.underConstruction) propertyStatus.push("Under Construction");
    if (filters.withBalcony) propertyStatus.push("With Balcony");
    if (propertyStatus.length > 0)
      params.append("propertyStatus", propertyStatus.join(",")); // Convert array to CSV

    // 🔹 Add rental property filter (IMPORTANT FIX)
    if (filters.rentalProperties) {
      params.append("transactionType", "Rent/PG"); // Ensure API receives the correct filter
    }

    // 🔹 Collect property features filters
    const status = [];
    if (filters.verified) status.push("Verified");
    if (status.length > 0) params.append("status", status.join(",")); // Convert array to CSV

    // 🔹 Add min and max price to query params
    if (budget > 0) {
      params.append("minPrice", minPrice);
      params.append("maxPrice", maxPrice);
    }

    setSearchParams(params); // Update URL

    let cancelToken;
    const fetchProperties = async () => {
      try {
        if (cancelToken) cancelToken.cancel();
        cancelToken = axios.CancelToken.source();

        console.log(
          "Final API Request URL:",
          `http://localhost:5000/api/v1/properties/search?${params.toString()}`
        );

        const { data } = await axios.get(
          `http://localhost:5000/api/v1/properties/search?${params.toString()}`,
          { cancelToken: cancelToken.token }
        );

        console.log("Raw API Response:", data);

        // 🔥 FIX: Manually filter rental properties if needed
        let filteredProperties = Array.isArray(data?.properties)
          ? data.properties
          : [];

        if (filters.rentalProperties) {
          filteredProperties = filteredProperties.filter(
            (property) => property?.priceDetails?.transactionType === "Rent/PG"
          );
          console.log("Filtered Rental Properties:", filteredProperties);
        }

        setProperties(filteredProperties);
      } catch (error) {
        if (!axios.isCancel(error)) setProperties([]);
      }
    };

    fetchProperties();

    return () => {
      if (cancelToken) cancelToken.cancel();
    };
  }, [query, filters, minPrice, maxPrice]); // Fetch whenever query, filters, or prices change

  return (
    <div className="container mx-auto pt-6">
      {properties.length > 0 ? (
        properties.map((property) => (
          <div key={property._id} className="cursor-pointer">
            <PropertyCard
              isNew={property.isNew}
              property={property}
              onClick={() => onPropertyClick(property)}
              isVerified={property.status === "Verified"}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No properties found</p>
      )}
    </div>
  );
};

export default PropertyList;
