const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
        <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
          <div className="flex justify-center mb-4">
            <img 
              src="/images/tick-circle.png" 
              alt="Success" 
              className="w-16 h-16"
            />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center">Account Created</h2>
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Congratulations! Your account is now successfully created and details
              have been sent to you via SMS and email.
            </p>
          </div>
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
  
  export default SuccessModal;