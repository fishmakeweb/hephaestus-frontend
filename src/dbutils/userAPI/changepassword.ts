import axios from "@/dbutils/axiosAuth";

const getToken = () => sessionStorage.getItem("token");

export const checkAndChangePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const payload = {
    oldPassword,
    newPassword,
  };

  try {
    const response = await axios.put("/customer/update-password", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
