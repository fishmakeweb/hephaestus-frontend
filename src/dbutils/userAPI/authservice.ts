// import axios from '@/dbutils/axios';
// class AuthService {
//   static isAuthenticated() {
//     try {
//       const token = localStorage.getItem("token");
//       return !!token;
//     } catch (error) {
//       // console.error("Error checking authentication status:", error);
//     }

//   }
//   static async getProfile(token: string) {
//     try {
//       const response = await axios.get(`/public/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static getUserName() {
//     const username = localStorage.getItem("username");
//     return username ? username : null;
//   }

//   static async loginUser(username: string, password: string) {
//     try {
//       const response = await axios.post('/auth/login', {
//         username,
//         password
//       });
//       const token = response.data.token;
//       if (token) {
//         localStorage.setItem("token", token);
//         localStorage.setItem("username",username);
//       }
//       return response.data.token;
//     } catch (error) {
//       console.error('Failed to login', error);
//       throw error;
//     }
//   }

//   static logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//   }
//   static async registerCustomer(userData: any): Promise<any> {

//     try {
//       const response = await axios.post(
//         `/auth/register/customer`,
//         userData
//       );
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// }
// export default AuthService;
import axios from '@/dbutils/axios';

type Listener = () => void;

class AuthService {
  private static listeners: Listener[] = [];

  static subscribe(listener: Listener) {
    AuthService.listeners.push(listener);
  }

  static unsubscribe(listener: Listener) {
    AuthService.listeners = AuthService.listeners.filter(l => l !== listener);
  }

  public static notify() {
    AuthService.listeners.forEach(listener => listener());
  }

  static isAuthenticated() {
    try {
      const token = localStorage.getItem("token");
      return !!token;
    } catch (error) {
      console.error("Error checking authentication status:", error);
      return false;
    }
  }

  static async getProfile() {
    try {
      const response = await axios.get(`/public/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static getUserName() {
    const username = localStorage.getItem("username");
    return username ? username : null;
  }

  static async loginUser(username: string, password: string) {
    try {
      const response = await axios.post('/auth/login', { username, password });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        AuthService.notify();
      }

      return token;
    } catch (error) {
      console.error('Failed to login', error);
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    AuthService.notify();
  }

  static async registerCustomer(userData: any): Promise<any> {
    try {
      const response = await axios.post(`/auth/register/customer`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
