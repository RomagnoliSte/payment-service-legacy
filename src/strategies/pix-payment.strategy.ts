import type {
  PaymentProcessorStrategy,
  PaymentProcessResult,
} from "./payment-processor.strategy.js";

export class PixPaymentStrategy implements PaymentProcessorStrategy {
  process(customerName: string): PaymentProcessResult {
    console.log("Processando pagamento via PIX...");
    console.log(`Enviando confirmação para ${customerName}`);

    return {
      status: "approved",
      message: "Pagamento via PIX processado com sucesso",
    };
  }
}
