"use client";

interface SuccessButtonsProps {
  errorState?: boolean;
}

export default function SuccessButtons({
  errorState = false,
}: SuccessButtonsProps) {
  const handleContinueShopping = () => {
    window.location.href = "/";
  };

  const handleViewOrders = () => {
    window.location.href = "/dashboard";
  };

  if (errorState) {
    return (
      <button
        onClick={handleContinueShopping}
        className="w-full bg-black text-white rounded-full py-3 font-semibold hover:bg-gray-900 transition"
      >
        RETURN HOME
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleContinueShopping}
        className="w-full bg-black text-white rounded-full py-3 font-semibold hover:bg-gray-900 transition"
      >
        CONTINUE SHOPPING
      </button>
      <button
        // onClick={handleViewOrders}
        className="w-full border border-gray-900 text-gray-900 rounded-full py-3 font-semibold hover:bg-gray-100 transition"
      >
        VIEW ORDERS
      </button>
    </div>
  );
}
