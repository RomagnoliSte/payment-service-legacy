import { payments } from "../data/payments";
import { Payment } from "../types/payment";

export class PaymentService {
  createPayment(data: any): Payment {
    if (!data.customerName) {
      throw new Error("Nome do cliente é obrigatório");
    }

    if (!data.amount || data.amount <= 0) {
      throw new Error("O valor deve ser maior que zero");
    }

    let fee = 0;
    let status: "pending" | "approved" | "failed" = "pending";

    if (data.method === "pix") {
      if (!data.pixKey) {
        throw new Error("Chave PIX é obrigatória");
      }

      fee = data.amount * 0.01;
      status = "approved";
      console.log("Processando pagamento via PIX...");
      console.log(`Enviando confirmação para ${data.customerName}`);
    } else if (data.method === "credit_card") {
      if (!data.cardNumber || !data.cardHolder || !data.cvv) {
        throw new Error("Necerrário preencher todos os dados do cartão");
      }

      fee = data.amount * 0.05;
      status = "approved";
      console.log("Processando pagamento via Cartão de Crédito...");
      console.log(`Enviando confirmação para ${data.customerName}`);
    } else if (data.method === "boleto") {
      if (!data.cpf) {
        throw new Error("Necessário CPF para gerar boleto");
      }

      fee = 2;
      status = "pending";
      console.log("Gerando boleto...");
      console.log(`Enviando boleto para ${data.customerName}`);
    } else {
      throw new Error("Método de pagamento inválido");
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

    payments.push(payment);

    console.log("Pagamento registrado com sucesso!");

    return payment;
  }

  listPayments(): Payment[] {
    return payments;
  }
}
