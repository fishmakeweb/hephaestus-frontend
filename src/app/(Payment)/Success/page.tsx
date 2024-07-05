import React from "react";
import styles from "@/app/(Payment)/Success/PaymentSuccess.module.css";
import Link from "next/link";

const PaymentSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
        <div className="flex justify-center mb-4">
          <div className={styles["success-checkmark"]}>
            <div className={styles["check-icon"]}>
              <span className={`${styles["icon-line"]} ${styles["line-tip"]}`}></span>
              <span className={`${styles["icon-line"]} ${styles["line-long"]}`}></span>
              <div className={styles["icon-circle"]}></div>
              <div className={styles["icon-fix"]}></div>
            </div>
          </div>
        </div>
        <div className="text-2xl font-bold text-green-600 mb-4">Payment Success!</div>
        <div className="text-xl text-black mb-8">Thank you for your purchase!</div>
        <div className="items-center">
          <Link href="/" className="bg-black text-white py-4 px-6 rounded hover:bg-gray-900 focus:outline-none">
            Go Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
