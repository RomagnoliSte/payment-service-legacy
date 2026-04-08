export type PaymentProcessResult = {
  status: "approved" | "pending" | "failed";
  message: string;
};

export interface PaymentProcessorStrategy {
  process(customerName: string): PaymentProcessResult;
}
