import { data } from "../data";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../app/shoppingSlice";

const Home = () => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.shopping);

  // Local state to track whether the item is in the cart
  const [addedToCart, setAddedToCart] = useState([]);

  const handleAddToCart = (product) => {
    const itemName = product.name;
    if (addedToCart.includes(itemName)) {
      dispatch(decreaseQuantity({ name: itemName }));
      if (
        shoppingCart.products.find((item) => item.name === itemName)
          ?.quantity === 0
      ) {
        dispatch(removeItem({ name: itemName }));
        setAddedToCart((prev) =>
          prev.filter((itemName) => itemName !== product.name)
        );
      }
    } else {
      dispatch(addtoCart(product));
      setAddedToCart((prev) => [...prev, itemName]);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-lg mt-10 mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-center">
        {data.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg relative"
          >
            {/*//! Image  */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain mb-4 rounded-lg"
            />
            {/* //! Title */}
            <h2 className="text-xl text-black font-bold mb-2">
              {product.name}
            </h2>
            {/* //! Price */}
            <p className="text-gray-700 font-bold">
              ${product.price.toFixed(2)}
            </p>
            {/* //! Add to cart button */}
            {addedToCart.includes(product.name) ? (
              <div className="flex gap-5 flex-row items-center justify-center">
                <button
                  onClick={() => {
                    dispatch(decreaseQuantity({ name: product.name }));
                    if (
                      shoppingCart.products.find(
                        (item) => item.name === product.name
                      )?.quantity === 1
                    ) {
                      dispatch(removeItem({ name: product.name }));
                      setAddedToCart((prev) =>
                        prev.filter((itemName) => itemName !== product.name)
                      );
                    }
                  }}
                  className="text-lg bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md transition duration-300 ease-in-out"
                >
                  -
                </button>
                <p className="text-lg text-black font-bold">
                  {shoppingCart.products.find(
                    (item) => item.name === product.name
                  )?.quantity || 0}
                </p>
                <button
                  onClick={() =>
                    dispatch(increaseQuantity({ name: product.name }))
                  }
                  className="text-lg bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded-md transition duration-300 ease-in-out"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="bg-blue-500 py-2 px-4 rounded-lg text-white hover:bg-blue-700 focus:outline-none"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
