import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-5xl mb-4">🎉</h1>

        <h2 className="text-3xl font-bold text-green-600">
          Order Placed Successfully!
        </h2>

        <p className="mt-4 text-gray-600">
          Thank you for ordering from FoodieHub.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default OrderSuccess;
