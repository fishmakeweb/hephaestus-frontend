import React, { useState, useEffect } from "react";
import { Profile } from "@/app/(User)/profile/user-profile-show";
import { fetchProfile } from "@/dbutils/userAPI/showprofile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CustomOrderData } from "@/dbutils/customAPI/customOrder";

interface SelectedOrderFormProps {
  selectedOrderDetail: CustomOrderData | null;
  onCancel: (customOrderId: number) => void;
}

const SelectedCusOrderForm: React.FC<SelectedOrderFormProps> = ({
  selectedOrderDetail,
  onCancel,
}) => {
  const [formData, setFormData] = useState<CustomOrderData | null>(null);
  const [userData, setUserData] = useState<Profile | null>(null);

  const getProfile = async () => {
    try {
      const data = await fetchProfile();
      console.log("Fetched profile data:", data);
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (customOrderId: number) => {
    onCancel(customOrderId);
  };

  useEffect(() => {
    if (selectedOrderDetail) {
      getProfile();
      setFormData(selectedOrderDetail);
    } else {
      setFormData(null);
    }
  }, [selectedOrderDetail]);

  if (!formData) {
    return (
      <div className="flex flex-col h-full mt-10 lg:mt-28 mr-5 lg:mr-28">
        <div className="mb-10 flex flex-col items-center justify-center w-full font-nunito text-slate-600">
          <section className="max-w-full lg:max-w-[968px] w-full mx-4 flex items-center justify-center">
            <p className="text-xl lg:text-2xl font-semibold text-gray-700">
              Select an order to display details
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-4 h-full lg:mt-8 mr-5 lg:mr-28 relative">
      <ScrollArea className="max-h-[500px] lg:max-h-[615px] overflow-auto">
        <div className="bg-white p-6 rounded-lg shadow mt-6 flex flex-col items-center justify-center w-full font-nunito text-gray-800">
          <section className="max-w-full lg:max-w-4xl w-full">
            <div className="mb-5">
              <h1 className="text-2xl font-semibold text-gray-800">
                Order Review
              </h1>
            </div>
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-800">
                Customer Information
              </h2>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <dl className="text-gray-800 divide-y divide-gray-200">
                    <div className="py-2">
                      <dt className="text-sm font-semibold text-gray-600">
                        Full Name
                      </dt>
                      <dd className="mt-1 text-md font-medium">
                        {userData?.customer.fullName}
                      </dd>
                    </div>
                    <div className="py-2">
                      <dt className="text-sm font-semibold text-gray-600">
                        Email
                      </dt>
                      <dd className="mt-1 text-md font-medium">
                        {userData?.customer.email}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <dl className="text-gray-800 divide-y divide-gray-200">
                    <div className="py-2">
                      <dt className="text-sm font-semibold text-gray-600">
                        Address
                      </dt>
                      <dd className="mt-1 text-md font-medium">
                        {userData?.customer.address}
                      </dd>
                    </div>
                    <div className="py-2">
                      <dt className="text-sm font-semibold text-gray-600">
                        Registered Date
                      </dt>
                      <dd className="mt-1 text-md font-medium">
                        {userData?.customer.registeredDate}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-800">
                Custom Jewelry Info
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg shadow divide-y divide-gray-200">
                <div className="py-3 flex flex-wrap items-start gap-4">
                  <div className="flex-grow">
                    <p className="text-md text-black">
                      Category: {formData.customJewelry.category.categoryName}
                    </p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-md text-black">
                      Material: {formData.customJewelry.material.materialName}
                    </p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-md text-black">
                      Shape: {formData.customJewelry.shape.shapeDescription}
                    </p>
                  </div>
                  {formData.customJewelry.diamond !== null && (
                    <div className="flex-grow flex items-center gap-2">
                                        
                      <p className="text-md text-black">
                      Diamond: {formData.customJewelry.diamond.cut.cutDescription}
                      </p>
                    </div>
                  )}
                  <div className="flex-grow">
                    <p className="text-md text-black">
                      Size: {formData.customJewelry.size.sizeNumber}{" "}
                      {formData.customJewelry.size.unit}
                    </p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-md text-black">
                      Price: ${formData.customJewelry.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-md text-black">
                      Your Note: {formData.customJewelry.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => console.log("Checkout")}
                className="bg-black hover:bg-gray-700 transition duration-300 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Checkout
              </button>
              <button
                onClick={() => handleCancel(formData.customOrderId)}
                className="bg-red-500 hover:bg-red-700 transition duration-300 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SelectedCusOrderForm;
