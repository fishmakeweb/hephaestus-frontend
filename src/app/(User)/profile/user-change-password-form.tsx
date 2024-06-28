// components/ChangePdbutils/axios';ord.tsx
import React, { useState, useEffect } from 'react';
import { changePassword } from '@/dbutils/userAPI/changepassword';

interface Profile {
  customer: {
    userId: string;
    password?: string;
  };
}

interface ChangePasswordProps {
  onClose: () => void;
  profile: Profile | null;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onClose, profile }) => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (profile && profile.customer && profile.customer.password) {
      setPassword(profile.customer.password);
    }
  }, [profile]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      if (profile && profile.customer) {
        await changePassword({ userId: profile.customer.userId, password });
        onClose();
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-6">
          <div>Change Password</div>
        </div>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="password" className="block font-medium">New Password *</label>
            <input
              id="password"
              type="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block font-medium">Confirm New Password *</label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordError && <span className="text-red-500 mt-1">{passwordError}</span>}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button onClick={onClose} className="px-6 py-2 font-semibold text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 font-semibold text-white bg-black rounded-lg" disabled={loading}>
              {loading ? 'Changing...' : 'Change'}
            </button>
          </div>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
}

export default ChangePassword;
