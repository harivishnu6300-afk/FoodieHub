function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Rahul",
      review: "Amazing food quality and super fast delivery!",
      rating: "⭐⭐⭐⭐⭐",
    },

    {
      id: 2,
      name: "Priya",
      review: "Pizza taste was awesome. Loved the experience ❤️",
      rating: "⭐⭐⭐⭐",
    },

    {
      id: 3,
      name: "Kiran",
      review: "FoodieHub is my favourite food app now!",
      rating: "⭐⭐⭐⭐⭐",
    },
  ];

  return (
    <section
      className="
        py-16
        bg-white
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
          Customer Reviews 💬
        </h1>

        <div
          className="
            grid
            md:grid-cols-3
            gap-8
          "
        >
          {reviews.map((item) => (
            <div
              key={item.id}
              className="
                  bg-gray-100
                  dark:bg-slate-800
                  p-6
                  rounded-3xl
                  shadow-xl
                  hover:shadow-orange-400/30
                  hover:-translate-y-3
                  transition-all
                  duration-500
                "
            >
              {/* Profile */}

              <div
                className="
                    w-16
                    h-16
                    rounded-full
                    bg-orange-100
                    dark:bg-orange-500/20
                    flex
                    items-center
                    justify-center
                    text-4xl
                  "
              >
                👤
              </div>

              <h2
                className="
                    text-xl
                    font-bold
                    mt-5
                    text-gray-900
                    dark:text-white
                  "
              >
                {item.name}
              </h2>

              <p
                className="
                    mt-3
                    text-gray-600
                    dark:text-gray-300
                    leading-7
                  "
              >
                {item.review}
              </p>

              <div
                className="
                    mt-5
                    inline-block
                    bg-orange-100
                    dark:bg-orange-500/20
                    px-4
                    py-2
                    rounded-full
                  "
              >
                <span className="text-orange-500">{item.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
