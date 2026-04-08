import { payments } from "../data/payments.js";
import type { Payment } from "../types/payment.js";

export class PaymentRepository {
  save(payment: Payment): void {
    payments.push(payment);
  }

  findAll(): Payment[] {
    return payments;
  }
}
