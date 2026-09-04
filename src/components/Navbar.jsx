import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  loggedInUser = null,
  setLoggedInUser,
  darkMode = false,
  setDarkMode,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    setLoggedInUser(null);
    setIsOpen(false);

    navigate("/login");
  };

  const handleProtectedNavigation = (path) => {
    setIsOpen(false);

    if (!loggedInUser) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    navigate(path);
  };

  const visibleCartCount = loggedInUser ? cartCount : 0;
  const visibleWishlistCount = loggedInUser ? wishlistCount : 0;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white dark:bg-slate-900 shadow-md z-50 transition duration-500">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="text-gray-800 dark:text-white text-2xl p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              aria-label="Open Menu"
            >
              ☰
            </button>

            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-extrabold text-gray-900 dark:text-white"
            >
              <span>🍔</span>
              <span className="text-orange-500">FoodieHub</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 font-semibold text-gray-700 dark:text-gray-200">
            <Link
              to="/"
              className="hover:text-orange-500 transition"
            >
              Home
            </Link>

            <Link
              to="/menu"
              className="hover:text-orange-500 transition"
            >
              Menu
            </Link>

            <button
              type="button"
              onClick={() => handleProtectedNavigation("/order-history")}
              className="hover:text-orange-500 transition"
            >
              Orders
            </button>

            <Link
              to="/contact"
              className="hover:text-orange-500 transition"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-800 text-xl transition hover:scale-105"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              type="button"
              onClick={() => handleProtectedNavigation("/wishlist")}
              className="relative text-xl text-gray-800 dark:text-white p-2"
              aria-label="Wishlist"
            >
              ❤️

              {loggedInUser && visibleWishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {visibleWishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleProtectedNavigation("/cart")}
              className="relative text-2xl text-gray-800 dark:text-white p-2"
              aria-label="Cart"
            >
              🛒

              {loggedInUser && visibleCartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {visibleCartCount}
                </span>
              )}
            </button>

            {loggedInUser ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 bg-orange-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl"
                >
                  <div className="w-8 h-8 bg-orange-500 text-white font-bold rounded-full flex items-center justify-center">
                    {loggedInUser.name
                      ? loggedInUser.name.charAt(0).toUpperCase()
                      : "👤"}
                  </div>

                  <span className="font-semibold text-gray-800 dark:text-white text-sm">
                    {loggedInUser.name || "Profile"}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold text-sm transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-bold transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="h-20" />

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[90]"
            onClick={() => setIsOpen(false)}
          />

          <aside className="fixed top-0 left-0 h-screen w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl z-[100] p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  FoodieHub
                </h2>

                <p className="text-sm text-orange-500 mt-1">
                  Explore delicious food
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-white font-bold text-xl hover:bg-orange-500 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {loggedInUser && (
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 bg-orange-50 dark:bg-slate-800 p-4 rounded-2xl mb-6"
              >
                <div className="w-12 h-12 bg-orange-500 text-white font-bold rounded-full flex items-center justify-center text-lg">
                  {loggedInUser.name
                    ? loggedInUser.name.charAt(0).toUpperCase()
                    : "👤"}
                </div>

                <div className="min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white truncate">
                    {loggedInUser.name || "User"}
                  </p>

                  <p className="text-xs text-orange-600 dark:text-orange-400">
                    View Profile →
                  </p>
                </div>
              </Link>
            )}

            {!loggedInUser && (
              <div className="bg-orange-50 dark:bg-slate-800 p-4 rounded-2xl mb-6">
                <p className="font-bold text-gray-900 dark:text-white">
                  Welcome to FoodieHub
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Login to access your cart and wishlist.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3 font-semibold text-gray-800 dark:text-gray-200">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="p-4 rounded-xl hover:bg-orange-500 hover:text-white transition"
              >
                🏠 Home
              </Link>

              <Link
                to="/menu"
                onClick={() => setIsOpen(false)}
                className="p-4 rounded-xl hover:bg-orange-500 hover:text-white transition"
              >
                🍕 Menu
              </Link>

              <button
                type="button"
                onClick={() => handleProtectedNavigation("/order-history")}
                className="text-left p-4 rounded-xl hover:bg-orange-500 hover:text-white transition"
              >
                📦 Orders
              </button>

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="p-4 rounded-xl hover:bg-orange-500 hover:text-white transition"
              >
                📞 Contact
              </Link>

              <button
                type="button"
                onClick={() => handleProtectedNavigation("/cart")}
                className="p-4 rounded-xl hover:bg-orange-500 hover:text-white transition flex justify-between items-center"
              >
                <span>🛒 Cart</span>

                {loggedInUser && visibleCartCount > 0 && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {visibleCartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleProtectedNavigation("/wishlist")}
                className="p-4 rounded-xl hover:bg-orange-500 hover:text-white transition flex justify-between items-center"
              >
                <span>❤️ Wishlist</span>

                {loggedInUser && visibleWishlistCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {visibleWishlistCount}
                  </span>
                )}
              </button>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-slate-800">
              {loggedInUser ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition"
                >
                  Login 🚀
                </Link>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  );
}

export default Navbar;