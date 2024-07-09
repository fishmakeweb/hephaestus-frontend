import React, { useState, useEffect } from 'react';
import { changePassword, checkPassword } from '@/dbutils/userAPI/changepassword';

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
  const [oldPassword, setOldPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [step, setStep] = useState<number>(1); // Step 1: Verify old password, Step 2: Change password

  useEffect(() => {
    if (profile && profile.customer && profile.customer.password) {
      setPassword(profile.customer.password);
    }
  }, [profile]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 500); // Clear error after 0.5 seconds

      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [error]);

  const handleVerifyPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isValid  = await checkPassword(oldPassword);
      if (isValid) {
        setStep(2);
      } else {
        setError('Old password is incorrect.');
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

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      if (profile && profile.customer) {
        await changePassword(password);
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {step === 1 ? (
          <>
            <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-6">
              <div>Verify Old Password</div>
            </div>
            <form onSubmit={handleVerifyPassword} className="space-y-4">
              <div>
                <label htmlFor="oldPassword" className="block font-medium">Old Password *</label>
                <input
                  id="oldPassword"
                  type="password"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button onClick={onClose} className="px-6 py-2 font-semibold text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 font-semibold text-white bg-black rounded-lg" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
              </div>
            </form>
            {error && <div className="text-red-500 mt-4">{error}</div>}
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
