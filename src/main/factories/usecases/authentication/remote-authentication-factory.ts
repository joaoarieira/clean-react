import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { Authentication } from '@/domain/usecases';
import { makeApiUrl } from '@/main/factories/http/api-url-factory';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient());
};
