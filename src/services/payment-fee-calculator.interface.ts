import type { PaymentMethod } from "../types/payment.js";

export interface PaymentFeeCalculatorInterface {
  calculate(method: PaymentMethod, amount: number): number;
}
