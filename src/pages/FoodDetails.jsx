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
      <h1 className="text-center text-4xl font-bold mt-32">Food Not Found</h1>
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
      alert("Write Review");
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
    <section className="min-h-screen bg-gray-100 py-24">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-5 py-2 rounded-lg mb-8"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-10">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-96 object-cover rounded-xl"
          />

          <div>
            <h1 className="text-4xl font-bold">{food.name}</h1>

            <p className="text-orange-500 text-3xl font-bold mt-4">
              ₹{food.price}
            </p>

            <p className="mt-4">Category : {food.category}</p>

            <p className="mt-2">{food.rating}</p>

            <p className="mt-6 text-gray-600">{food.description}</p>

            <div className="flex items-center gap-5 mt-8">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                -
              </button>

              <span className="text-2xl font-bold">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                +
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={addToCart}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg"
              >
                Add Cart 🛒
              </button>

              <button
                onClick={addWishlist}
                className="bg-red-500 text-white px-6 py-3 rounded-lg"
              >
                ❤️ Wishlist
              </button>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">Write Review</h2>

              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border w-full p-3 rounded-lg"
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
                className="border w-full h-28 mt-4 p-3 rounded-lg"
                placeholder="Write your review..."
              />

              <button
                onClick={submitReview}
                className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

          {reviews.length === 0 ? (
            <div className="bg-gray-100 p-5 rounded-xl">No Reviews Yet.</div>
          ) : (
            reviews.map((item) => (
              <div key={item.id} className="border rounded-xl p-5 mb-4">
                <p>{"⭐".repeat(item.rating)}</p>

                <p className="mt-2">{item.review}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default FoodDetails;
