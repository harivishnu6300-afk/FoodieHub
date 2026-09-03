import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [payment, setPayment] = useState("UPI");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const delivery = subtotal > 0 ? 40 : 0;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal - discount + delivery + gst;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      setDiscount(Math.round(subtotal * 0.1));
      alert("Coupon Applied 🎉");
    } else {
      setDiscount(0);
      alert("Invalid Coupon");
    }
  };

  const placeOrder = () => {
    if (!name || !phone || !address || !city || !pincode) {
      alert("Please fill all details");
      return;
    }

    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      customer: name,
      phone,
      address,
      city,
      pincode,
      payment,
      items: cartItems,
      total,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("orders", JSON.stringify([...oldOrders, newOrder]));

    setCartItems([]);
    localStorage.removeItem("cartItems");

    alert("Order Placed Successfully 🎉");
    navigate("/success");
  };

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-slate-950 py-24 transition duration-500">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Checkout
          </h1>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white p-3 rounded-lg mb-4"
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white p-3 rounded-lg mb-4"
          />

          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white p-3 rounded-lg mb-4 h-28"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white p-3 rounded-lg mb-4"
          />

          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white p-3 rounded-lg mb-4"
          />

          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white p-3 rounded-lg mb-4"
          >
            <option>UPI</option>
            <option>Cash on Delivery</option>
            <option>Credit Card</option>
          </select>

          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 border dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white p-3 rounded-lg"
            />

            <button
              onClick={applyCoupon}
              className="bg-green-500 text-white px-5 rounded-lg hover:bg-green-600"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg h-fit">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Order Summary
          </h2>

          <div className="space-y-3 text-lg">
            <div className="flex justify-between dark:text-white">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between dark:text-white">
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>

            <div className="flex justify-between dark:text-white">
              <span>GST</span>
              <span>₹{gst}</span>
            </div>

            <div className="flex justify-between text-green-500">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>

            <hr className="my-4 dark:border-slate-600" />

            <div className="flex justify-between text-2xl font-bold text-orange-500">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-bold transition"
          >
            Place Order 🚀
          </button>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
