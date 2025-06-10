// components/PaymentSuccess.jsx
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react"; // Optional: use `react-icons` or an image

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 text-center">
      <CheckCircle2 className="text-green-600 w-20 h-20 mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-600 text-base md:text-lg mb-6 max-w-md">
        Your order has been placed successfully. A confirmation email will be sent shortly.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          to="/order"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
        >
          View My Orders
        </Link>
        <Link
          to="/order"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded shadow"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
