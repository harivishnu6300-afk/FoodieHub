import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

const API_URL = `https://foodiehub-backend-uuax.onrender.com/api/products`;

function PopularFoods({
  search,
  selectedCategory,
  cartItems,
  setCartItems,
  wishlist,
  setWishlist,
  loggedInUser,
}) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setFoods(data.products || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load food items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();

    const interval = setInterval(fetchFoods, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes((search || "").toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <section className="px-6 py-12 text-center">
        <p className="text-lg font-semibold text-orange-500">
          Loading food items...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-6 py-12 text-center">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Popular Foods
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Fresh food delivered to your doorstep
          </p>
        </div>

        {filteredFoods.length === 0 ? (
          <div className="rounded-2xl bg-gray-100 p-10 text-center dark:bg-slate-800">
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              No food items found.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                id={food.id}
                image={`/src/assets/images/${food.image}`}
                name={food.name}
                price={Number(food.price)}
                category={food.category}
                stock={Number(food.stock)}
                cartItems={cartItems}
                setCartItems={setCartItems}
                wishlist={wishlist}
                setWishlist={setWishlist}
                loggedInUser={loggedInUser}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PopularFoods;


