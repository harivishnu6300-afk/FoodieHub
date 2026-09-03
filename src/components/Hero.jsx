import hero from "../assets/images/hero.jpg";

function Hero() {
  return (
    <section
      className="
      pt-20 
      min-h-screen 
      bg-gradient-to-r 
      from-orange-100 
      via-white 
      to-orange-50
      dark:from-slate-900 
      dark:via-slate-950 
      dark:to-slate-900
      transition duration-500
    "
    >
      <div
        className="
        max-w-7xl 
        mx-auto 
        px-6 
        py-20 
        flex 
        flex-col-reverse 
        md:flex-row 
        items-center 
        gap-12
      "
      >
        {/* Content */}

        <div className="flex-1">
          <span
            className="
            inline-block
            bg-orange-100
            dark:bg-orange-500/20
            text-orange-600
            dark:text-orange-400
            px-4
            py-2
            rounded-full
            font-semibold
            transition
          "
          >
            🍔 Fast Delivery in 30 Minutes
          </span>

          <h1
            className="
            text-5xl 
            md:text-7xl 
            font-extrabold 
            mt-6 
            leading-tight
            text-gray-900
            dark:text-white
          "
          >
            Delicious Food
            <br />
            Delivered To
            <span className="text-orange-500"> Your Door</span>
          </h1>

          <p
            className="
            mt-6 
            text-lg 
            text-gray-600 
            dark:text-gray-300 
            leading-8
          "
          >
            Order your favourite meals from the best restaurants near you. Fresh
            ingredients, hot delivery and amazing taste every time.
          </p>

          <div
            className="
            flex 
            flex-col 
            sm:flex-row 
            gap-5 
            mt-8
          "
          >
            <button
              className="
              bg-orange-500
              hover:bg-orange-600
              text-white
              px-8
              py-4
              rounded-xl
              shadow-lg
              transition
              duration-300
              hover:scale-105
            "
            >
              Order Now 🍕
            </button>

            <button
              className="
              border-2
              border-orange-500
              text-orange-500
              hover:bg-orange-500
              hover:text-white
              px-8
              py-4
              rounded-xl
              transition
              duration-300
            "
            >
              Explore Menu
            </button>
          </div>

          {/* Stats */}

          <div
            className="
            flex 
            flex-wrap 
            gap-10 
            mt-10
          "
          >
            <div>
              <h2
                className="
                text-3xl 
                font-bold 
                text-orange-500
              "
              >
                500+
              </h2>

              <p
                className="
                text-gray-500 
                dark:text-gray-400
              "
              >
                Restaurants
              </p>
            </div>

            <div>
              <h2
                className="
                text-3xl 
                font-bold 
                text-orange-500
              "
              >
                20K+
              </h2>

              <p
                className="
                text-gray-500 
                dark:text-gray-400
              "
              >
                Happy Customers
              </p>
            </div>

            <div>
              <h2
                className="
                text-3xl 
                font-bold 
                text-orange-500
              "
              >
                4.9⭐
              </h2>

              <p
                className="
                text-gray-500 
                dark:text-gray-400
              "
              >
                Ratings
              </p>
            </div>
          </div>
        </div>

        {/* Image */}

        <div
          className="
          flex-1 
          flex 
          justify-center
        "
        >
          <img
            src={hero}
            alt="Hero"
            className="
              w-[550px]
              rounded-3xl
              drop-shadow-2xl
              hover:scale-105
              transition
              duration-500
            "
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
