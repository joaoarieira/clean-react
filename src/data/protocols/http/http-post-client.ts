export type HttpPostClientArgs = {
  url: string;
  body?: object;
};

export interface HttpPostClient {
  post(args: HttpPostClientArgs): Promise<void>;
}
