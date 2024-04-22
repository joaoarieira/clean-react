export type HttpPostClientArgs = {
  url: string;
};

export interface HttpPostClient {
  post(args: HttpPostClientArgs): Promise<void>;
}
