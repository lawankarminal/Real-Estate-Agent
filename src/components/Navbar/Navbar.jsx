import { useState, useEffect, useRef } from "react";
import { MapPin, User } from "lucide-react";
import { Link } from "react-router-dom";
import Notifications from "../Notifications";

const Navbar = ({
  onLoginClick,
  handleMenuClick,
  showBuyMenu,
  showRentMenu,
  showProjectMenu,
  showAgentMenu,
  showServicesMenu,
  propertiesInPune,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = document.documentElement.scrollHeight * 0.1;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseNotification = (e) => {
    if (e.target.id === "overlay") {
      setIsNotificationOpen(false);
    }
  };
  // Refs for dropdowns and buttons
  const buyButtonRef = useRef(null);
  const buyDropdownRef = useRef(null);
  const rentButtonRef = useRef(null);
  const rentDropdownRef = useRef(null);
  const projectButtonRef = useRef(null);
  const projectDropdownRef = useRef(null);
  const agentButtonRef = useRef(null);
  const agentDropdownRef = useRef(null);
  const servicesButtonRef = useRef(null);
  const servicesDropdownRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isAnyMenuOpen =
        showBuyMenu ||
        showRentMenu ||
        showProjectMenu ||
        showAgentMenu ||
        showServicesMenu;
      if (!isAnyMenuOpen) return;

      let isInside = false;

      if (
        showBuyMenu &&
        (buyButtonRef.current?.contains(event.target) ||
          buyDropdownRef.current?.contains(event.target))
      ) {
        isInside = true;
      } else if (
        showRentMenu &&
        (rentButtonRef.current?.contains(event.target) ||
          rentDropdownRef.current?.contains(event.target))
      ) {
        isInside = true;
      } else if (
        showProjectMenu &&
        (projectButtonRef.current?.contains(event.target) ||
          projectDropdownRef.current?.contains(event.target))
      ) {
        isInside = true;
      } else if (
        showAgentMenu &&
        (agentButtonRef.current?.contains(event.target) ||
          agentDropdownRef.current?.contains(event.target))
      ) {
        isInside = true;
      } else if (
        showServicesMenu &&
        (servicesButtonRef.current?.contains(event.target) ||
          servicesDropdownRef.current?.contains(event.target))
      ) {
        isInside = true;
      }

      if (!isInside) {
        handleMenuClick(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [
    showBuyMenu,
    showRentMenu,
    showProjectMenu,
    showAgentMenu,
    showServicesMenu,
    handleMenuClick,
  ]);

  // Static data
  const agentLocations = {
    left: [
      "Akurdi",
      "Aund",
      "Baner",
      "Bavdhan",
      "Bhosari",
      "Camp",
      "Dhayari",
      "Hinjawadi",
    ],
    right: [
      "Hadapsar",
      "Kalyani Nagar",
      "Kharadi",
      "KoregaonPark",
      "Karve Nagar",
      "Kothrud",
      "Wakad",
      "Warje",
    ],
  };

  const services = [
    "Building Contractors in Pune",
    "Home Inspection in Pune",
    "Property Consultants in Pune",
    "Interior Decorators In Pune",
    "Vaastu Consultants",
  ];

  // Vertical line styles
  const styles = `
    .menu-item:not(:last-child)::after {
      content: '';
      position: absolute;
      right: -2.5rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 2rem;
      background-color: #b0b0b0;
      opacity: 0.5;
    }

    .menu-item:first-child::before {
      content: '';
      position: absolute;
      left: -2.5rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 2rem;
      background-color: #b0b0b0;
      opacity: 0.5;
    }

    .menu-item:last-child::after {
      content: '';
      position: absolute;
      right: -2.5rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 2rem;
      background-color: #b0b0b0;
      opacity: 0.5;
    }
  `;

  return (
    <nav
      className={`fixed w-full z-50 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      } border-b border-gray-500 transition-colors duration-300 text-left`}
    >
      <style>{styles}</style>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              to="/"
              className="bg-[#00A58E] text-white px-8 py-2 rounded hover:bg-[#00A58E]/90 transition-colors duration-200"
            >
              Logo
            </Link>

            <div
              className={`flex items-center ml-20 ${
                isScrolled ? "text-gray-800" : "text-[#E4E4E4]"
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span className="ml-1">Pune</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex justify-center flex-1">
            <div className="flex items-center space-x-20">
              {/* Buy Button & Dropdown */}
              <div className="relative menu-item">
                <button
                  ref={buyButtonRef}
                  className={`${
                    isScrolled ? "text-gray-800" : "text-[#E4E4E4]"
                  } text-xl hover:text-[#00A58E] ${
                    showBuyMenu
                      ? "text-[#00A58E] border-b-2 border-[#00A58E]"
                      : "border-b-2 border-transparent"
                  } font-medium transition-colors duration-200 py-5`}
                  onClick={() => handleMenuClick("buy")}
                >
                  Buy
                </button>
                {showBuyMenu && (
                  <div
                    ref={buyDropdownRef}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white rounded-lg shadow-lg p-6 grid grid-cols-3 gap-8 z-50 mt-2"
                  >
                    <div className="space-y-4">
                      <h3 className="text-[#00A58E] font-semibold text-lg">
                        Buy A House
                      </h3>
                      <div className="space-y-3">
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Buy a Land/Plot
                        </button>
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Properties by Locality
                        </button>
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Properties by Type
                        </button>
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Commercial Properties
                        </button>
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Popular in Area
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-gray-500 font-semibold">
                        PROPERTIES IN PUNE
                      </h3>
                      <div className="space-y-3">
                        {propertiesInPune &&
                          propertiesInPune.map((property, index) => (
                            <button
                              key={index}
                              className="block text-gray-700 hover:text-[#00A58E]"
                            >
                              {property}
                            </button>
                          ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-gray-500 font-semibold">
                        RECENT SEARCHES
                      </h3>
                      <p className="text-gray-500">(If Any)</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Rent Button & Dropdown */}
              <div className="relative menu-item">
                <button
                  ref={rentButtonRef}
                  className={`${
                    isScrolled ? "text-gray-800" : "text-[#E4E4E4]"
                  } text-xl hover:text-[#00A58E] ${
                    showRentMenu
                      ? "text-[#00A58E] border-b-2 border-[#00A58E]"
                      : "border-b-2 border-transparent"
                  } font-medium transition-colors duration-200 py-5`}
                  onClick={() => handleMenuClick("rent")}
                >
                  Rent
                </button>
                {showRentMenu && (
                  <div
                    ref={rentDropdownRef}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white rounded-lg shadow-lg p-6 grid grid-cols-3 gap-8 z-50 mt-2"
                  >
                    <div className="space-y-4">
                      <h3 className="text-[#00A58E] font-semibold text-lg">
                        Rent A House
                      </h3>
                      <div className="space-y-3">
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Co-living/PG/Hostel
                        </button>
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Properties by Locality
                        </button>
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Properties by Type
                        </button>
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Commercial Properties
                        </button>
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Popular in Area
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-gray-500 font-semibold">
                        PROPERTIES IN PUNE
                      </h3>
                      <div className="space-y-3">
                        {propertiesInPune &&
                          propertiesInPune.map((property, index) => (
                            <button
                              key={index}
                              className="block text-gray-700 hover:text-[#00A58E]"
                            >
                              {property}
                            </button>
                          ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-gray-500 font-semibold">
                        RECENT SEARCHES
                      </h3>
                      <p className="text-gray-500">(If Any)</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Project Button & Dropdown */}
              <div className="relative menu-item">
                <button
                  ref={projectButtonRef}
                  className={`${
                    isScrolled ? "text-gray-800" : "text-[#E4E4E4]"
                  } text-xl hover:text-[#00A58E] ${
                    showProjectMenu
                      ? "text-[#00A58E] border-b-2 border-[#00A58E]"
                      : "border-b-2 border-transparent"
                  } font-medium transition-colors duration-200 py-5`}
                  onClick={() => handleMenuClick("project")}
                >
                  Project
                </button>
                {showProjectMenu && (
                  <div
                    ref={projectDropdownRef}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white rounded-lg shadow-lg p-6 grid grid-cols-3 gap-8 z-50 mt-2"
                  >
                    <div className="space-y-4">
                      <h3 className="text-[#00A58E] font-semibold text-lg">
                        Projects
                      </h3>
                      <div className="space-y-3">
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Ongoing Projects
                        </button>
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Upcoming Projects
                        </button>
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Completed Projects
                        </button>
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Top Builders/Developers
                        </button>
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Location-based Projects
                        </button>
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Luxury & Affordable Projects
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-gray-500 font-semibold">
                        PROPERTIES IN PUNE
                      </h3>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div className="space-y-2">
                          {agentLocations.left.map((location, index) => (
                            <button
                              key={index}
                              className="block text-gray-700 hover:text-[#00A58E]"
                            >
                              {location}
                            </button>
                          ))}
                        </div>
                        <div className="space-y-2">
                          {agentLocations.right.map((location, index) => (
                            <button
                              key={index}
                              className="block text-gray-700 hover:text-[#00A58E]"
                            >
                              {location}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-gray-500 font-semibold">
                        RECENT SEARCHES
                      </h2>
                      <div className="space-y-2">
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          (if Any)
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Agent Button & Dropdown */}
              <div className="relative menu-item">
                <button
                  ref={agentButtonRef}
                  className={`${
                    isScrolled ? "text-gray-800" : "text-[#E4E4E4]"
                  } text-xl hover:text-[#00A58E] ${
                    showAgentMenu
                      ? "text-[#00A58E] border-b-2 border-[#00A58E]"
                      : "border-b-2 border-transparent"
                  } font-medium transition-colors duration-200 py-5`}
                  onClick={() => handleMenuClick("agent")}
                >
                  Agent
                </button>
                {showAgentMenu && (
                  <div
                    ref={agentDropdownRef}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white rounded-lg shadow-lg p-6 grid grid-cols-3 gap-8 z-50 mt-2"
                  >
                    <div className="space-y-4">
                      <h3 className="text-[#00A58E] font-semibold text-lg">
                        Agents in Pune
                      </h3>
                      <div className="space-y-3">
                        <button className="block text-gray-700 hover:text-[#00A58E]">
                          Top Builders/Developers
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-gray-500 font-semibold">
                        AGENTS IN PUNE
                      </h3>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div className="space-y-2">
                          {agentLocations.left.map((location, index) => (
                            <button
                              key={index}
                              className="block text-gray-700 hover:text-[#00A58E]"
                            >
                              {location}
                            </button>
                          ))}
                        </div>
                        <div className="space-y-2">
                          {agentLocations.right.map((location, index) => (
                            <button
                              key={index}
                              className="block text-gray-700 hover:text-[#00A58E]"
                            >
                              {location}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-gray-500 font-semibold">
                        RECENT SEARCHES
                      </h3>
                      <p className="text-gray-500">(If Any)</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Services Button & Dropdown */}
              <div className="relative menu-item">
                <button
                  ref={servicesButtonRef}
                  className={`${
                    isScrolled ? "text-gray-800" : "text-[#E4E4E4]"
                  } text-xl hover:text-[#00A58E] ${
                    showServicesMenu
                      ? "text-[#00A58E] border-b-2 border-[#00A58E]"
                      : "border-b-2 border-transparent"
                  } font-medium transition-colors duration-200 py-5`}
                  onClick={() => handleMenuClick("services")}
                >
                  Services
                </button>
                {showServicesMenu && (
                  <div
                    ref={servicesDropdownRef}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white rounded-lg shadow-lg p-6 grid grid-cols-3 gap-8 z-50 mt-2"
                  >
                    <div className="space-y-4">
                      <h3 className="text-[#00A58E] font-semibold text-lg">
                        Architects in Pune
                      </h3>
                      <div className="space-y-3">
                        {services.map((service, index) => (
                          <button
                            key={index}
                            className="block text-gray-700 hover:text-[#00A58E]"
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-gray-500 font-semibold">
                        ARCHITECTS IN PUNE
                      </h3>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div className="space-y-2">
                          {agentLocations.left.map((location, index) => (
                            <button
                              key={index}
                              className="block text-gray-700 hover:text-[#00A58E]"
                            >
                              {location}
                            </button>
                          ))}
                        </div>
                        <div className="space-y-2">
                          {agentLocations.right.map((location, index) => (
                            <button
                              key={index}
                              className="block text-gray-700 hover:text-[#00A58E]"
                            >
                              {location}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-gray-500 font-semibold">
                        RECENT SEARCHES
                      </h3>
                      <p className="text-gray-500">(If Any)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button
              className="transition-shadow p-0 hover:scale-105"
              onClick={() => setIsNotificationOpen(true)}
            >
              <img src="/images/bell-icon.png" alt="Notifications" />
            </button>
            <button
              onClick={onLoginClick}
              className={`${
                isScrolled ? "text-gray-800" : "text-[#B0B0B0]"
              } text-xl hover:text-[#00A58E] flex items-center`}
            >
              <div className="w-8 h-8 rounded-full bg-[#00A58E] relative">
                <div
                  className="absolute left-[16.67%] right-[16.67%] top-[16.67%] bottom-[16.67%] bg-white"
                  style={{
                    maskImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E\")",
                    maskSize: "contain",
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                    WebkitMaskImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E\")",
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                />
              </div>
              <span className="ml-2">Login/Register</span>
            </button>
          </div>
        </div>
      </div>
      {isNotificationOpen && (
        <div
          id="overlay"
          className="fixed inset-0  flex justify-end items-end z-[60] "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={handleCloseNotification}
        >
          <div className="fixed bottom-10 right-10 z-50">
            <Notifications onClose={() => setIsNotificationOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
