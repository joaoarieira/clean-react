export interface Validation {
  validate(fieldName: string, fieldValue: unknown): string | undefined;
}
