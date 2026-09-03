function Footer() {
  return (
    <footer
      className="
        bg-slate-900
        dark:bg-black
        text-white
        py-12
        transition
        duration-500
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto
          px-6
          grid
          md:grid-cols-3
          gap-10
        "
      >
        {/* Brand */}

        <div>
          <h1
            className="
              text-3xl
              font-extrabold
              text-orange-500
            "
          >
            🍔 FoodieHub
          </h1>

          <p
            className="
              text-gray-400
              mt-4
              leading-7
            "
          >
            Delicious food delivered to your doorstep. Fresh taste, fast
            delivery and happy moments.
          </p>
        </div>

        {/* Links */}

        <div>
          <h2
            className="
              text-xl
              font-bold
              mb-5
            "
          >
            Quick Links
          </h2>

          <ul
            className="
              space-y-3
              text-gray-300
            "
          >
            <li
              className="
                hover:text-orange-500
                cursor-pointer
                transition
              "
            >
              Home
            </li>

            <li
              className="
                hover:text-orange-500
                cursor-pointer
                transition
              "
            >
              Menu
            </li>

            <li
              className="
                hover:text-orange-500
                cursor-pointer
                transition
              "
            >
              Contact
            </li>

            <li
              className="
                hover:text-orange-500
                cursor-pointer
                transition
              "
            >
              Wishlist ❤️
            </li>
          </ul>
        </div>

        {/* Social */}

        <div>
          <h2
            className="
              text-xl
              font-bold
              mb-5
            "
          >
            Follow Us
          </h2>

          <div
            className="
              flex
              gap-5
              text-3xl
            "
          >
            <span
              className="
                hover:scale-125
                cursor-pointer
                transition
              "
            >
              📘
            </span>

            <span
              className="
                hover:scale-125
                cursor-pointer
                transition
              "
            >
              📸
            </span>

            <span
              className="
                hover:scale-125
                cursor-pointer
                transition
              "
            >
              🐦
            </span>

            <span
              className="
                hover:scale-125
                cursor-pointer
                transition
              "
            >
              ▶️
            </span>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div
        className="
          text-center
          text-gray-400
          mt-10
          border-t
          border-gray-700
          pt-6
        "
      >
        © 2026 FoodieHub. All Rights Reserved. 🍔
      </div>
    </footer>
  );
}

export default Footer;
