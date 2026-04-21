import type { Payment, PaymentMethod } from "../types/payment.js";
import type { PaymentRepositoryInterface } from "../repositories/payment-repository.interface.js";
import type { PaymentValidatorInterface } from "./payment-validator.interface.js";
import type { PaymentFeeCalculatorInterface } from "./payment-fee-calculator.interface.js";
import type { PaymentProcessorStrategy } from "../strategies/payment-processor.strategy.js";

export class PaymentService {
  constructor(
    private paymentRepository: PaymentRepositoryInterface,
    private paymentValidator: PaymentValidatorInterface,
    private paymentFeeCalculator: PaymentFeeCalculatorInterface,
    private processors: Record<PaymentMethod, PaymentProcessorStrategy>,
  ) {}

  private getProcessor(method: PaymentMethod): PaymentProcessorStrategy {
    const processor = this.processors[method];

    if (!processor) {
      throw new Error("Processador de pagamento não encontrado");
    }

    return processor;
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
      status: result.status,
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
