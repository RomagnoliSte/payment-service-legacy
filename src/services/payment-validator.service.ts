export class PaymentValidatorService {
  validate(data: any): void {
    if (!data.customerName) {
      throw new Error("Nome do cliente é obrigatório");
    }

    if (!data.amount || data.amount <= 0) {
      throw new Error("O valor deve ser maior que zero");
    }

    if (!data.method) {
      throw new Error("Método de pagamento é obrigatório");
    }

    if (data.method === "pix") {
      if (!data.pixKey) {
        throw new Error("Chave PIX é obrigatória");
      }
    }

    if (data.method === "credit_card") {
      if (!data.cardNumber || !data.cardHolder || !data.cvv) {
        throw new Error("Os dados do cartão são obrigatórios");
      }
    }

    if (data.method === "boleto") {
      if (!data.cpf) {
        throw new Error("CPF é obrigatório para boleto");
      }
    }

    const validMethods = ["pix", "credit_card", "boleto"];

    if (!validMethods.includes(data.method)) {
      throw new Error("Método de pagamento inválido");
    }
  }
}
