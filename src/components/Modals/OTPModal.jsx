import { useState } from "react";
import axios from "axios";

const OTPModal = ({
  isOpen,
  onClose,
  phoneNumber,
  resendTimer,
  onResend,
  onVerify,
  otp,
  setOtp,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if not last
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`)?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      setOtp(pasteData.split(""));
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error before making request

    const formattedOtp = otp.join(""); // Convert array to string
    console.log("Sending OTP for verification:", formattedOtp);

    try {
      const response = await axios.post("http://localhost:5000/api/v1/verify", {
        phone: `+91${phoneNumber}`,
        otp: formattedOtp,
      });

      console.log("OTP Verified Response:", response.data);

      if (response.data && response.data.success) {
        console.log("✅ OTP Verification Successful:", response.data);
        onVerify(response.data.token); // Call the success function
        onClose(); // Close the modal
      } else {
        console.warn("❌ OTP Verification Failed:", response.data.message);
        setError(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("❌ Error verifying OTP:", err);
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4 text-left">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative shadow-lg text-left">
        <h2 className="text-2xl font-bold mb-2 text-left">
          Verify your number
        </h2>
        <div className="mb-6 text-lg font-semibold text-gray-800 text-left">
          +91-{phoneNumber}
        </div>

        <form onSubmit={handleVerifyOtp} className="flex flex-col">
          <label className="block text-gray-700 mb-3 text-sm text-left">
            Enter your 6-digit OTP
          </label>

          {/* OTP Input Fields */}
          <div className="flex gap-3 mb-4">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                className="w-12 h-12 text-xl text-center border rounded-lg focus:ring-2 focus:ring-[#00A58E] focus:border-[#00A58E] appearance-none"
                value={otp[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
                onPaste={handlePaste}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="mt-2 mb-4 text-gray-500 text-sm">
            {resendTimer > 0 ? (
              `Resend OTP in ${resendTimer}s`
            ) : (
              <button
                type="button"
                className="text-[#00A58E] font-medium hover:text-[#008B75] transition-colors"
                onClick={onResend}
                disabled={loading}
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#00A58E] text-white py-2 rounded-lg hover:bg-[#008B75] transition-colors duration-200 mb-4"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>

        <div className="flex items-center mb-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          Verify via Missed Call
        </button>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default OTPModal;
