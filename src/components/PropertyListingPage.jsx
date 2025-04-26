import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";

import FilterSection from "./FilterSection";
import PropertyList from "./PropertyList";
import PropertyDetails from "./PropertyDetails";
import "../App.css";

function PropertyListingPage() {
  const [filters, setFilters] = useState({ verified: false });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Ensure page loads at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Get search parameters from URL
  const category = searchParams.get("category");
  const query = searchParams.get("query");

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route
          index
          element={
            <PropertyListWrapper
              filters={filters}
              onFilterChange={handleFilterChange}
              category={category}
              query={query}
            />
          }
        />
        <Route path="property/:id" element={<PropertyDetailsWrapper />} />
      </Routes>
    </div>
  );
}

function PropertyListWrapper({ filters, onFilterChange, category, query }) {
  const navigate = useNavigate();

  const handlePropertyClick = (property) => {
    navigate(`property/${property.id}`, { state: { property } });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 bg-white">
      <div className="lg:w-10"></div>
      <div className="lg:w-1/3 w-full">
        <FilterSection onFilterChange={onFilterChange} />
      </div>
      <div className="lg:w-8"></div>
      <div className="lg:w-2/3 w-full">
        <PropertyList
          onPropertyClick={handlePropertyClick}
          verifiedOnly={filters.verified}
          category={category}
          searchQuery={query}
        />
      </div>
      <div className="lg:w-10"></div>
    </div>
  );
}

function PropertyDetailsWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [property, setProperty] = useState(location.state?.property || null);
  const [loading, setLoading] = useState(!location.state?.property);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!property) {
      setLoading(true);
      fetch(`/api/properties/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProperty(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching property:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleBackToListing = () => {
    navigate(-1);
  };

  if (loading) return <div className="p-8">Loading property...</div>;

  return property ? (
    <PropertyDetails property={property} onBack={handleBackToListing} />
  ) : (
    <div className="p-8">Property not found</div>
  );
}

export default PropertyListingPage;
