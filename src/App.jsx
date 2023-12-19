import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Navbar from "./components/NavBar";
import ShoppingProducts from "./components/ShoppingProducts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, updateTotal } from "./app/shoppingSlice";

const App = () => {
  const { products } = useSelector((store) => store.shopping);
  const dispatch = useDispatch();

  //! Function to get data from local storage
  const getLocalStorage = () => {
    const localData = localStorage.getItem("products😉");
    return localData ? JSON.parse(localData) : [];
  };

  useEffect(() => {
    // Set the initial products state with data from local storage
    dispatch(setProducts(getLocalStorage()));
  }, [dispatch]);

  // Combine both updateTotal and local storage updates into a single useEffect
  useEffect(() => {
    // Update local storage when products change
    localStorage.setItem("products😉", JSON.stringify(products));

    // Dispatch updateTotal with the latest local storage data
    dispatch(updateTotal());
  }, [products, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <h1 className="text-4xl text-white font-bold text-center mt-5">Shopping Card</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<ShoppingProducts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
