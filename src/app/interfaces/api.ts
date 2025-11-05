import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface ApiResponse<T> {
  message?: string | null;
  data?: T | null;
}

export interface HttpReturningResponse<T> {
  headers?:
    | HttpHeaders
    | {
    [header: string]: string | string[];
  };
  observe: 'response';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseType?: any; // TODO
  withCredentials?: boolean;
  transferCache?:
    | {
    includeHeaders?: string[];
  }
    | boolean;
  body?: T | null;
}
