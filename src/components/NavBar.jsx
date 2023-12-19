import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // If you're using React Router

const Navbar = () => {
  const quantity = useSelector((state) => state.shopping.quantity);
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto  flex justify-evenly items-center">
        {/* Home Link */}
        <Link to="/" className="text-white text-lg font-bold">
          Home
        </Link>

        {/* Cart Link with Item Count */}
        <Link to="/cart" className="text-white relative">
          <img
            src="https://img.icons8.com/stickers/50/fast-cart.png"
            alt="fast-cart"
          />
          {quantity >= 1 && (
            <span className="bg-red-500 text-white px-2 rounded-full absolute top-0 right-[-15px]">
              {quantity}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
