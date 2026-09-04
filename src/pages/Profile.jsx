import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // 1. లాగిన్ అయిన యూజర్‌ని చెక్ చేయడం (loggedInUser లేదా user ఏది ఉన్నా తీసుకునేలా)
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser")) || JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" || savedUser;

    if (!isLoggedIn || !savedUser) {
      navigate("/login");
      return;
    }

    setUser(savedUser);
    setName(savedUser.name || "");
    setPhone(savedUser.phone || savedUser.mobile || "");

    // 2. లోకల్ స్టోరేజ్ నుండి రియల్ ఆర్డర్స్ తెచ్చుకోవడం
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);

    // 3. లోకల్ స్టోరేజ్ నుండి రియల్ విష్‌లిస్ట్ తెచ్చుకోవడం
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, [navigate]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, phone };
    
    // రెండు కీలలోనూ సేవ్ చేస్తున్నాం ఎందుకంటే ఎక్కడ మిస్ అయినా డేటా ఉండాలి
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("isLoggedIn", "true");

    setUser(updatedUser);
    setIsEditing(false);
    alert("Profile updated successfully! 🎉");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Banner Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white text-orange-500 font-bold text-3xl rounded-full flex items-center justify-center shadow-md">
              {user.name ? user.name.charAt(0).toUpperCase() : "👤"}
            </div>
            <div>
              <h1 className="text-2xl font-bold">Hello, {user.name || "Foodie"}! 👋</h1>
              <p className="text-orange-100 text-sm">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-orange-600 font-semibold px-6 py-2.5 rounded-xl shadow hover:bg-orange-50 transition"
          >
            Logout
          </button>
        </div>

        {/* Layout: Sidebar + Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Left Sidebar Navigation */}
          <div className="md:col-span-1 bg-white dark:bg-slate-900 rounded-2xl shadow-md p-4 space-y-2 h-fit border border-gray-100 dark:border-slate-800">
            <button
              onClick={() => setActiveTab("info")}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition flex items-center gap-3 ${
                activeTab === "info"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-800"
              }`}
            >
              👤 Personal Information
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition flex items-center gap-3 ${
                activeTab === "orders"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-800"
              }`}
            >
              📦 My Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition flex items-center gap-3 ${
                activeTab === "wishlist"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-800"
              }`}
            >
              ❤️ My Wishlist ({wishlist.length})
            </button>
            <button
              onClick={() => setActiveTab("address")}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition flex items-center gap-3 ${
                activeTab === "address"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-800"
              }`}
            >
              📍 Saved Addresses
            </button>
          </div>

          {/* Right Content Area */}
          <div className="md:col-span-3 bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100 dark:border-slate-800">
            
            {/* 1. Personal Info Tab */}
            {activeTab === "info" && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-slate-800">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Personal Information</h2>
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
                      <label className="text-xs text-gray-400 block font-semibold">Full Name</label>
                      <p className="text-lg font-medium">{user.name || "Not Added"}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block font-semibold">Email Address</label>
                      <p className="text-lg font-medium">{user.email || "Not Added"}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block font-semibold">Phone Number</label>
                      <p className="text-lg font-medium">{user.phone || user.mobile || "Not Added yet"}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Phone</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border p-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        placeholder="Enter 10-digit mobile number"
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
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* 2. My Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 dark:border-slate-800">My Orders</h2>
                {orders.length === 0 ? (
                  <p className="text-gray-500">No active or past orders found in local storage.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order, index) => (
                      <div key={index} className="border dark:border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 dark:bg-slate-800/50">
                        <div>
                          <span className="text-xs font-bold text-orange-500">{order.id || `ORD00${index+1}`}</span>
                          <h3 className="font-bold text-gray-800 dark:text-white">{order.items || order.name || "Food Item"}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Ordered on: {order.date || "Recent"}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800 dark:text-white">₹{order.total || order.price}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            (order.status === "Delivered") ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {order.status || "Processing"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. My Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 dark:border-slate-800">My Wishlist</h2>
                {wishlist.length === 0 ? (
                  <p className="text-gray-500">Your wishlist is empty.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((item, index) => (
                      <div key={index} className="border dark:border-slate-800 p-4 rounded-xl flex items-center gap-4 bg-gray-50 dark:bg-slate-800/50">
                        <span className="text-4xl">{item.emoji || "🍽️"}</span>
                        <div>
                          <h3 className="font-bold text-gray-800 dark:text-white">{item.name}</h3>
                          <p className="text-orange-500 font-semibold">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. Saved Addresses Tab */}
            {activeTab === "address" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 dark:border-slate-800">Saved Addresses</h2>
                <div className="border dark:border-slate-800 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 flex justify-between items-center">
                  <div>
                    <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded font-bold uppercase">Home</span>
                    <p className="font-semibold text-gray-800 dark:text-white mt-2">{user.address || "Flat No 402, Sunshine Apartments"}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Hyderabad, Telangana</p>
                  </div>
                  <button className="text-sm text-orange-500 font-semibold hover:underline">Edit</button>
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