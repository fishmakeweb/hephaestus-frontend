import axios from '@/dbutils/axios';
class AuthService {
    static isAuthenticated() {
        const token = localStorage.getItem("token");
        return !!token;
      }
    
      static isCustomer() {
        const role = localStorage.getItem("role");
        return role === "CUSTOMER";
      }
    static async loginUser(username: string, password: string) {
        try {
            const response = await axios.post('/auth/login', {
                username,
                password
            });
            const { token, refreshToken, staff, customer } = response.data;
    
            // Save the auth tokens and user information in localStorage
            if (token != null) {
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", refreshToken);
              }
              if (staff) {
                localStorage.setItem("role", "STAFF");
                localStorage.setItem("user", JSON.stringify(staff));
              } else if (customer) {
                localStorage.setItem("role", "CUSTOMER");
                localStorage.setItem("user", JSON.stringify(customer));
              }
              return response.data;
        } catch (error) {
            console.error('Failed to login', error);
                throw error; 
        }
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
