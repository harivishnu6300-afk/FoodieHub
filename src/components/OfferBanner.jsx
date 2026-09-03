function OfferBanner() {
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
        <div
          className="
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            rounded-3xl
            p-10
            shadow-2xl
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            text-white
            overflow-hidden
            relative
          "
        >
          {/* Content */}

          <div className="z-10">
            <h1
              className="
                text-4xl
                md:text-5xl
                font-extrabold
              "
            >
              🔥 Special Food Offer
            </h1>

            <p
              className="
                text-lg
                mt-4
                text-orange-50
              "
            >
              Get 30% OFF on your first order
            </p>

            <p
              className="
                mt-2
                font-semibold
              "
            >
              Use Code:
              <span className="ml-2 bg-white/20 px-3 py-1 rounded-full">
                FOOD30
              </span>
            </p>

            <button
              className="
                mt-6
                bg-white
                text-orange-500
                px-8
                py-3
                rounded-xl
                font-bold
                shadow-lg
                hover:bg-gray-100
                hover:scale-105
                transition
                duration-300
              "
            >
              Order Now 🍔
            </button>
          </div>

          {/* Emoji */}

          <div
            className="
              text-8xl
              mt-8
              md:mt-0
              animate-bounce
            "
          >
            🍕
          </div>

          {/* Background decoration */}

          <div
            className="
              absolute
              -right-10
              -bottom-10
              w-40
              h-40
              bg-white/10
              rounded-full
            "
          />
        </div>
      </div>
    </section>
  );
}

export default OfferBanner;
