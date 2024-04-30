import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import { Authentication, AuthenticationArgs } from '@/domain/usecases';

export class AuthenticationSpy implements Authentication {
  accountModel = mockAccountModel();
  callsCount = 0;
  args?: AuthenticationArgs;

  auth(args: AuthenticationArgs): Promise<AccountModel> {
    this.args = args;
    this.callsCount++;
    return Promise.resolve(this.accountModel);
  }
}
