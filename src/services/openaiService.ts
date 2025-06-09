import { API_BASE_URL } from '../config/constants';

class OpenAIService {
  private baseUrl = `${API_BASE_URL}/business-plan`;

  async generateBusinessPlan(name: string, industry: string, description: string): Promise<{ url: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, industry, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate business plan');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export const openaiService = new OpenAIService();