import { Link, useNavigate } from "react-router-dom";

function Cart({ cartItems, setCartItems, loggedInUser }) {
  const navigate = useNavigate();

  const cart = cartItems || [];

  const increaseQty = (id) => {
    setCartItems(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cart.map((item) =>
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = cart.reduce(
    (acc, item) =>
      acc + Number(item.price) * (item.quantity || 1),
    0
  );

  if (!loggedInUser) {
    return (
      <section className="min-h-screen bg-gray-100 py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-slate-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Please Login First
            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              You need to be logged in to view your cart items.
            </p>

            <Link
              to="/login"
              className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 text-white transition hover:bg-orange-600"
            >
              Login Now
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="mb-10 text-4xl font-extrabold text-gray-900 dark:text-white">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-slate-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Cart is Empty
            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Add some delicious items from the menu to get started!
            </p>

            <Link
              to="/menu"
              className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 text-white transition hover:bg-orange-600"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-800">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 border-b border-gray-200 pb-6 pt-2 last:border-b-0 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {item.name}
                      </h3>

                      <p className="font-semibold text-orange-500">
                        ₹{Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="h-9 w-9 rounded-lg bg-gray-200 font-bold text-gray-800 dark:bg-slate-700 dark:text-white"
                    >
                      -
                    </button>

                    <span className="min-w-8 text-center font-bold text-gray-900 dark:text-white">
                      {item.quantity || 1}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="h-9 w-9 rounded-lg bg-gray-200 font-bold text-gray-800 dark:bg-slate-700 dark:text-white"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-3 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Total
                </h2>

                <span className="text-2xl font-bold text-green-600">
                  ₹{total.toFixed(2)}
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={clearCart}
                  className="w-full rounded-xl bg-red-500 py-3 font-bold text-white transition hover:bg-red-600"
                >
                  Clear Cart
                </button>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;