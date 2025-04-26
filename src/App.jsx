import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import SearchSection from "./components/SearchSection/SearchSection";
import Container from "./components/Container";
import Header from "./components/Header";
import PropertyDetails from "./components/PropertyDetails";
import TestFooter from "./components/TestFooter";
import ListOfProperty from "./components/ListOfProperty";
import AgentListingPage from "./components/AgentListingPage";
import AgentDetails from "./components/AgentDetails";
import Breadcrumb from "./components/Breadcrumb";
import Nav from "./components/Navbar/Nav";

// Lazy loading with dynamic imports
const LoginModal = lazy(() => import("./components/Modals/LoginModal"));
const OTPModal = lazy(() => import("./components/Modals/OTPModal"));
const CreateAccountModal = lazy(() =>
  import("./components/Modals/CreateAccountModal")
);
const SuccessModal = lazy(() => import("./components/Modals/SuccessModal"));
const PropertyListingPage = lazy(() =>
  import("./components/PropertyListingPage")
);
const FeaturedProperties = lazy(() =>
  import("./components/FeaturedProperties")
);
const PageOne = lazy(() => import("./components/PageOne"));
const FAQ = lazy(() => import("./components/FaQ"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const TermsAndConditions = lazy(() =>
  import("./components/TermsAndConditions")
);

// Fallback Loader Component
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen">
    <p className="text-lg font-semibold">Loading...</p>
  </div>
);

function Layout({ children }) {
  const location = useLocation();
  const isPropertyListingPage =
    location.pathname.startsWith("/property-listings");
  const standalonePages = [
    "/faq",
    "/privacy-policy",
    "/terms",
    "/agents",
    "/agents/:agentId/properties",
    "/agents/:agentId/properties/:propertyId",
  ];

  return standalonePages.includes(location.pathname) ||
    isPropertyListingPage ? (
    <>{children}</>
  ) : (
    <>
      {children}
      <TestFooter />
    </>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Buy");
  const [showBuyMenu, setShowBuyMenu] = useState(false);
  const [showRentMenu, setShowRentMenu] = useState(false);
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const [showAgentMenu, setShowAgentMenu] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  // const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isAgent, setIsAgent] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const categories = ["Buy", "Rent/PG", "Project", "Commercial", "Agents"];
  const propertiesInPune = [
    "Flats",
    "Builder Floors",
    "Independent House",
    "Serviced Apartments",
    "Studio Apartments",
    "Farm House",
  ];

  useEffect(() => {
    let interval;
    if (showOTPModal && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [showOTPModal, resendTimer]);

  const handleMenuClick = (menu) => {
    setShowBuyMenu(menu === "buy" ? !showBuyMenu : false);
    setShowRentMenu(menu === "rent" ? !showRentMenu : false);
    setShowProjectMenu(menu === "project" ? !showProjectMenu : false);
    setShowAgentMenu(menu === "agent" ? !showAgentMenu : false);
    setShowServicesMenu(menu === "services" ? !showServicesMenu : false);
  };

  const handleOtpVerified = (token, user) => {
    console.log("OTP verified, User:", user);
    setShowOTPModal(false);
    setShowCreateAccount(true);
  };

  return (
    <Router>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar
                      onLoginClick={() => setShowLoginModal(true)}
                      handleMenuClick={handleMenuClick}
                      showBuyMenu={showBuyMenu}
                      showRentMenu={showRentMenu}
                      showProjectMenu={showProjectMenu}
                      showAgentMenu={showAgentMenu}
                      showServicesMenu={showServicesMenu}
                      propertiesInPune={propertiesInPune}
                      key={selectedCategory}
                    />
                    <SearchSection
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      categories={categories}
                      recentSearches={recentSearches}
                    />
                    <Container>
                      <FeaturedProperties />
                      <PageOne />
                    </Container>
                  </>
                }
              />
              <Route
                path="/property-listings/*"
                element={
                  <>
                    <Header />
                    <Breadcrumb />
                    <PropertyListingPage />
                  </>
                }
              />
              <Route
                path="/faq"
                element={
                  <>
                    <Nav
                      onLoginClick={() => setShowLoginModal(true)}
                      handleMenuClick={handleMenuClick}
                      showBuyMenu={showBuyMenu}
                      showRentMenu={showRentMenu}
                      showProjectMenu={showProjectMenu}
                      showAgentMenu={showAgentMenu}
                      showServicesMenu={showServicesMenu}
                      propertiesInPune={propertiesInPune}
                      key={selectedCategory}
                    />
                    <FAQ />
                    <TestFooter />
                  </>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <>
                    <Nav
                      onLoginClick={() => setShowLoginModal(true)}
                      handleMenuClick={handleMenuClick}
                      showBuyMenu={showBuyMenu}
                      showRentMenu={showRentMenu}
                      showProjectMenu={showProjectMenu}
                      showAgentMenu={showAgentMenu}
                      showServicesMenu={showServicesMenu}
                      propertiesInPune={propertiesInPune}
                      key={selectedCategory}
                    />
                    <PrivacyPolicy />
                    <TestFooter />
                  </>
                }
              />
              <Route
                path="/terms"
                element={
                  <>
                    <Nav
                      onLoginClick={() => setShowLoginModal(true)}
                      handleMenuClick={handleMenuClick}
                      showBuyMenu={showBuyMenu}
                      showRentMenu={showRentMenu}
                      showProjectMenu={showProjectMenu}
                      showAgentMenu={showAgentMenu}
                      showServicesMenu={showServicesMenu}
                      propertiesInPune={propertiesInPune}
                      key={selectedCategory}
                    />
                    <TermsAndConditions />
                    <TestFooter />
                  </>
                }
              />
              <Route path="/agents" element={<AgentListingPage />} />
              <Route path="/agents/agent-details" element={<AgentDetails />} /> 
              <Route path="/agents/agent-details/:id" element={<AgentDetails />} />
              <Route
                path="/agents/:agentId/properties"
                element={
                  <>
                    <Nav
                      onLoginClick={() => setShowLoginModal(true)}
                      handleMenuClick={handleMenuClick}
                      showBuyMenu={showBuyMenu}
                      showRentMenu={showRentMenu}
                      showProjectMenu={showProjectMenu}
                      showAgentMenu={showAgentMenu}
                      showServicesMenu={showServicesMenu}
                      propertiesInPune={propertiesInPune}
                      key={selectedCategory}
                    />
                    <ListOfProperty />
                  </>
                }
              />
              <Route
                path="/agents/:agentId/properties/:propertyId"
                element={<PropertyDetails />}
              />
            </Routes>
          </Suspense>

          {/* Modals */}
          <Suspense fallback={null}>
            <LoginModal
              isOpen={showLoginModal}
              onClose={() => setShowLoginModal(false)}
              onContinue={() => {
                setShowLoginModal(false);
                setShowOTPModal(true);
                setResendTimer(30);
              }}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />

            <OTPModal
              isOpen={showOTPModal}
              onClose={() => {
                setShowOTPModal(false);
                // setShowLoginModal(true);
              }}
              phoneNumber={phoneNumber}
              resendTimer={resendTimer}
              onResend={() => setResendTimer(30)}
              // onVerify={(e) => {
              //   e.preventDefault();
              //   setShowOTPModal(false);
              //   setShowCreateAccount(true);
              // }}
              onVerify={handleOtpVerified}
              otp={otp}
              setOtp={setOtp}
            />

            <CreateAccountModal
              isOpen={showCreateAccount}
              onClose={() => setShowCreateAccount(false)}
              phoneNumber={phoneNumber}
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              isAgent={isAgent}
              setIsAgent={setIsAgent}
              agreedToTerms={agreedToTerms}
              setAgreedToTerms={setAgreedToTerms}
              onCreateAccount={() => {
                setShowCreateAccount(false);
                setShowSuccessModal(true);
              }}
            />

            <SuccessModal
              isOpen={showSuccessModal}
              onClose={() => setShowSuccessModal(false)}
            />
          </Suspense>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
