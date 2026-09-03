function Restaurants() {
  const restaurants = [
    {
      id: 1,
      name: "Pizza Hut",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
      rating: "⭐ 4.6",
    },
    {
      id: 2,
      name: "Burger King",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
      rating: "⭐ 4.5",
    },
    {
      id: 3,
      name: "KFC",
      image: "https://images.unsplash.com/photo-1562967916-eb82221dfb36?w=500",
      rating: "⭐ 4.7",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12">
        Top Restaurants
      </h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-60 object-cover"
            />

            <div className="p-5">
              <h3 className="text-2xl font-bold">
                {restaurant.name}
              </h3>

              <p className="text-orange-500 mt-2 font-semibold">
                {restaurant.rating}
              </p>

              <button className="mt-5 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600">
                View Menu
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Restaurants;