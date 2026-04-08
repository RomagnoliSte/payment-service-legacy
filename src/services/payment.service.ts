import { PaymentRepository } from "../repositories/payment.repository.js";
import type {
  Payment,
  PaymentMethod,
  PaymentStatus,
} from "../types/payment.js";
import { PaymentFeeCalculatorService } from "./payment-fee-calculator.service.js";
import { PaymentValidatorService } from "./payment-validator.service.js";
import { PixPaymentStrategy } from "../strategies/pix-payment.strategy.js";
import { CreditCardPaymentStrategy } from "../strategies/credit-card-payment.strategy.js";
import { BoletoPaymentStrategy } from "../strategies/boleto-payment.strategy.js";
import type { PaymentProcessorStrategy } from "../strategies/payment-processor.strategy.js";

export class PaymentService {
  private paymentValidator = new PaymentValidatorService();
  private paymentFeeCalculator = new PaymentFeeCalculatorService();
  private paymentRepository = new PaymentRepository();

  private getProcessor(method: PaymentMethod): PaymentProcessorStrategy {
    if (method === "pix") {
      return new PixPaymentStrategy();
    }

    if (method === "credit_card") {
      return new CreditCardPaymentStrategy();
    }

    return new BoletoPaymentStrategy();
  }

  createPayment(data: any): Payment {
    this.paymentValidator.validate(data);

    const fee = this.paymentFeeCalculator.calculate(data.method, data.amount);
    const processor = this.getProcessor(data.method);
    const result = processor.process(data.customerName);

    const payment: Payment = {
      id: crypto.randomUUID(),
      customerName: data.customerName,
      amount: data.amount,
      method: data.method,
      status: result.status as PaymentStatus,
      fee,
      createdAt: new Date(),
    };

    this.paymentRepository.save(payment);

    console.log("Pagamento salvo com sucesso");

    return payment;
  }

  listPayments(): Payment[] {
    return this.paymentRepository.findAll();
  }
}
