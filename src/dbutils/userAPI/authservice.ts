import axios from '@/dbutils/axios';
class AuthService {
  static isAuthenticated() {
    try {
      const token = sessionStorage.getItem("token");
      return !!token;
    } catch (error) {
    }

  }
  static async getProfile(token: string) {
    try {
      const response = await axios.get(`/public/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  

  static isCustomer() {
    const role = sessionStorage.getItem("role");
    return role === "CUSTOMER";
  }
  static getUserName() {
    const username = sessionStorage.getItem("username");
    return username ? username : null;
  }
  static async loginUser(username: string, password: string) {
    try {
      const response = await axios.post('/auth/login', {
        username,
        password
      });
      const token = response.data.token;
      if (token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("username",username);
      }
      window.location.href = "/";
      return response.data.token;
    } catch (error) {
      console.error('Failed to login', error);
      throw error;
    }
  }

  



  static logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("user");
  }
  static async registerCustomer(userData: any): Promise<any> {

    try {
      const response = await axios.post(
        `/auth/register/customer`,
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export default AuthService;
