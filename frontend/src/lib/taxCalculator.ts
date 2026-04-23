export interface TaxBreakdown {
  grossMonthly: number;
  annualIncome: number;
  pension: number;
  unemployment: number;
  stateTaxMonthly: number;
  municipalTax: number;
  churchTax: number;
  totalTax: number;
  netSalary: number;
}

export function calculateTax(grossMonthly: number, municipalityRate: number, churchMember: boolean): TaxBreakdown {
  // Handle edge cases
  if (grossMonthly <= 0) {
    return {
      grossMonthly: 0,
      annualIncome: 0,
      pension: 0,
      unemployment: 0,
      stateTaxMonthly: 0,
      municipalTax: 0,
      churchTax: 0,
      totalTax: 0,
      netSalary: 0
    };
  }

  // Step 1: Calculate annual income
  const annualIncome = grossMonthly * 12;

  // Step 2: Employee Contributions (deducted from monthly gross)
  const pension = Math.round(grossMonthly * 0.0715);
  const unemployment = Math.round(grossMonthly * 0.015);

  // Step 3: State Income Tax (progressive on annual income)
  let stateTaxAnnual = 0;
  const brackets = [
    { min: 0, max: 20000, rate: 0 },
    { min: 20001, max: 30000, rate: 0.06 },
    { min: 30001, max: 50000, rate: 0.17 },
    { min: 50001, max: 80000, rate: 0.21 },
    { min: 80001, max: Infinity, rate: 0.31 }
  ];

  for (const bracket of brackets) {
    if (annualIncome > bracket.min) {
      const taxableInBracket = Math.min(annualIncome, bracket.max) - bracket.min;
      stateTaxAnnual += taxableInBracket * bracket.rate;
    }
  }

  const stateTaxMonthly = Math.round(stateTaxAnnual / 12);

  // Step 4: Municipal Tax
  const municipalTax = Math.round(grossMonthly * (municipalityRate / 100));

  // Step 5: Church Tax
  const churchTax = churchMember ? Math.round(grossMonthly * 0.01) : 0;

  // Step 6: Total Tax and Net Salary
  const totalTax = stateTaxMonthly + municipalTax + pension + unemployment + churchTax;
  const netSalary = Math.round(grossMonthly - totalTax);

  return {
    grossMonthly,
    annualIncome,
    pension,
    unemployment,
    stateTaxMonthly,
    municipalTax,
    churchTax,
    totalTax,
    netSalary
  };
}
