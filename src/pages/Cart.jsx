import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  // 1. Check if user is logged in
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

  // 2. Load cart ONLY IF user is logged in, else empty array
  const [cart, setCart] = useState(() => {
    if (!loggedInUser) return [];
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, loggedInUser]);

  // Quantity increase function
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  // Quantity decrease function
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove single item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Calculate total price
  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <section
      className="
        min-h-screen
        bg-gray-100
        dark:bg-slate-950
        py-24
        transition
        duration-500
      "
    >
      <div className="max-w-4xl mx-auto px-6">
        <h1
          className="
            text-4xl
            ext-center
            font-extrabold
            mb-10
            text-gray-900
            dark:text-white
          "
        >
          🛒 Your Cart
        </h1>

        {!loggedInUser ? (
          <div
            className="
              bg-white
              dark:bg-slate-800
              p-10
              rounded-3xl
              shadow-xl
              text-center
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              Please Login First 🔒
            </h2>
            <p
              className="
                text-gray-500
                dark:text-gray-400
                mt-3
              "
            >
              You need to be logged in to view your cart items.
            </p>
            <Link
              to="/login"
              className="
                inline-block
                mt-6
                bg-orange-500
                text-white
                px-6
                py-3
                rounded-xl
                hover:bg-orange-600
                transition
              "
            >
              Login Now 🚀
            </Link>
          </div>
        ) : cart.length === 0 ? (
          <div
            className="
              bg-white
              dark:bg-slate-800
              p-10
              rounded-3xl
              shadow-xl
              text-center
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              Your Cart is Empty 🍽️
            </h2>
            <p
              className="
                text-gray-500
                dark:text-gray-400
                mt-3
              "
            >
              Add some delicious items from the menu to get started!
            </p>
            <Link
              to="/menu"
              className="
                inline-block
                mt-6
                bg-orange-500
                text-white
                px-6
                py-3
                rounded-xl
                hover:bg-orange-600
                transition
              "
            >
              Explore Menu 🍕
            </Link>
          </div>
        ) : (
          <div
            className="
              bg-white
              dark:bg-slate-800
              rounded-3xl
              shadow-xl
              p-6
              space-y-6
            "
          >
            {cart.map((item) => (
              <div
                key={item.id}
                className="
                  flex
                  flex-col
                  sm:flex-row
                  items-center
                  justify-between
                  border-b
                  border-gray-200
                  dark:border-slate-700
                  pb-6
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    w-full
                    sm:w-auto
                  "
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-20
                      h-20
                      rounded-2xl
                      object-cover
                    "
                  />
                  <div>
                    <h3
                      className="
                        text-lg
                        font-bold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      {item.name}
                    </h3>
                    <p
                      className="
                        text-orange-500
                        font-semibold
                      "
                    >
                      ₹{item.price}
                    </p>
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="
                      bg-gray-200
                      dark:bg-slate-700
                      text-gray-800
                      dark:text-white
                      w-8
                      h-8
                      rounded-lg
                      font-bold
                    "
                  >
                    -
                  </button>
                  <span
                    className="
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="
                      bg-gray-200
                      dark:bg-slate-700
                      text-gray-800
                      dark:text-white
                      w-8
                      h-8
                      rounded-lg
                      font-bold
                    "
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    text-sm
                    font-semibold
                    transition
                  "
                >
                  Remove
                </button>
              </div>
            ))}

            <div
              className="
                pt-4
                flex
                justify-between
                items-center
              "
            >
              <h2
                className="
                  text-2xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Total: <span className="text-green-600">₹{total}</span>
              </h2>
            </div>

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-4
                pt-4
              "
            >
              <button
                onClick={clearCart}
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
                Clear Cart
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="
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
                Proceed to Checkout 💳
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;