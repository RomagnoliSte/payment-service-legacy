import { payments } from "../data/payments.js";
import type { Payment } from "../types/payment.js";
import type { PaymentRepositoryInterface } from "./payment-repository.interface.js";

export class PaymentRepository implements PaymentRepositoryInterface {
  save(payment: Payment): void {
    payments.push(payment);
  }

  findAll(): Payment[] {
    return payments;
  }
}
