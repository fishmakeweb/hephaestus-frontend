import React, { useState, useEffect } from 'react';
import { checkAndChangePassword } from '@/dbutils/userAPI/changepassword';

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
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 1000); // Clear error after 0.5 seconds

      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [error]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu không khớp');
      return;
    }

    setLoading(true);
    try {
      await checkAndChangePassword(oldPassword, newPassword);
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setError("Mật khẩu cũ không đúng");
      } else {
        setError('Có lỗi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-6">
          <div>Đổi mật khẩu</div>
        </div>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="oldPassword" className="block font-medium">Mật khẩu cũ *</label>
            <input
              id="oldPassword"
              type="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block font-medium">Mật khẩu mới *</label>
            <input
              id="newPassword"
              type="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block font-medium">Nhập lại mật khẩu *</label>
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
              Hủy
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
