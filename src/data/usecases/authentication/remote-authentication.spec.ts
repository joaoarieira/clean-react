import { mockAuthentication } from '../../../domain/test/mock-authentication';
import { HttpPostClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';
import { faker } from '@faker-js/faker';

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
});
