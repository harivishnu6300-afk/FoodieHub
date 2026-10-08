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

  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("loggedInUser");

      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const getUserId = (user) => {
    if (!user) return null;

    return user.id || user.email;
  };

  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (!loggedInUser) {
      setCartItems([]);
      setWishlist([]);
      return;
    }

    const userId = getUserId(loggedInUser);

    try {
      const savedCart = localStorage.getItem(
        `cartItems_${userId}`
      );

      setCartItems(
        savedCart ? JSON.parse(savedCart) : []
      );
    } catch {
      setCartItems([]);
    }

    try {
      const savedWishlist = localStorage.getItem(
        `wishlist_${userId}`
      );

      setWishlist(
        savedWishlist
          ? JSON.parse(savedWishlist)
          : []
      );
    } catch {
      setWishlist([]);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (!loggedInUser) return;

    const userId = getUserId(loggedInUser);

    if (!userId) return;

    localStorage.setItem(
      `cartItems_${userId}`,
      JSON.stringify(cartItems)
    );
  }, [cartItems, loggedInUser]);

  useEffect(() => {
    if (!loggedInUser) return;

    const userId = getUserId(loggedInUser);

    if (!userId) return;

    localStorage.setItem(
      `wishlist_${userId}`,
      JSON.stringify(wishlist)
    );
  }, [wishlist, loggedInUser]);

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      String(darkMode)
    );

    if (darkMode) {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }
  }, [darkMode]);

  const cartCount = loggedInUser
    ? cartItems.reduce(
        (total, item) =>
          total + (item.quantity || 1),
        0
      )
    : 0;

  const wishlistCount = loggedInUser
    ? wishlist.length
    : 0;

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

          <Route
            path="/contact"
            element={<Contact />}
          />

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
            element={
              <OrderHistory
                loggedInUser={loggedInUser}
              />
            }
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