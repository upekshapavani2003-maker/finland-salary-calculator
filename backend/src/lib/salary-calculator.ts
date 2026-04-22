import { SalaryInput, SalaryBreakdown } from '@/types/salary';

export class SalaryCalculator {
  static calculate(input: SalaryInput): SalaryBreakdown {
    const {
      grossSalary,
      taxRate,
      socialSecurity,
      pensionContribution,
      otherDeductions
    } = input;

    // Calculate individual deduction amounts
    const taxAmount = grossSalary * (taxRate / 100);
    const socialSecurityAmount = grossSalary * (socialSecurity / 100);
    const pensionAmount = grossSalary * (pensionContribution / 100);
    const otherDeductionsAmount = otherDeductions;

    // Calculate total deductions and net salary
    const totalDeductions = taxAmount + socialSecurityAmount + pensionAmount + otherDeductionsAmount;
    const netSalary = grossSalary - totalDeductions;

    // Calculate effective tax rate (total deductions as percentage of gross salary)
    const effectiveTaxRate = grossSalary > 0 ? (totalDeductions / grossSalary) * 100 : 0;

    return {
      grossSalary: Math.round(grossSalary * 100) / 100,
      taxAmount: Math.round(taxAmount * 100) / 100,
      socialSecurityAmount: Math.round(socialSecurityAmount * 100) / 100,
      pensionAmount: Math.round(pensionAmount * 100) / 100,
      otherDeductionsAmount: Math.round(otherDeductionsAmount * 100) / 100,
      totalDeductions: Math.round(totalDeductions * 100) / 100,
      netSalary: Math.round(netSalary * 100) / 100,
      effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100
    };
  }

  static validateInput(input: SalaryInput): string[] {
    const errors: string[] = [];

    if (input.grossSalary <= 0) {
      errors.push('Gross salary must be greater than 0');
    }

    if (input.taxRate < 0 || input.taxRate > 100) {
      errors.push('Tax rate must be between 0 and 100');
    }

    if (input.socialSecurity < 0 || input.socialSecurity > 100) {
      errors.push('Social security rate must be between 0 and 100');
    }

    if (input.pensionContribution < 0 || input.pensionContribution > 100) {
      errors.push('Pension contribution rate must be between 0 and 100');
    }

    if (input.otherDeductions < 0) {
      errors.push('Other deductions must be greater than or equal to 0');
    }

    return errors;
  }
}
