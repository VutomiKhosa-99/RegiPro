import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/constants';

interface Business {
  id: string;
  name: string;
  industry: string;
  description: string;
  isRegistered: string;
  hasBusinessPlan: string;
  businessPlanUrl?: string;
}

class BusinessService {
  private baseUrl = `${API_BASE_URL}/responses`;

  private async getAuthHeaders() {
    const token = await AsyncStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      'x-access-token': token || '',
    };
  }

  async getBusinesses(): Promise<Business[]> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch businesses');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getBusinessById(id: string): Promise<Business> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch business');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createBusiness(businessData: Omit<Business, 'id'>): Promise<Business> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(businessData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create business');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      throw error;
    }
  }
}

export const businessService = new BusinessService();