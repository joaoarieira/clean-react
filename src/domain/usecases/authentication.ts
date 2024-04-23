import { AccountModel } from '@/domain/models';

export type AuthenticationArgs = {
  email: string;
  password: string;
};

export interface Authentication {
  auth(args: AuthenticationArgs): Promise<AccountModel>;
}
