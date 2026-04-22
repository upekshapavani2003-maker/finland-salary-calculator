import { SalaryInput, SalaryCalculationResponse } from '@/types/salary';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const salaryApi = {
  async calculateSalary(input: SalaryInput): Promise<SalaryCalculationResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/salary/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
};
