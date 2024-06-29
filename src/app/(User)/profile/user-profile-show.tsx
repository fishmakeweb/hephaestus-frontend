// components/UserProfile.tsx
"use client"
import React, { useState, useEffect } from 'react';
import UpdateUser from './user-profile-update-form';
import ChangePassword from './user-change-password-form';
import { fetchProfile } from '@/dbutils/userAPI/showprofile';

interface Profile {
  customer: {
    userId: string;
    fullName: string;
    email: string;
    address: string;
    username: string;
    registeredDate: string;
  };
}

const UserProfileShow: React.FC = () => {
  const [showUpdateUser, setShowUpdateUser] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchProfile();
        console.log('Fetched profile data:', data); // Debugging
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    getProfile();
  }, []);

  const handleUpdateClick = () => {
    setShowUpdateUser(true);
  };

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
  };

  const handleCloseUpdate = () => {
    setShowUpdateUser(false);
    const getProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    getProfile();
  };

  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  const { fullName, email, address, username, registeredDate } = profile.customer;

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="flex flex-col mt-5">
        <img
          src="https://images.unsplash.com/photo-1607090788189-3f52e15141d2?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="User Cover"
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover"
        />

        <div className="sm:w-4/5 xs:w-11/12 mx-auto flex">
          <h1 className="w-full text-center my-8 sm:mx-4 xs:pl-4 text-gray-800 text-black lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
            USER INFORMATION 
          </h1>
        </div>

        <div className="w-11/12 lg:w-4/5 mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
          <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
            <div className="w-full flex flex-col sm:flex-row gap-2 justify-center">
              <div className="w-full">
                <dl className="text-black divide-y divide-gray-200">
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg">Full Name</dt>
                    <dd className="text-lg font-semibold">{fullName}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg">Username</dt>
                    <dd className="text-lg font-semibold">{username}</dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 md:text-lg">Email</dt>
                    <dd className="text-lg font-semibold">{email}</dd>
                  </div>
                </dl>
              </div>
              <div className="w-full">
                <dl className="text-black divide-y divide-gray-200">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 md:text-lg">Address</dt>
                    <dd className="text-lg font-semibold">{address}</dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 md:text-lg">Registered Date</dt>
                    <dd className="text-lg font-semibold">{registeredDate}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div className="flex justify-start gap-4 mt-4 w-full">
            <button
              onClick={handleUpdateClick}
              className="px-6 py-2 font-semibold text-white bg-black rounded-lg hover:bg-gray-800"
            >
              Update Profile
            </button>
            <button
              onClick={handleChangePasswordClick}
              className="px-6 py-2 font-semibold text-white bg-black rounded-lg hover:bg-gray-800"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {showUpdateUser && (
        <UpdateUser onClose={handleCloseUpdate} profile={profile} />
      )}

      {showChangePassword && (
        <ChangePassword onClose={handleCloseChangePassword} profile={profile} />
      )}
    </section>
  );
};

export default UserProfileShow;
