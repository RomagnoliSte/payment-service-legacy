export interface PaymentValidatorInterface {
  validate(data: unknown): void;
}
