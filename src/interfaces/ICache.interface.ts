export interface ICacheClient {
  get: (key: string) => Promise<null | unknown>;
  set: (key: string, value: string) => Promise<unknown>;
}
export interface ICacheOptions {
  db: number;
}
