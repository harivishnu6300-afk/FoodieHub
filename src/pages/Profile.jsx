import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const savedUser =
      JSON.parse(localStorage.getItem("loggedInUser")) ||
      JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      navigate("/login");
      return;
    }

    setUser(savedUser);
    setName(savedUser.name || "");
    setPhone(savedUser.phone || savedUser.mobile || "");

    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, [navigate]);

  useEffect(() => {
    if (!user?.id) return;

    const loadOrders = async () => {
      try {
        setOrdersLoading(true);
        setOrdersError("");

        const response = await fetch(
          `https://foodiehub-backend-uuax.onrender.com/api/orders/user/${user.id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load orders"
          );
        }

        setOrders(
          Array.isArray(data.orders) ? data.orders : []
        );
      } catch (error) {
        console.error("Profile orders error:", error);

        setOrdersError(
          error.message || "Unable to load orders"
        );
      } finally {
        setOrdersLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name,
      phone
    };

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setIsEditing(false);

    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white text-orange-500 font-bold text-3xl rounded-full flex items-center justify-center shadow-md">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Hello, {user.name || "Foodie"}!
              </h1>

              <p className="text-orange-100 text-sm">
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-white text-orange-600 font-semibold px-6 py-2.5 rounded-xl shadow hover:bg-orange-50 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="md:col-span-1 bg-white dark:bg-slate-900 rounded-2xl shadow-md p-4 space-y-2 h-fit border border-gray-100 dark:border-slate-800">

            <button
              onClick={() => setActiveTab("info")}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition ${
                activeTab === "info"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-800"
              }`}
            >
              ðŸ‘¤ Personal Information
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition ${
                activeTab === "orders"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-800"
              }`}
            >
              ðŸ“¦ My Orders ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab("wishlist")}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition ${
                activeTab === "wishlist"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-800"
              }`}
            >
              â¤ï¸ My Wishlist ({wishlist.length})
            </button>

            <button
              onClick={() => setActiveTab("address")}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition ${
                activeTab === "address"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-800"
              }`}
            >
              ðŸ“ Saved Addresses
            </button>
          </div>

          <div className="md:col-span-3 bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100 dark:border-slate-800">

            {activeTab === "info" && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-slate-800">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Personal Information
                  </h2>

                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-orange-500 font-semibold text-sm hover:underline"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                {!isEditing ? (
                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <div>
                      <label className="text-xs text-gray-400 block font-semibold">
                        Full Name
                      </label>
                      <p className="text-lg font-medium">
                        {user.name || "Not Added"}
                      </p>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 block font-semibold">
                        Email Address
                      </label>
                      <p className="text-lg font-medium">
                        {user.email || "Not Added"}
                      </p>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 block font-semibold">
                        Phone Number
                      </label>
                      <p className="text-lg font-medium">
                        {user.phone ||
                          user.mobile ||
                          "Not Added yet"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleUpdateProfile}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                        Name
                      </label>

                      <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                          setName(e.target.value)
                        }
                        className="w-full border p-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                        Phone
                      </label>

                      <input
                        type="text"
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value)
                        }
                        className="w-full border p-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      />
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        type="submit"
                        className="bg-orange-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition"
                      >
                        Save Changes
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setIsEditing(false)
                        }
                        className="bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <div className="flex items-center justify-between mb-6 border-b pb-4 dark:border-slate-800">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    My Orders
                  </h2>

                  <button
                    onClick={() =>
                      navigate("/order-history")
                    }
                    className="text-orange-500 text-sm font-semibold hover:underline"
                  >
                    View All
                  </button>
                </div>

                {ordersLoading && (
                  <div className="text-center py-10">
                    <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>

                    <p className="text-gray-500">
                      Loading orders...
                    </p>
                  </div>
                )}

                {!ordersLoading && ordersError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
                    {ordersError}
                  </div>
                )}

                {!ordersLoading &&
                  !ordersError &&
                  orders.length === 0 && (
                    <div className="text-center py-10">
                      <div className="text-5xl mb-4">
                        ðŸ½ï¸
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        No orders yet
                      </h3>

                      <p className="text-gray-500 mt-2">
                        Your orders will appear here.
                      </p>
                    </div>
                  )}

                {!ordersLoading &&
                  !ordersError &&
                  orders.length > 0 && (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border dark:border-slate-800 p-5 rounded-xl bg-gray-50 dark:bg-slate-800/50"
                        >
                          <div className="flex flex-col sm:flex-row justify-between gap-4">

                            <div>
                              <span className="text-xs font-bold text-orange-500">
                                ORDER #{order.id}
                              </span>

                              <h3 className="font-bold text-gray-800 dark:text-white mt-1">
                                {order.items
                                  ?.map(
                                    (item) =>
                                      `${item.name} x${item.quantity}`
                                  )
                                  .join(", ") ||
                                  "Food Order"}
                              </h3>

                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {order.created_at
                                  ? new Date(
                                      order.created_at
                                    ).toLocaleString()
                                  : "Date unavailable"}
                              </p>

                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize">
                                Payment:{" "}
                                {order.payment_method ||
                                  "COD"}
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="font-bold text-gray-800 dark:text-white text-lg">
                                â‚¹
                                {Number(
                                  order.total_amount || 0
                                ).toFixed(2)}
                              </p>

                              <span
                                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                  order.status === "delivered"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {order.status || "Processing"}
                              </span>
                            </div>
                          </div>

                          {order.items?.length > 0 && (
                            <div className="mt-4 pt-4 border-t dark:border-slate-700">
                              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Items
                              </p>

                              <div className="space-y-2">
                                {order.items.map(
                                  (item, index) => (
                                    <div
                                      key={`${order.id}-${item.product_id}-${index}`}
                                      className="flex justify-between text-sm"
                                    >
                                      <span className="text-gray-600 dark:text-gray-400">
                                        {item.name} Ã—{" "}
                                        {item.quantity}
                                      </span>

                                      <span className="font-medium text-gray-800 dark:text-gray-200">
                                        â‚¹
                                        {(
                                          Number(
                                            item.price || 0
                                          ) *
                                          Number(
                                            item.quantity || 0
                                          )
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 dark:border-slate-800">
                  My Wishlist
                </h2>

                {wishlist.length === 0 ? (
                  <p className="text-gray-500">
                    Your wishlist is empty.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((item, index) => (
                      <div
                        key={index}
                        className="border dark:border-slate-800 p-4 rounded-xl flex items-center gap-4 bg-gray-50 dark:bg-slate-800/50"
                      >
                        <span className="text-4xl">
                          {item.emoji || "ðŸ½ï¸"}
                        </span>

                        <div>
                          <h3 className="font-bold text-gray-800 dark:text-white">
                            {item.name}
                          </h3>

                          <p className="text-orange-500 font-semibold">
                            â‚¹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "address" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 dark:border-slate-800">
                  Saved Addresses
                </h2>

                <div className="border dark:border-slate-800 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 flex justify-between items-center">
                  <div>
                    <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded font-bold uppercase">
                      Home
                    </span>

                    <p className="font-semibold text-gray-800 dark:text-white mt-2">
                      {user.address ||
                        "Flat No 402, Sunshine Apartments"}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Hyderabad, Telangana
                    </p>
                  </div>

                  <button className="text-sm text-orange-500 font-semibold hover:underline">
                    Edit
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;


