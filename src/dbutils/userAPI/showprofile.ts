
import axios from '@/dbutils/axiosAuth'

export const fetchProfile = async (): Promise<any> => {
  const response = await axios.get(`/public/profile`)
  return response.data;
};
