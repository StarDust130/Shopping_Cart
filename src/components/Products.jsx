/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../app/shoppingSlice";

const Products = ({ name, price, image, quantity }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between p-4 mb-4 bg-gray-300 w-[80%] rounded-lg mx-auto text-black shadow-2xl hover:shadow-xl transition duration-300 ease-in-out">
      <div className="flex items-center">
        <img src={image} alt={name} className="w-24 h-24 rounded-lg mr-4" />
        <div className="flex flex-col">
          <p className="text-lg font-bold truncate">{name}</p>
          <p className="text-sm text-gray-500">Price: ${price.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center gap-5 ">
        <button
          onClick={() => {
            quantity === 1
              ? dispatch(removeItem({ name }))
              : dispatch(decreaseQuantity({ name }));
          }}
          className="text-lg bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md transition duration-300 ease-in-out "
        >
          -
        </button>
        <p className="text-lg font-bold">{quantity}</p>
        <button
          onClick={() => dispatch(increaseQuantity({ name }))}
          className="text-lg bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded-md transition duration-300 ease-in-out "
        >
          +
        </button>

        <button
          onClick={() => dispatch(removeItem({ name }))}
          className="text-lg text-red-500 hover:text-red-700 cursor-pointer"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default Products;
