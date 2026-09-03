import { Link } from "react-router-dom";

function FoodCard({
  id,
  image,
  name,
  price,
  cartItems,
  setCartItems,
  wishlist,
  setWishlist,
}) {
  const addToCart = () => {
    const existingItem = cartItems.find((item) => item.name === name);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.name === name
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );

      setCartItems(updatedCart);

      alert("Cart Updated 🛒");
    } else {
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

      alert("Added to Cart 🛒");
    }
  };

  const addWishlist = () => {
    const alreadyAdded = wishlist.find((item) => item.name === name);

    if (alreadyAdded) {
      alert("Already in Wishlist ❤️");

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

    alert("Added to Wishlist ❤️");
  };

  return (
    <div
      className="
      bg-white
      dark:bg-slate-800
      rounded-3xl
      overflow-hidden
      shadow-xl
      hover:shadow-orange-400/40
      hover:-translate-y-3
      transition-all
      duration-500
    "
    >
      {/* Image Section */}

      <div
        className="
        relative
        overflow-hidden
      "
      >
        <img
          src={image}
          alt={name}
          className="
            w-full
            h-56
            object-cover
            hover:scale-110
            transition-transform
            duration-500
          "
        />

        <span
          className="
          absolute
          top-3
          left-3
          bg-orange-500
          text-white
          text-xs
          px-3
          py-1
          rounded-full
          shadow-lg
        "
        >
          Popular
        </span>

        <button
          onClick={addWishlist}
          className="
            absolute
            top-3
            right-3
            bg-white
            dark:bg-slate-700
            text-red-500
            rounded-full
            w-10
            h-10
            flex
            items-center
            justify-center
            shadow-lg
            hover:bg-red-500
            hover:text-white
            hover:scale-110
            transition-all
            duration-300
          "
        >
          ❤️
        </button>
      </div>

      {/* Content */}

      <div className="p-5">
        <h2
          className="
          text-2xl
          font-bold
          text-gray-900
          dark:text-white
        "
        >
          {name}
        </h2>

        <div
          className="
          flex
          justify-between
          items-center
          mt-3
        "
        >
          <p
            className="
            text-orange-500
            font-bold
            text-2xl
          "
          >
            ₹{price}
          </p>

          <span
            className="
            text-yellow-500
            font-semibold
          "
          >
            ⭐ 4.8
          </span>
        </div>

        <button
          onClick={addToCart}
          className="
            w-full
            mt-6
            bg-orange-500
            text-white
            py-3
            rounded-xl
            hover:bg-orange-600
            hover:scale-105
            transition-all
            duration-300
            font-semibold
            shadow-lg
          "
        >
          🛒 Add To Cart
        </button>

        <Link
          to={`/food/${id}`}
          className="
            block
            text-center
            mt-4
            border-2
            border-blue-500
            dark:border-blue-400
            text-blue-500
            dark:text-blue-400
            py-3
            rounded-xl
            hover:bg-blue-500
            hover:text-white
            transition-all
            duration-300
            font-semibold
          "
        >
          👀 View Details
        </Link>
      </div>
    </div>
  );
}

export default FoodCard;
