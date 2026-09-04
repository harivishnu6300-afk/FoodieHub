import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import pizza from "../assets/images/pizza.jpg";
import burger from "../assets/images/burger.jpg";
import fries from "../assets/images/fries.jpg";
import drink from "../assets/images/drink.jpg";

function FoodDetails({ cartItems, setCartItems, wishlist, setWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const foods = [
    {
      id: 1,
      image: pizza,
      name: "Cheese Pizza",
      price: 299,
      category: "Pizza",
      rating: "⭐⭐⭐⭐⭐",
      description:
        "Delicious cheese pizza prepared with fresh ingredients and extra cheese.",
    },
    {
      id: 2,
      image: burger,
      name: "Chicken Burger",
      price: 199,
      category: "Burger",
      rating: "⭐⭐⭐⭐",
      description:
        "Juicy chicken burger with fresh vegetables and special sauce.",
    },
    {
      id: 3,
      image: fries,
      name: "French Fries",
      price: 149,
      category: "Fries",
      rating: "⭐⭐⭐⭐⭐",
      description: "Crispy golden french fries with perfect taste.",
    },
    {
      id: 4,
      image: drink,
      name: "Cold Drink",
      price: 99,
      category: "Drinks",
      rating: "⭐⭐⭐⭐",
      description: "Refreshing cold drink to complete your meal.",
    },
  ];

  const food = foods.find((item) => item.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (food) {
      const saved =
        JSON.parse(localStorage.getItem(`reviews-${food.id}`)) || [];
      setReviews(saved);
    }
  }, [food]);

  if (!food) {
    return (
      <h1 className="text-center text-4xl font-bold mt-32 dark:text-white">
        Food Not Found 🚫
      </h1>
    );
  }

  const addToCart = () => {
    const existing = cartItems.find((item) => item.id === food.id);

    if (existing) {
      const updated = cartItems.map((item) =>
        item.id === food.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item,
      );

      setCartItems(updated);
      alert("Cart Updated 🛒");
    } else {
      setCartItems([
        ...cartItems,
        {
          id: food.id,
          image: food.image,
          name: food.name,
          price: food.price,
          quantity: quantity,
        },
      ]);

      alert("Added To Cart 🛒");
    }
  };

  const addWishlist = () => {
    const exists = wishlist.find((item) => item.id === food.id);

    if (exists) {
      alert("Already in Wishlist ❤️");
      return;
    }

    setWishlist([
      ...wishlist,
      {
        id: food.id,
        image: food.image,
        name: food.name,
        price: food.price,
      },
    ]);

    alert("Added To Wishlist ❤️");
  };

  const submitReview = () => {
    if (review.trim() === "") {
      alert("Please write a review! ⚠️");
      return;
    }

    const newReview = {
      id: Date.now(),
      rating,
      review,
    };

    const updatedReviews = [...reviews, newReview];

    setReviews(updatedReviews);

    localStorage.setItem(`reviews-${food.id}`, JSON.stringify(updatedReviews));

    setReview("");
    setRating(5);

    alert("Review Added ⭐");
  };

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-slate-950 py-24 transition duration-500">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 transition duration-500">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-900 dark:bg-slate-700 text-white px-5 py-2.5 rounded-xl mb-8 hover:bg-orange-500 dark:hover:bg-orange-500 transition shadow"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-96 object-cover rounded-2xl shadow-md"
          />

          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              {food.name}
            </h1>

            <p className="text-orange-500 text-3xl font-bold mt-4">
              ₹{food.price}
            </p>

            <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">
              Category : <span className="text-orange-500">{food.category}</span>
            </p>

            <p className="mt-2 text-lg">{food.rating}</p>

            <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              {food.description}
            </p>

            <div className="flex items-center gap-5 mt-8">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white px-4 py-2 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition"
              >
                -
              </button>

              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white px-4 py-2 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition"
              >
                +
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={addToCart}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg transition"
              >
                Add To Cart 🛒
              </button>

              <button
                onClick={addWishlist}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg transition"
              >
                ❤️ Wishlist
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t dark:border-slate-700 pt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Write a Review
          </h2>

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white w-full p-3 rounded-xl focus:outline-orange-500"
          >
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full h-28 mt-4 p-3 rounded-xl focus:outline-orange-500"
            placeholder="Write your review..."
          />

          <button
            onClick={submitReview}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow"
          >
            Submit Review 🚀
          </button>
        </div>

        <div className="mt-14">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Customer Reviews
          </h2>

          {reviews.length === 0 ? (
            <div className="bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-gray-400 p-5 rounded-2xl">
              No Reviews Yet. Be the first one to review! 🌟
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((item) => (
                <div
                  key={item.id}
                  className="border dark:border-slate-700 bg-gray-50 dark:bg-slate-900 rounded-2xl p-5 shadow-sm"
                >
                  <p className="text-lg">{"⭐".repeat(item.rating)}</p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {item.review}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FoodDetails;