import type {
  PaymentProcessorStrategy,
  PaymentProcessResult,
} from "./payment-processor.strategy.js";

export class CreditCardPaymentStrategy implements PaymentProcessorStrategy {
  process(customerName: string): PaymentProcessResult {
    console.log("Processando pagamento via cartão...");
    console.log(`Enviando confirmação para ${customerName}`);

    return {
      status: "approved",
      message: "Pagamento via cartão processado com sucesso",
    };
  }
}
