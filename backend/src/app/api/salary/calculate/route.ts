import { NextRequest, NextResponse } from 'next/server';
import { SalaryCalculator } from '@/lib/salary-calculator';
import { SalaryInput, SalaryCalculationResponse } from '@/types/salary';

export async function POST(request: NextRequest): Promise<NextResponse<SalaryCalculationResponse>> {
  try {
    const body: SalaryInput = await request.json();

    // Validate input
    const validationErrors = SalaryCalculator.validateInput(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: validationErrors.join(', ')
        },
        { status: 400 }
      );
    }

    // Calculate salary
    const result = SalaryCalculator.calculate(body);

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Salary calculation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse<{ message: string }>> {
  return NextResponse.json({
    message: 'Salary calculation API endpoint. Use POST to calculate salary.'
  });
}
