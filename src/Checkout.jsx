import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAll } from "./app/shoppingSlice";
import { useNavigate } from "react-router-dom";

const CheckoutButton = () => {
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const { products } = useSelector((store) => store.shopping);
  const [countdown, setCountdown] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const itemsInCart = products;
    setPurchasedItems(itemsInCart);
    setCheckoutClicked(true);

    // Reset the animation and redirect after a delay
    setTimeout(() => {
      setCheckoutClicked(false);
      dispatch(deleteAll());
      navigate("/");
    }, 6000); // Delay of 6 seconds (5 seconds for countdown + 1 second for animation)
  };

  useEffect(() => {
    let timer;
    if (checkoutClicked) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // Clear the interval when countdown reaches 0
      if (countdown === 0) {
        clearInterval(timer);
        setTimeout(() => {
          setCheckoutClicked(false);
          dispatch(deleteAll());
          navigate("/");
        }, 2000); // 2-second delay for the redirection
      }
    }

    return () => clearInterval(timer);
  }, [checkoutClicked, countdown, dispatch, navigate]);

  return (
    <div>
      <button
        className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 flex hover:to-blue-500 text-white py-2 px-4 rounded-lg transform ${
          checkoutClicked ? "scale-110" : ""
        }`}
        onClick={handleCheckout}
      >
        Check out
      </button>

      {/* Animation Window */}
      {checkoutClicked && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 transition-opacity duration-500">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 w-[30%] h-auto text-white font-sans font-bold p-6 rounded-md shadow-md transform scale-100 transition-transform duration-500 ease-in-out">
            <p className="bg-white text-green-500 px-4 py-2 rounded-lg mt-4 hover:bg-gray-200 hover:text-green-500 transition duration-300">
              {countdown === 0 ? (
                <span className="text-2xl text-blue-500 font-bold">
                  Thank you for shopping
                </span>
              ) : (
                "Purchase Successful"
              )}
            </p>
            {countdown !== 0 && (
              <p className="text-white text-3xl font-bold mt-2 mb-4">
                {countdown}
              </p>
            )}
            <ul>
              {purchasedItems.map((item) => (
                <li
                  key={item.id}
                  className="bg-white text-black mt-2 py-2 px-4 mb-2 rounded-md"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutButton;
