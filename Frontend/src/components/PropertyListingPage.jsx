import { useState, useEffect, useCallback } from "react";
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
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    status: "",
    budget: [0, 100000000], // Adjust based on your pricing range
    verified: false,
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

  const handlePropertyClick = useCallback(
    (property) => {
      const currentParams = new URLSearchParams(location.search);
      navigate(`property/${property._id}?${currentParams.toString()}`, {
        state: { property },
      });
    },
    [navigate, location.search]
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 bg-white">
      <div className="lg:w-10" />
      <div className="lg:w-1/3 w-full">
        <FilterSection onFilterChange={onFilterChange} />
      </div>
      <div className="lg:w-8" />
      <div className="lg:w-2/3 w-full">
        <PropertyList
          onPropertyClick={handlePropertyClick}
          verifiedOnly={filters.verified}
          category={category}
          searchQuery={query}
        />
      </div>
      <div className="lg:w-10" />
    </div>
  );
}

function PropertyDetailsWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [property, setProperty] = useState(location.state?.property || null);
  const [loading, setLoading] = useState(!location.state?.property);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!property) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/property/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch property details");
          }
          return res.json();
        })
        .then((data) => {
          setProperty(data);
          setLoading(false);
        })
        .catch((err) => {
          // console.error("Error fetching property:", err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);
  // console.log("Property Details:", property); // Debugging line

  const handleBackToListing = () => {
    navigate(-1);
  };

  if (loading) return <div className="p-8">Loading property...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return property ? (
    <PropertyDetails property={property} onBack={handleBackToListing} />
  ) : (
    <div className="p-8">Property not found</div>
  );
}

export default PropertyListingPage;
