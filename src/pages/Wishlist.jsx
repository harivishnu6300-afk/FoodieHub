import { Link } from "react-router-dom";

function Wishlist({ wishlist, setWishlist, cartItems, setCartItems }) {
  const removeWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
  };

  const addToCart = (food) => {
    const existingItem = cartItems.find((item) => item.id === food.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item,
      );

      setCartItems(updatedCart);
      alert("Cart Updated 🛒");
    } else {
      setCartItems([
        ...cartItems,
        {
          ...food,
          quantity: 1,
        },
      ]);

      alert("Added to Cart 🛒");
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-slate-950 py-24 transition duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">❤️ My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-xl text-center transition">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Wishlist is Empty ❤️</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Save your favorite foods here to order later!</p>

            <Link
              to="/"
              className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition"
            >
              Browse Foods
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-5 flex items-center justify-between transition"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />

                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{item.name}</h2>
                    <p className="text-orange-500 font-bold mt-2">
                      ₹{item.price}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-600 transition"
                  >
                    Add Cart
                  </button>

                  <button
                    onClick={() => removeWishlist(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Wishlist;