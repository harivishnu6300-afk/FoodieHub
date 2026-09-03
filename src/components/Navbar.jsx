import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check login status & cart items count safely
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  const cart = loggedInUser ? JSON.parse(localStorage.getItem("cart")) || [] : [];
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("cart");
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        bg-white
        dark:bg-slate-900
        shadow-md
        z-50
        transition
        duration-500
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          h-20
          flex
          items-center
          justify-between
        "
      >
        {/* Left Side: 3-Lines Menu Icon + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
              text-gray-800
              dark:text-white
              focus:outline-none
              text-2xl
              p-2
              rounded-lg
              hover:bg-gray-100
              dark:hover:bg-slate-800
              transition
            "
            aria-label="Toggle Menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>

          <Link
            to="/"
            className="
              flex
              items-center
              gap-2
              text-2xl
              font-extrabold
              text-gray-900
              dark:text-white
            "
          >
            🍔 <span className="text-orange-500">FoodieHub</span>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-8
            font-semibold
            text-gray-700
            dark:text-gray-200
          "
        >
          <Link to="/" className="hover:text-orange-500 transition">
            Home
          </Link>
          <Link to="/menu" className="hover:text-orange-500 transition">
            Menu
          </Link>
          <Link to="/orders" className="hover:text-orange-500 transition">
            Orders
          </Link>
          <Link to="/contact" className="hover:text-orange-500 transition">
            Contact
          </Link>
        </div>

        {/* Right Side Icons (Cart, Wishlist, Login/Logout) */}
        <div className="flex items-center gap-5">
          <Link
            to="/cart"
            className="
              relative
              text-2xl
              text-gray-800
              dark:text-white
            "
          >
            🛒
            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-orange-500
                  text-white
                  text-xs
                  w-5
                  h-5
                  flex
                  items-center
                  justify-center
                  rounded-full
                  font-bold
                "
              >
                {cartCount}
              </span>
            )}
          </Link>

          {loggedInUser ? (
            <button
              onClick={handleLogout}
              className="
                hidden
                md:block
                bg-red-500
                hover:bg-red-600
                text-white
                px-5
                py-2
                rounded-xl
                font-bold
                transition
              "
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="
                hidden
                md:block
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-5
                py-2
                rounded-xl
                font-bold
                transition
              "
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Slide-out Sidebar / Drawer for 3-Lines Click */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            flex
          "
          onClick={() => setIsOpen(false)}
        >
          <div
            className="
              w-72
              bg-white
              dark:bg-slate-900
              h-full
              shadow-2xl
              p-6
              flex
              flex-col
              justify-between
              transform
              transition
              duration-300
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Menu 🚀
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="
                    text-gray-500
                    hover:text-gray-800
                    dark:hover:text-white
                    text-xl
                    font-bold
                  "
                >
                  ✕
                </button>
              </div>

              {/* Sidebar Links */}
              <div
                className="
                  flex
                  flex-col
                  gap-4
                  font-semibold
                  text-lg
                  text-gray-800
                  dark:text-gray-200
                "
              >
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl hover:bg-orange-500 hover:text-white transition"
                >
                  🏠 Home
                </Link>
                <Link
                  to="/menu"
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl hover:bg-orange-500 hover:text-white transition"
                >
                  🍕 Menu
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl hover:bg-orange-500 hover:text-white transition"
                >
                  📦 Orders
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl hover:bg-orange-500 hover:text-white transition"
                >
                  📞 Contact
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl hover:bg-orange-500 hover:text-white transition flex justify-between items-center"
                >
                  <span>🛒 Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Sidebar Bottom Login/Logout Button */}
            <div className="pt-6 border-t border-gray-200 dark:border-slate-800">
              {loggedInUser ? (
                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    py-3
                    rounded-xl
                    font-bold
                    transition
                  "
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="
                    block
                    text-center
                    w-full
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    py-3
                    rounded-xl
                    font-bold
                    transition
                  "
                >
                  Login 🚀
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;