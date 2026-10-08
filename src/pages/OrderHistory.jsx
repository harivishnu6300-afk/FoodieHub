import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const savedUser = localStorage.getItem("loggedInUser");

        if (!savedUser) {
          setOrders([]);
          setError("Please login to view your orders.");
          return;
        }

        const user = JSON.parse(savedUser);

        if (!user?.id) {
          setOrders([]);
          setError("User session is invalid. Please login again.");
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders/user/${user.id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load orders"
          );
        }

        setOrders(Array.isArray(data.orders) ? data.orders : []);
      } catch (err) {
        console.error("Order history error:", err);
        setError(
          err.message || "Unable to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Orders
            </h1>
            <p className="text-gray-500 mt-1">
              Your orders from FoodieHub
            </p>
          </div>

          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          >
            Order Food
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
            {error}
          </div>
        )}

        {!error && orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
            <div className="text-5xl mb-4">ðŸ½ï¸</div>

            <h2 className="text-xl font-bold text-gray-800">
              No orders yet
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              Your completed orders will appear here.
            </p>

            <Link
              to="/"
              className="inline-block px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
            >
              Browse Food
            </Link>
          </div>
        )}

        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Order #{order.id}
                  </p>

                  <p className="font-semibold text-gray-900">
                    {order.created_at
                      ? new Date(order.created_at).toLocaleString()
                      : "Date unavailable"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold capitalize">
                    {order.status}
                  </span>

                  <span className="font-bold text-lg text-gray-900">
                    â‚¹{Number(order.total_amount || 0).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="space-y-4">
                  {order.items?.map((item, index) => (
                    <div
                      key={`${order.id}-${item.product_id}-${index}`}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={
                          item.image ||
                          "https://via.placeholder.com/80"
                        }
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover bg-gray-100"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {item.name || "Food item"}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          â‚¹
                          {(
                            Number(item.price || 0) *
                            Number(item.quantity || 0)
                          ).toFixed(2)}
                        </p>

                        <p className="text-xs text-gray-500">
                          â‚¹{Number(item.price || 0).toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Delivery Address
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.full_name}
                    {order.address_line
                      ? `, ${order.address_line}`
                      : ""}
                    {order.city
                      ? `, ${order.city}`
                      : ""}
                    {order.pincode
                      ? ` - ${order.pincode}`
                      : ""}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Payment:{" "}
                    <span className="capitalize">
                      {order.payment_method || "COD"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;

