import FoodCard from "./FoodCard";

import pizza from "../assets/images/pizza.jpg";
import burger from "../assets/images/burger.jpg";
import fries from "../assets/images/fries.jpg";
import drink from "../assets/images/drink.jpg";

function PopularFoods({
  search,
  selectedCategory,
  cartItems,
  setCartItems,
  wishlist,
  setWishlist,
  loggedInUser,
}) {
  const foods = [
    {
      id: 1,
      image: pizza,
      name: "Cheese Pizza",
      price: 299,
      category: "Pizza",
    },
    {
      id: 2,
      image: burger,
      name: "Chicken Burger",
      price: 199,
      category: "Burger",
    },
    {
      id: 3,
      image: fries,
      name: "French Fries",
      price: 149,
      category: "Fries",
    },
    {
      id: 4,
      image: drink,
      name: "Cold Drink",
      price: 99,
      category: "Drinks",
    },
  ];

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes((search || "").toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-slate-950 py-16 transition duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Popular Foods
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
            Fresh, hot and delicious food for you
          </p>
        </div>

        {filteredFoods.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
              No Food Found
            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Try another category or search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                id={food.id}
                image={food.image}
                name={food.name}
                price={food.price}
                category={food.category}
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