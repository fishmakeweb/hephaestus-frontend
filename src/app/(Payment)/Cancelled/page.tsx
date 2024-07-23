import React from "react";
import  Link  from "next/link";

const PaymentCanceled: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
        <div className="flex justify-center mb-4">
          <img 
            src="https://cdn1.iconfinder.com/data/icons/ui-navigation-1/152/close-256.png" 
            alt="cancelled"
          />
        </div>
        <div className="text-2xl font-bold text-red-600 mb-10">Hủy thanh toán!</div>
        <div className="items-center">
          <Link href="/" className="bg-black text-white py-4 px-6 rounded hover:bg-gray-900 focus:outline-none">
            Quay lại cửa hàng
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentCanceled;
