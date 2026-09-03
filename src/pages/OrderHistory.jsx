import { Link } from "react-router-dom";

function OrderHistory() {
  // 1. Get current logged-in user details safely
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  const userEmail = loggedInUser?.email || loggedInUser?.phone || "";

  // 2. Get all orders from localStorage
  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

  // 3. Filter orders only if user is logged in, else empty array
  const orders = loggedInUser
    ? allOrders.filter(
        (order) => order.email === userEmail || order.userEmail === userEmail || order.customer === loggedInUser.name
      )
    : [];

  return (
    <section
      className="
        min-h-screen
        bg-gray-100
        dark:bg-slate-950
        py-24
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
          📦 Order History
        </h1>

        {!loggedInUser ? (
          <div
            className="
                bg-white
                dark:bg-slate-800
                p-10
                rounded-3xl
                shadow-xl
                text-center
              "
          >
            <h2
              className="
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              Please Login First 🔒
            </h2>

            <p
              className="
                text-gray-500
                dark:text-gray-400
                mt-3
              "
            >
              Log in to your account to view your order history.
            </p>

            <Link
              to="/login"
              className="
                inline-block
                mt-6
                bg-orange-500
                text-white
                px-6
                py-3
                rounded-xl
                hover:bg-orange-600
                transition
              "
            >
              Login Now 🚀
            </Link>
          </div>
        ) : orders.length === 0 ? (
          <div
            className="
                bg-white
                dark:bg-slate-800
                p-10
                rounded-3xl
                shadow-xl
                text-center
              "
          >
            <h2
              className="
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              No Orders Found 😔
            </h2>

            <p
              className="
                text-gray-500
                dark:text-gray-400
                mt-3
              "
            >
              Place your first order to see it here.
            </p>

            <Link
              to="/"
              className="
                inline-block
                mt-6
                bg-orange-500
                text-white
                px-6
                py-3
                rounded-xl
                hover:bg-orange-600
                transition
              "
            >
              Order Now 🍔
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="
                    bg-white
                    dark:bg-slate-800
                    rounded-3xl
                    shadow-xl
                    p-6
                    transition
                  "
              >
                <div
                  className="
                      flex
                      flex-col
                      md:flex-row
                      md:justify-between
                      mb-5
                    "
                >
                  <div>
                    <h2
                      className="
                          text-2xl
                          font-bold
                          text-gray-900
                          dark:text-white
                        "
                    >
                      {order.customer}
                    </h2>

                    <p
                      className="
                          text-gray-500
                          dark:text-gray-300
                          mt-2
                        "
                    >
                      📞 {order.phone}
                    </p>

                    <p
                      className="
                          text-gray-500
                          dark:text-gray-300
                        "
                    >
                      📍 {order.address}, {order.city} - {order.pincode}
                    </p>
                  </div>

                  <div className="mt-5 md:mt-0 md:text-right">
                    <p
                      className="
                          font-semibold
                          text-gray-900
                          dark:text-white
                        "
                    >
                      Payment: {order.payment}
                    </p>

                    <p
                      className="
                          text-gray-500
                          dark:text-gray-400
                        "
                    >
                      {order.date}
                    </p>

                    <p
                      className="
                          text-green-600
                          text-2xl
                          font-bold
                          mt-2
                        "
                    >
                      ₹{order.total}
                    </p>
                  </div>
                </div>

                <hr
                  className="
                      my-5
                      border-gray-300
                      dark:border-slate-600
                    "
                />

                <h3
                  className="
                      text-xl
                      font-bold
                      mb-4
                      text-gray-900
                      dark:text-white
                    "
                >
                  Ordered Items 🍽️
                </h3>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="
                            flex
                            items-center
                            justify-between
                            border
                            border-gray-200
                            dark:border-slate-600
                            rounded-xl
                            p-4
                            bg-gray-50
                            dark:bg-slate-900
                          "
                    >
                      <div
                        className="
                              flex
                              items-center
                              gap-4
                            "
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="
                                w-20
                                h-20
                                rounded-xl
                                object-cover
                              "
                        />

                        <div>
                          <h4
                            className="
                                  font-bold
                                  text-lg
                                  text-gray-900
                                  dark:text-white
                                "
                          >
                            {item.name}
                          </h4>

                          <p
                            className="
                                  text-gray-600
                                  dark:text-gray-300
                                "
                          >
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p
                        className="
                              text-orange-500
                              font-bold
                              text-lg
                            "
                      >
                        ₹{item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default OrderHistory;