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
      const token = response.data.token;
      if (token ) {
        sessionStorage.setItem("token", token);
      }
      window.location.href = "localhost:3000";
      return response.data.token;
    } catch (error) {
      console.error('Failed to login', error);
      throw error;
    }
  }

  static async checkOutCustomOrder(token: string,customOrderId: number) {
    try {
      const response = await axios.get(`/custom-orders/checkOutCustomOrder/${customOrderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.checkoutUrl)
      return response.data.checkoutUrl;
      
    } catch (error) {
      throw error;
    }
  }

  public static async successCheckOutForCustomOrder(payToken: string) {
    try {
      const response = await axios.post('/custom-orders/successCheckOutForCustomOrder', { payToken });
      return response.data;
    } catch (error) {
      console.error('Failed to checkout', error);
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
