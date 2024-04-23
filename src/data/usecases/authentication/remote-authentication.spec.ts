import { mockAuthentication } from '@/domain/test/mock-authentication';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { faker } from '@faker-js/faker';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return { httpPostClientSpy, sut };
};

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const authenticationArgs = mockAuthentication();
    const { httpPostClientSpy, sut } = makeSut(url);
    await sut.auth(authenticationArgs);
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('should call HttpPostClient with correct body', async () => {
    const authenticationArgs = mockAuthentication();
    const { httpPostClientSpy, sut } = makeSut();
    await sut.auth(authenticationArgs);
    expect(httpPostClientSpy.body).toEqual(authenticationArgs);
  });

  test('sould throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.unauthorized };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});
