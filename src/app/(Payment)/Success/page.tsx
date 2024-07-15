'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AuthService from '@/dbutils/userAPI/authservice';
import styles from '@/app/(Payment)/Success/PaymentSuccess.module.css';
import Link from 'next/link';
import { successCheckOut } from '@/dbutils/cartAPI/cartFunction';
const PaymentSuccess: React.FC = () => {
  const searchParams = useSearchParams();  // Updated destructuring to also get readiness state
  const [token, setToken] = useState<string | null>('');

  useEffect(() => {
    setToken(searchParams.get('payToken'));
    if (token) {  // Check if searchParams are ready

        successCheckOut(token)
          .then(result => {
            console.log('Checkout success:', result);
          })
          .catch(error => {
            console.error('Error in processing checkout:', error);
          });
    }
  }, [token]);  // React to changes in searchParams and their readiness

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
        <Link href="/" className="bg-black text-white py-4 px-6 rounded hover:bg-gray-900 focus:outline-none">
          Go Back to Store
        </Link>
      </div>
    </div>
  );
};

const WrappedPaymentSuccess = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PaymentSuccess />
  </Suspense>
);

export default WrappedPaymentSuccess;
