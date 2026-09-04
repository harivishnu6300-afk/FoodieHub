function Categories({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All",
    "Pizza",
    "Burger",
    "Fries",
    "Drinks",
    "Biryani",
    "Chicken",
    "Desserts",
    "Ice Cream",
    "Cakes",
    "Pasta",
    "Sandwich",
    "South Indian",
    "Chinese",
  ];

  return (
    <section className="bg-gray-100 py-10 transition duration-500 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Food Categories 🍽️
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-3 font-semibold transition duration-300 hover:scale-105 ${
                selectedCategory === category
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white text-gray-800 shadow hover:bg-orange-100 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;