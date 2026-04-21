import type { Request, Response } from "express";
import { PaymentService } from "../services/payment.service.js";
import { PaymentRepository } from "../repositories/payment.repository.js";
import { PaymentValidatorService } from "../services/payment-validator.service.js";
import { PaymentFeeCalculatorService } from "../services/payment-fee-calculator.service.js";
import { PixPaymentStrategy } from "../strategies/pix-payment.strategy.js";
import { CreditCardPaymentStrategy } from "../strategies/credit-card-payment.strategy.js";
import { BoletoPaymentStrategy } from "../strategies/boleto-payment.strategy.js";

const paymentService = new PaymentService(
  new PaymentRepository(),
  new PaymentValidatorService(),
  new PaymentFeeCalculatorService(),
  {
    pix: new PixPaymentStrategy(),
    credit_card: new CreditCardPaymentStrategy(),
    boleto: new BoletoPaymentStrategy(),
  },
);

export class PaymentController {
  create(request: Request, response: Response) {
    try {
      const payment = paymentService.createPayment(request.body);
      response.status(201).json(payment);
    } catch (error) {
      if (error instanceof Error) {
        response.status(400).json({ message: error.message });
        return;
      }

      response.status(500).json({ message: "Internal server error" });
    }
  }

  list(_request: Request, response: Response) {
    const payments = paymentService.listPayments();
    response.json(payments);
  }
}
