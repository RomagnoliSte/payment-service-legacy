export type PaymentMethod = "pix" | "credit_card" | "boleto";
export type PaymentStatus = "pending" | "approved" | "failed";

export interface Payment {
  id: string;
  customerName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  fee: number;
  createdAt: Date;
}
