import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/property/all");

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        setProperties(data.properties || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return loading ? (
    <p>Loading properties...</p>
  ) : (
    <div className="container mx-auto pt-6">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
