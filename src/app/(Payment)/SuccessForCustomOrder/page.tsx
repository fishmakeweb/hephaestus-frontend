'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '@/app/(Payment)/Success/PaymentSuccess.module.css';
import Link from 'next/link';
import { successCheckOutForCustomOrder } from '@/dbutils/cartAPI/cartFunction';

const PaymentSuccessForCustomOrder: React.FC = () => {
  const searchParams = useSearchParams();  // Updated destructuring to also get readiness state
  const [token, setToken] = useState<string | null>('');

  useEffect(() => {
    setToken(searchParams.get('payToken'));
    if (token) {  // Check if searchParams are ready

        successCheckOutForCustomOrder(token)
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
        <div className="text-2xl font-bold text-green-600 mb-4">Thanh toán thành công!</div>
        <div className="text-xl text-black mb-8">Cảm ơn bạn đã chọn sản phẩm của chúng tôi!</div>
        <Link href="/" className="bg-black text-white py-4 px-6 rounded hover:bg-gray-900 focus:outline-none">
          Trở về cửa hàng
        </Link>
      </div>
    </div>
  );
};

const WrappedPaymentSuccess = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PaymentSuccessForCustomOrder />
  </Suspense>
);

export default WrappedPaymentSuccess;
