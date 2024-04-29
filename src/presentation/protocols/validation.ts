export interface Validation<TInput = unknown> {
  validate(input: TInput): string;
}
