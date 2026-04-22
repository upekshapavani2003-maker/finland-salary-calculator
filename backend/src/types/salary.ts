export interface SalaryInput {
  grossSalary: number;
  taxRate: number;
  socialSecurity: number;
  pensionContribution: number;
  otherDeductions: number;
}

export interface SalaryBreakdown {
  grossSalary: number;
  taxAmount: number;
  socialSecurityAmount: number;
  pensionAmount: number;
  otherDeductionsAmount: number;
  totalDeductions: number;
  netSalary: number;
  effectiveTaxRate: number;
}

export interface SalaryCalculationResponse {
  success: boolean;
  data?: SalaryBreakdown;
  error?: string;
}
