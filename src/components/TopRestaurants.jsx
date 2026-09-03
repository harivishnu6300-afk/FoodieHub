function TopRestaurants() {
  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      rating: "⭐⭐⭐⭐⭐",
      time: "30 min",
      location: "Hyderabad",
    },

    {
      id: 2,
      name: "Burger House",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      rating: "⭐⭐⭐⭐",
      time: "25 min",
      location: "Bangalore",
    },

    {
      id: 3,
      name: "Spice Restaurant",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      rating: "⭐⭐⭐⭐⭐",
      time: "40 min",
      location: "Chennai",
    },
  ];

  return (
    <section
      className="
        py-16
        bg-gray-100
        dark:bg-slate-950
        transition
        duration-500
      "
    >
      <div className="max-w-6xl mx-auto px-6">
        <h1
          className="
            text-4xl
            font-extrabold
            text-center
            mb-10
            text-gray-900
            dark:text-white
          "
        >
          Top Restaurants 🍽️
        </h1>

        <div
          className="
            grid
            md:grid-cols-3
            gap-8
          "
        >
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="
                  bg-white
                  dark:bg-slate-800
                  rounded-3xl
                  overflow-hidden
                  shadow-xl
                  hover:shadow-orange-400/30
                  hover:-translate-y-3
                  transition-all
                  duration-500
                "
            >
              {/* Image */}

              <div className="overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="
                      w-full
                      h-52
                      object-cover
                      hover:scale-110
                      transition
                      duration-500
                    "
                />
              </div>

              {/* Content */}

              <div className="p-6">
                <h2
                  className="
                      text-2xl
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                >
                  {restaurant.name}
                </h2>

                <div
                  className="
                      mt-3
                      inline-block
                      bg-yellow-100
                      dark:bg-yellow-500/20
                      px-3
                      py-1
                      rounded-full
                    "
                >
                  {restaurant.rating}
                </div>

                <p
                  className="
                      text-gray-500
                      dark:text-gray-300
                      mt-4
                    "
                >
                  ⏱️ {restaurant.time}
                </p>

                <p
                  className="
                      text-gray-500
                      dark:text-gray-300
                      mt-1
                    "
                >
                  📍 {restaurant.location}
                </p>

                <button
                  className="
                      mt-5
                      bg-orange-500
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                      hover:bg-orange-600
                      hover:scale-105
                      transition
                      duration-300
                      shadow-lg
                    "
                >
                  View Menu 🍴
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopRestaurants;
