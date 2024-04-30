import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import { Authentication, AuthenticationArgs } from '@/domain/usecases';

export class AuthenticationSpy implements Authentication {
  accountModel = mockAccountModel();
  args?: AuthenticationArgs;

  auth(args: AuthenticationArgs): Promise<AccountModel> {
    this.args = args;
    return Promise.resolve(this.accountModel);
  }
}
