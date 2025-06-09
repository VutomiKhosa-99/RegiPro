import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/constants';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  accessToken: string;
}

class AuthService {
  private baseUrl = `${API_BASE_URL}/auth`;

  async login(email: string, password: string): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async register(firstname: string, lastname: string, email: string, password: string): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      
      await fetch(`${this.baseUrl}/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token || '',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/forgotPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send reset email');
      }
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(email: string, password: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/resetPassword`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset failed');
      }
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();