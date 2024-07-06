import axios from '@/dbutils/axios';
class AuthService {
  static isAuthenticated() {
    try {
      const token = sessionStorage.getItem("token");
      return !!token;
    } catch (error) {
      // console.error("Error checking authentication status:", error);
    }

  }
  static async getProfile(token: string) {
    try {
      const response = await axios.get(`/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async checkOut(token: string) {
    try {
      const response = await axios.get(`/orders/checkOut`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.checkoutUrl;
    } catch (error) {
      throw error;
    }
  }

  public static async successCheckOut(payToken: string) {
    try {
      const response = await axios.post('/orders/successCheckOut', { payToken });
      return response.data;
    } catch (error) {
      console.error('Failed to checkout', error);
      throw error;
    }
  }

  static isCustomer() {
    const role = sessionStorage.getItem("role");
    return role === "CUSTOMER";
  }
  static getUserName() {
    const username = sessionStorage.getItem("username");
    return username ? JSON.parse(username) : null;
  }
  static async loginUser(username: string, password: string) {
    try {
      const response = await axios.post('/auth/login', {
        username,
        password
      });
      const { token, refreshToken, staff, customer } = response.data;

      // Save the auth tokens and user information in sessionStorage
      if (token != null) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("refreshToken", refreshToken);
      }
      if (staff) {
        sessionStorage.setItem("role", "STAFF");
        sessionStorage.setItem("user", JSON.stringify(staff));
      } else if (customer) {
        sessionStorage.setItem("role", "CUSTOMER");
        sessionStorage.setItem("user", JSON.stringify(customer));
        sessionStorage.setItem("username", JSON.stringify(customer.username)); // Initialize empty cart for new customers
      }
      return response.data;
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
