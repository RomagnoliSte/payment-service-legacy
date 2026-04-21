import type { Payment } from "../types/payment.js";

export interface PaymentRepositoryInterface {
  save(payment: Payment): void;
  findAll(): Payment[];
}
