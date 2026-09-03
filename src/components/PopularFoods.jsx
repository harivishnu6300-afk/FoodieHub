import FoodCard from "./FoodCard";

import pizza from "../assets/images/pizza.jpg";
import burger from "../assets/images/burger.jpg";
import fries from "../assets/images/fries.jpg";
import drink from "../assets/images/drink.jpg";

function PopularFoods({
  search,
  cartCount,
  setCartCount,
  selectedCategory,
  cartItems,
  setCartItems,
  wishlist,
  setWishlist,
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
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section
      className="
      py-20
      bg-gradient-to-b
      from-gray-100
      to-orange-50
      dark:from-slate-950
      dark:to-slate-900
      transition
      duration-500
    "
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h1
            className="
            text-5xl
            font-extrabold
            text-gray-900
            dark:text-white
          "
          >
            🍔 Popular Foods
          </h1>

          <p
            className="
            mt-4
            text-gray-600
            dark:text-gray-300
            text-lg
          "
          >
            Fresh • Hot • Delicious
          </p>

          <div
            className="
            mt-5
            inline-block
            bg-orange-500
            dark:bg-orange-600
            text-white
            px-6
            py-2
            rounded-full
            shadow-lg
          "
          >
            {filteredFoods.length} Foods Available
          </div>
        </div>

        {filteredFoods.length === 0 ? (
          <div
            className="
              bg-white
              dark:bg-slate-800
              p-10
              rounded-2xl
              shadow-xl
              text-center
              transition
            "
          >
            <h2
              className="
                text-3xl
                font-bold
                text-gray-700
                dark:text-white
              "
            >
              😔 No Food Found
            </h2>

            <p
              className="
                mt-3
                text-gray-500
                dark:text-gray-400
              "
            >
              Try another search or category.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-8
            "
          >
            {filteredFoods.map((food) => (
              <div
                key={food.id}
                className="
                      transform
                      hover:-translate-y-3
                      transition-all
                      duration-500
                    "
              >
                <FoodCard
                  id={food.id}
                  image={food.image}
                  name={food.name}
                  price={food.price}
                  cartCount={cartCount}
                  setCartCount={setCartCount}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PopularFoods;
