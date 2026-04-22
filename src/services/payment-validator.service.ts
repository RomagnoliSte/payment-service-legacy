import { AppError } from "../errors/app-error.js";
import type { PaymentValidatorInterface } from "./payment-validator.interface.js";

export class PaymentValidatorService implements PaymentValidatorInterface {
  validate(data: any): void {
    if (!data.customerName) {
      throw new AppError("Nome do cliente é obrigatório", 400);
    }

    if (!data.amount || data.amount <= 0) {
      throw new AppError("O valor deve ser maior que zero", 400);
    }

    if (!data.method) {
      throw new AppError("Método de pagamento é obrigatório", 400);
    }

    if (data.method === "pix") {
      if (!data.pixKey) {
        throw new AppError("Chave PIX é obrigatória", 400);
      }
    }

    if (data.method === "credit_card") {
      if (!data.cardNumber || !data.cardHolder || !data.cvv) {
        throw new AppError("Os dados do cartão são obrigatórios", 400);
      }
    }

    if (data.method === "boleto") {
      if (!data.cpf) {
        throw new AppError("CPF é obrigatório para boleto", 400);
      }
    }

    const validMethods = ["pix", "credit_card", "boleto"];

    if (!validMethods.includes(data.method)) {
      throw new AppError("Método de pagamento inválido", 400);
    }
  }
}
