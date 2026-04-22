import type { Request, Response } from "express";
import { PaymentService } from "../services/payment.service.js";
import { PaymentRepository } from "../repositories/payment.repository.js";
import { PaymentValidatorService } from "../services/payment-validator.service.js";
import { PaymentFeeCalculatorService } from "../services/payment-fee-calculator.service.js";
import { PixPaymentStrategy } from "../strategies/pix-payment.strategy.js";
import { CreditCardPaymentStrategy } from "../strategies/credit-card-payment.strategy.js";
import { BoletoPaymentStrategy } from "../strategies/boleto-payment.strategy.js";
import { AppError } from "../errors/app-error.js";
import { errorResponse, successResponse } from "../helpers/api-response.js";

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
      successResponse(response, payment, 201);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        errorResponse(response, error.message, error.statusCode);
        return;
      }

      errorResponse(response, "Erro interno do servidor", 500);
    }
  }

  list(_request: Request, response: Response): void {
    try {
      const payments = paymentService.listPayments();
      successResponse(response, payments);
    } catch {
      errorResponse(response, "Erro interno do servidor", 500);
    }
  }
}
