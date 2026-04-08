import type {
  PaymentProcessorStrategy,
  PaymentProcessResult,
} from "./payment-processor.strategy.js";

export class BoletoPaymentStrategy implements PaymentProcessorStrategy {
  process(customerName: string): PaymentProcessResult {
    console.log("Gerando boleto...");
    console.log(`Enviando boleto para ${customerName}`);

    return {
      status: "approved",
      message: "Boleto gerado com sucesso",
    };
  }
}
