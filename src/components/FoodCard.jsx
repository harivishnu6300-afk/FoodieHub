import { Link, useNavigate } from "react-router-dom";

function FoodCard({
  id,
  image,
  name,
  price,
  cartItems,
  setCartItems,
  wishlist,
  setWishlist,
  loggedInUser,
}) {
  const navigate = useNavigate();

  const handleLoginRequired = () => {
    alert("Please login first to continue.");
    navigate("/login");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: name,
          text: `Check out this delicious ${name} on FoodieHub! Only ₹${price}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"));
    }
  };

  const addToCart = () => {
    if (!loggedInUser) {
      handleLoginRequired();
      return;
    }

    const existingItem = cartItems.find((item) => item.id === id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );

      setCartItems(updatedCart);
      alert("Cart updated successfully.");
      return;
    }

    setCartItems([
      ...cartItems,
      {
        id,
        image,
        name,
        price,
        quantity: 1,
      },
    ]);

    alert("Added to cart successfully.");
  };

  const addWishlist = () => {
    if (!loggedInUser) {
      handleLoginRequired();
      return;
    }

    const alreadyAdded = wishlist.find((item) => item.id === id);

    if (alreadyAdded) {
      alert("This item is already in your wishlist.");
      return;
    }

    setWishlist([
      ...wishlist,
      {
        id,
        image,
        name,
        price,
      },
    ]);

    alert("Added to wishlist successfully.");
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-orange-400/40 dark:bg-slate-800">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-56 w-full object-cover transition-transform duration-500 hover:scale-110"
        />

        <span className="absolute left-3 top-3 z-10 rounded-full bg-orange-500 px-3 py-1 text-xs text-white shadow-lg">
          Popular
        </span>

        <button
          onClick={addWishlist}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-500 hover:text-white dark:bg-slate-700"
          title="Add to Wishlist"
        >
          ❤️
        </button>

        <button
          onClick={handleShare}
          className="absolute right-3 top-16 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-500 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-500 hover:text-white dark:bg-slate-700 dark:text-blue-400"
          title="Share Food"
        >
          🔗
        </button>
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {name}
        </h2>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-2xl font-bold text-orange-500">
            ₹{price}
          </p>

          <span className="font-semibold text-yellow-500">
            ⭐ 4.8
          </span>
        </div>

        <button
          onClick={addToCart}
          className="mt-6 w-full cursor-pointer rounded-xl bg-orange-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600"
        >
          🛒 Add To Cart
        </button>

        <Link
          to={`/food/${id}`}
          className="mt-4 block rounded-xl border-2 border-blue-500 py-3 text-center font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400"
        >
          👀 View Details
        </Link>
      </div>
    </div>
  );
}

export default FoodCard;