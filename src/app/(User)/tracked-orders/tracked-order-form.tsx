import React, { useState, useEffect } from 'react';
import { OrderDetail } from '@/dbutils/userAPI/order';
import { Profile } from '@/app/(User)/profile/user-profile-show';
import { fetchProfile } from '@/dbutils/userAPI/showprofile';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SelectedOrderFormProps {
    selectedOrderDetail: OrderDetail[] | null;
}

const SelectedOrderForm: React.FC<SelectedOrderFormProps> = ({ selectedOrderDetail }) => {
    const [formData, setFormData] = useState<OrderDetail[] | null>(null);
    const [userData, setUserData] = useState<Profile | null>(null);

    const getProfile = async () => {
        try {
            const data = await fetchProfile();
            console.log('Fetched profile data:', data);
            setUserData(data);
        } catch (error) {
            console.error(error);
        }
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
            <ScrollArea className="max-h-[500px] lg:max-h-[615px] overflow-y-auto w-full">
                <div className="bg-white py-3 px-3 rounded-lg mb-8 flex flex-col items-center justify-center w-full font-nunito text-slate-600">
                    <section className="max-w-full lg:max-w-[720px] w-full mx-4">
                        <div className="flex justify-between items-center">
                            <h1 className="my-2 text-xl font-semibold sm:text-2xl">Order Review</h1>
                            <button className="mt-2 bg-gray-800 hover:bg-black text-white font-bold py-1 px-3 rounded ml-auto">
                                Create an order ticket
                            </button>
                        </div>
                        <div className="w-full mt-3 mb-3">
                            <h2 className="text-lg font-bold my-2">Customer Information</h2>
                            <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                <div className="w-full">
                                    <dl className="text-black divide-y divide-gray-200">
                                        <div className="flex flex-col py-2">
                                            <dt className="mb-1 text-gray-500 text-md">Full Name</dt>
                                            <dd className="text-md font-medium text-gray-900">{userData?.customer.fullName}</dd>
                                        </div>
                                        <div className="flex flex-col pt-2">
                                            <dt className="mb-1 text-gray-500 text-md">Email</dt>
                                            <dd className="text-md font-medium text-gray-900">{userData?.customer.email}</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="w-full">
                                    <dl className="text-black divide-y divide-gray-200">
                                        <div className="flex flex-col py-2">
                                            <dt className="mb-1 text-gray-500 text-md">Address</dt>
                                            <dd className="text-md font-medium text-gray-900">{userData?.customer.address}</dd>
                                        </div>
                                        <div className="flex flex-col pt-2">
                                            <dt className="mb-1 text-gray-500 text-md">Registered Date</dt>
                                            <dd className="text-md font-medium text-gray-900">{userData ? new Date(userData.customer.registeredDate).toLocaleDateString() : ''}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mb-3">
                            <h2 className="text-lg font-bold my-2">List of items:</h2>
                            <div className="divide-y divide-gray-200 w-full">
                                {formData.map((detail) => (
                                    <div key={detail.id} className="py-3 flex items-center">
                                        <img
                                            loading="lazy"
                                            src={detail.product.jewelry.img}
                                            alt={detail.product.jewelry.name}
                                            className="w-20 h-20 rounded-md object-cover"
                                        />
                                        <div className="ml-3 flex-grow">
                                            <p className="text-md font-medium text-gray-900">{detail.product.jewelry.name}</p>
                                            <p className="text-sm text-gray-500">Price: ${detail.product.jewelry.price.toFixed(2)}</p>
                                            <p className="text-sm text-gray-500">Quantity: {detail.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full pb-3 mb-2">
                            <div className="flex justify-between items-center">
                                <p className="text-md font-semibold">Total:</p>
                                <p className="text-md font-semibold mr-2">${formData.reduce((total, detail) => total + detail.product.jewelry.price * detail.quantity, 0).toFixed(2)}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </ScrollArea>
        </div>
    );
};

export default SelectedOrderForm;