import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Products from "./Products";
import ConfirmationModal from "./ConfirmationModal";
import { deleteAll } from "../app/shoppingSlice"; // Import your deleteAll action
import { Link } from "react-router-dom";
import CheckoutButton from "../Checkout";

const ShoppingProducts = () => {
  const { products, total, quantity } = useSelector((store) => store.shopping);
  const dispatch = useDispatch();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    React.useState(false);

  const handleDeleteAll = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const confirmDeleteAll = () => {
    dispatch(deleteAll());
    closeConfirmationModal();
  };

  return (
    <div className="flex">
      {/* Left side - Product cards */}
      <div className="w-full">
        {quantity >= 1 ? (
          <div>
            {products.map((product) => (
              <Products
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                quantity={product.quantity}
              />
            ))}
          </div>
        ) : (
          <div className="h-[80vh] flex flex-col justify-center items-center">
            <h1 className="font-bold text-4xl text-white shadow-lg mb-10">
              Your cart is empty. <br /> Add some items to your cart.
            </h1>
            <Link to="/">
              <button className="bg-gradient-to-r from-sky-500 to-purple-500 hover:from-purple-500 flex  hover:to-blue-500 text-white py-2 px-4 rounded-lg">
                Go to Home
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Right side - Total, Quantity, and Delete All */}
      {/* Right side - Total, Quantity, and Delete All */}
      {quantity >= 1 && (
        <div className="flex flex-col justify-between p-4 bg-gray-300 shadow-xl border-2 border-gray-700 text-black font-bold w-[20%] h-[35vh] rounded-2xl">
          <div>
            <div className="flex flex-col space-y-4 w-52 ml-4 p-4 border-2 border-gray-500 bg-white rounded-lg shadow-md  hover:shadow-lg transition duration-300 ease-in-out">
              {/* Total Card */}
              <div className="text-lg font-bold text-center">
                Total:{" "}
                <span className="text-blue-500 font-bold">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Quantity Card */}
              <div className="text-lg font-bold text-center">
                Quantity:{" "}
                <span className="text-blue-500 ml-4 font-bold">{quantity}</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-10">
              <CheckoutButton />
              {/* Delete All Button */}
              <div
                className="text-center flex justify-center cursor-pointer relative group"
                onClick={handleDeleteAll}
              >
                <img
                  src="https://img.icons8.com/3d-fluency/40/trash.png"
                  alt="trash"
                  className="transition duration-300 ease-in-out transform group-hover:scale-110"
                />
                <p className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 left-1/2 transform -translate-x-1/2 text-red-500 bg-gray-800 p-2 text-xs rounded-md">
                  Delete All
                </p>
              </div>
            </div>
          </div>

          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            onClose={closeConfirmationModal}
            onConfirm={confirmDeleteAll}
          />
        </div>
      )}
    </div>
  );
};

export default ShoppingProducts;
