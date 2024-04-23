import { AuthenticationArgs } from '@/domain/usecases/authentication';
import { HttpPostClient } from '@/data/protocols/http/http-post-client';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { AccountModel } from '@/domain/models/account-model';

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
      body: args,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        break;
      }
      case HttpStatusCode.unauthorized: {
        throw new InvalidCredentialsError();
      }
      default:
        throw new UnexpectedError();
    }

    return httpResponse.body!;
  }
}
