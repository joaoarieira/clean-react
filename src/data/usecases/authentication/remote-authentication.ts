import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { AuthenticationArgs } from '@/domain/usecases/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationArgs,
      AccountModel
    >,
  ) {}

  async auth(args: AuthenticationArgs): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      data: args,
    });

    switch (httpResponse.status) {
      case HttpStatusCode.ok: {
        break;
      }
      case HttpStatusCode.unauthorized: {
        throw new InvalidCredentialsError();
      }
      default:
        throw new UnexpectedError();
    }

    return httpResponse.data as AccountModel;
  }
}
