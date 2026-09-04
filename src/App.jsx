import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";

function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });

  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("loggedInUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const cartCount = loggedInUser
    ? cartItems.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      )
    : 0;

  const wishlistCount = loggedInUser ? wishlist.length : 0;

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-slate-950 dark:text-white">
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                setSearch={setSearch}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                cartItems={cartItems}
                setCartItems={setCartItems}
                wishlist={wishlist}
                setWishlist={setWishlist}
                loggedInUser={loggedInUser}
              />
            }
          />

          <Route
            path="/menu"
            element={
              <Menu
                search={search}
                setSearch={setSearch}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                cartItems={cartItems}
                setCartItems={setCartItems}
                wishlist={wishlist}
                setWishlist={setWishlist}
                loggedInUser={loggedInUser}
              />
            }
          />

          <Route path="/contact" element={<Contact />} />

          <Route
            path="/food/:id"
            element={
              <FoodDetails
                cartItems={cartItems}
                setCartItems={setCartItems}
                wishlist={wishlist}
                setWishlist={setWishlist}
                loggedInUser={loggedInUser}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                loggedInUser={loggedInUser}
              />
            }
          />

          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                setWishlist={setWishlist}
                cartItems={cartItems}
                setCartItems={setCartItems}
                loggedInUser={loggedInUser}
              />
            }
          />

          <Route
            path="/login"
            element={
              <Login
                setLoggedInUser={setLoggedInUser}
              />
            }
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                setCartItems={setCartItems}
                loggedInUser={loggedInUser}
              />
            }
          />

          <Route
            path="/order-history"
            element={<OrderHistory />}
          />

          <Route
            path="/profile"
            element={
              <Profile
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;