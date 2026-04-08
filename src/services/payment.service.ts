import { PaymentRepository } from "../repositories/payment.repository.js";
import type { Payment } from "../types/payment.js";
import { PaymentFeeCalculatorService } from "./payment-fee-calculator.service.js";
import { PaymentValidatorService } from "./payment-validator.service.js";

export class PaymentService {
  private paymentValidator = new PaymentValidatorService();
  private paymentFeeCalculator = new PaymentFeeCalculatorService();
  private paymentRepository = new PaymentRepository();

  createPayment(data: any): Payment {
    this.paymentValidator.validate(data);

    const fee = this.paymentFeeCalculator.calculate(data.method, data.amount);

    let status: "pending" | "approved" | "failed" = "pending";

    if (data.method === "pix") {
      status = "approved";
      console.log("Processando pagamento via PIX...");
      console.log(`Enviando confirmação para ${data.customerName}`);
    } else if (data.method === "credit_card") {
      status = "approved";
      console.log("Processando pagamento via cartão...");
      console.log(`Enviando confirmação para ${data.customerName}`);
    } else if (data.method === "boleto") {
      status = "pending";
      console.log("Gerando boleto...");
      console.log(`Enviando boleto para ${data.customerName}`);
    }

    const payment: Payment = {
      id: crypto.randomUUID(),
      customerName: data.customerName,
      amount: data.amount,
      method: data.method,
      status,
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
