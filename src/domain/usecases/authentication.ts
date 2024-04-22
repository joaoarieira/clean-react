import { AccountModel } from '../models/account-model';

type AuthenticationArgs = {
  email: string;
  password: string;
};

export interface Authentication {
  auth(args: AuthenticationArgs): Promise<AccountModel>;
}
