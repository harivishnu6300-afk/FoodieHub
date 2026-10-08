import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cartItems, setCartItems, loggedInUser }) {
  const navigate = useNavigate();

  const [name, setName] = useState(loggedInUser?.name || "");
  const [phone, setPhone] = useState(loggedInUser?.phone || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [payment, setPayment] = useState("UPI");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [placingOrder, setPlacingOrder] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * (item.quantity || 1),
    0
  );

  const delivery = subtotal > 0 ? 40 : 0;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal - discount + delivery + gst;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      setDiscount(Math.round(subtotal * 0.1));
      alert("Coupon Applied ðŸŽ‰");
    } else {
      setDiscount(0);
      alert("Invalid Coupon");
    }
  };

  const placeOrder = async () => {
    if (!loggedInUser) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (!cartItems.length) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    if (!name || !phone || !address || !city || !pincode) {
      alert("Please fill all details.");
      return;
    }

    try {
      setPlacingOrder(true);

      const response = await fetch(
        `https://foodiehub-backend-uuax.onrender.com/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: loggedInUser.id,
            email: loggedInUser.email,
            name,
            phone,
            address,
            city,
            pincode,
            payment,
            coupon,
            items: cartItems.map((item) => ({
              id: item.id,
              quantity: item.quantity || 1,
            })),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to place order"
        );
      }

      setCartItems([]);

      const userId =
        loggedInUser.id || loggedInUser.email;

      localStorage.removeItem(`cartItems_${userId}`);

      alert(
        `Order #${data.order.id} placed successfully ðŸŽ‰`
      );

      navigate("/order-history");
    } catch (error) {
      console.error("Order placement error:", error);
      alert(error.message || "Unable to place order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-24 transition duration-500 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
          <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h1>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 w-full rounded-xl border bg-white p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mb-4 w-full rounded-xl border bg-white p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />

          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mb-4 h-28 w-full rounded-xl border bg-white p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mb-4 w-full rounded-xl border bg-white p-3 dark:border-slate-700 dark:bg-slate-700 dark:text-white"
          />

          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="mb-4 w-full rounded-xl border bg-white p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />

          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="mb-4 w-full rounded-xl border bg-white p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          >
            <option>UPI</option>
            <option>Cash on Delivery</option>
            <option>Credit Card</option>
          </select>

          <div className="mb-6 flex gap-3">
            <input
              type="text"
              placeholder="Coupon Code (e.g. SAVE10)"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 rounded-xl border bg-white p-3 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />

            <button
              onClick={applyCoupon}
              className="rounded-xl bg-green-500 px-5 font-semibold text-white hover:bg-green-600"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="h-fit rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            Order Summary
          </h2>

          <div className="space-y-3 text-lg">
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Subtotal</span>
              <span>â‚¹{subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Delivery</span>
              <span>â‚¹{delivery}</span>
            </div>

            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>GST (5%)</span>
              <span>â‚¹{gst}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between font-semibold text-green-500">
                <span>Discount</span>
                <span>-â‚¹{discount}</span>
              </div>
            )}

            <hr className="my-4 dark:border-slate-600" />

            <div className="flex justify-between text-2xl font-bold text-orange-500">
              <span>Total</span>
              <span>â‚¹{total}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={placingOrder}
            className={`mt-8 w-full rounded-xl py-4 text-lg font-bold text-white shadow-lg transition ${
              placingOrder
                ? "cursor-not-allowed bg-gray-400"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {placingOrder
              ? "Placing Order..."
              : "Place Order ðŸš€"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Checkout;


