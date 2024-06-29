"use client";
import ConfirmOrderForm from "./order-confirm-form";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react"

export default function OrderConfirmPage() {
  const searchParams = useSearchParams();
  const itemDetails = searchParams.get('itemDetails');
  const totalAmount = searchParams.get('totalAmount');
  const token = searchParams.get('token');

  if (!itemDetails || !totalAmount || !token) {
    return <div>Nothing here</div>;
  }

  const parsedItemDetails = JSON.parse(itemDetails);
  const parsedTotalAmount = parseFloat(totalAmount);

  return (
    <div className="bg-white">
      <ConfirmOrderForm itemDetails={parsedItemDetails} totalAmount={parsedTotalAmount} token={token} />
    </div>
  );
}
