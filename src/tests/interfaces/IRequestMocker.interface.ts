/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import httpNock from 'nock';
import { ParsedUrlQuery } from 'querystring';

export type NockMethodsType = 'get' | 'post' | 'put' | 'delete';

export interface IMockAPIConfig {
  baseUrl: string;
  apiName: string;
}

export interface IRequestMockOptions {
  persist?: boolean;
  times?: number;
  status?: number;
  matchHeader?: string[];
  method: NockMethodsType;
  path: string;
  headers?: Record<string, httpNock.RequestHeaderMatcher>;
  query?: ParsedUrlQuery;
  body?: unknown;
  response?: unknown;
}

export interface INockAPI {
  [key: string]: IRequestMockOptions;
}

export interface IRequestMocker {
  createMocks: (mockConfig: IMockAPIConfig | IMockAPIConfig[]) => void;
  clearMocks: () => void;
}
