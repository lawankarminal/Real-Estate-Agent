import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SmallCrumb from "./SmallCrumb";
import PropertyCard from "./PropertyCard";

const ListOfProperty = ({ onPropertyClick }) => {
  const { agentId } = useParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/agent/${agentId}/properties`
        );

        if (response.data && Array.isArray(response.data.properties)) {
          setProperties(response.data.properties);
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [agentId]);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="pt-16 text-left">
        <SmallCrumb />
      </div>
      <div className="bg-white flex pt-6">
        <div className="w-1/4"></div>
        <div className="w-1/2">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property._id} className="cursor-pointer">
                <PropertyCard
                  property={property}
                  onClick={() => onPropertyClick(property)}
                />
              </div>
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ListOfProperty;
