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
    <section className="min-h-screen bg-gray-100 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-10">❤️ My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <h2 className="text-2xl font-bold">Wishlist is Empty ❤️</h2>

            <Link
              to="/"
              className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
            >
              Browse Foods
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />

                  <div>
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-orange-500 font-bold mt-2">
                      ₹{item.price}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                  >
                    Add Cart
                  </button>

                  <button
                    onClick={() => removeWishlist(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
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
