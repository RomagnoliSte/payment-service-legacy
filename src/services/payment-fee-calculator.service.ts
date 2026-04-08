export class PaymentFeeCalculatorService {
  calculate(method: string, amount: number): number {
    if (method === "pix") {
      return amount * 0.01;
    }

    if (method === "credit_card") {
      return amount * 0.05;
    }

    if (method === "boleto") {
      return 2;
    }

    throw new Error("Método de pagamento inválido");
  }
}
