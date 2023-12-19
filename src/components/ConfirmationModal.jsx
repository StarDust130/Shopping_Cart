import PropTypes from "prop-types";
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <p className="text-lg text-black mb-4">
          Are you sure you want to delete all items?
        </p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 bg-red-500 text-white rounded-md"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-gray-500 rounded-md"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
