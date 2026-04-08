import type { Request, Response } from "express";
import { PaymentService } from "../services/payment.service.js";

const paymentService = new PaymentService();

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
