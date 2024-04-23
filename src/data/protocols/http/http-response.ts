export enum HttpStatusCode {
  noContent = 204,
  unauthorized = 401,
}

export type HttpResponse<TBody = unknown> = {
  statusCode: HttpStatusCode;
  body?: TBody;
};
