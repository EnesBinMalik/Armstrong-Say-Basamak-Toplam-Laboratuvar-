export interface DigitStep {
  stepIndex: number;
  remainingNumberBefore: number;
  digit: number;
  power?: number;
  powerResult?: number;
  runningTotalBefore: number;
  runningTotalAfter: number;
  remainingNumberAfter: number;
  explanation: string;
}

export interface DigitSumResult {
  originalNumber: number;
  isNegative: boolean;
  digits: number[];
  digitCount: number;
  sum: number;
  formula: string;
  steps: DigitStep[];
}

export interface ArmstrongResult {
  originalNumber: number;
  digits: number[];
  digitCount: number;
  powerResults: {
    digit: number;
    power: number;
    result: number;
  }[];
  totalSum: number;
  isArmstrong: boolean;
  formula: string;
  steps: DigitStep[];
  difference: number;
}

export interface SimulationStep {
  lineId: number;
  label: string;
  codeSnippet: string;
  variables: {
    number: number;
    tempNumber: number;
    basNumber: number;
    basValue: number | null;
    basPow?: number | null;
    result: number;
    iteration?: number;
  };
  explanation: string;
}

export type ActiveTab = 'homework' | 'armstrong' | 'simulator' | 'catalog' | 'code';
