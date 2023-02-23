import { InternalServerError } from "./errors/server.error";

export interface IHttpResponse {
  statusCode: number;
  data?: any;
  error?: Error;
}

export interface IHttpRequest<Body = any> {
  body?: Body;
  params?: any;
  query?: any;
}

export const OK = (data: any): IHttpResponse => ({
  statusCode: 200,
  data,
});

export const Created = (data: any): IHttpResponse => ({
  statusCode: 201,
  data,
});

export const BadRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  error: {
    name: error.name,
    message: error.message,
  },
});

export const ServerError = (reason: string): IHttpResponse => ({
  statusCode: 500,
  error: new InternalServerError(reason),
});
