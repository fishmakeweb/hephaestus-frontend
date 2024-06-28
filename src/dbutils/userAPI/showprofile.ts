// utils/showProfile.ts

import AuthService from '@/dbutils/userAPI/authservice';

export const fetchProfile = async (): Promise<any> => {
  try {
    const token = sessionStorage.getItem('token');
    if (token) {
      const data = await AuthService.getProfile(token);
      return data;
    } else {
      console.error('No token found');
      throw new Error('No token found');
    }
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('Failed to fetch profile');
  }
};
