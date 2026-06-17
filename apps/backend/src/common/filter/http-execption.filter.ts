import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { Response } from 'express';

/**
 * Global HTTP Exception Filter to catch all exceptions thrown by the application and return a consistent error response format.
 *
 * This filter catches all exceptions that are instances of `HttpException` and formats the response to include:
 * - `success`: a boolean indicating the success status of the response (always `false` for exceptions).
 * - `status`: the HTTP status code associated with the exception.
 * - `message`: a string or object describing the error message or details.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // Get the HTTP status code from the exception, defaulting to 500 if not available
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    // Get the response message from the exception, which can be a string or an object
    const exceptionResponse = exception.getResponse();
    let message: string | object = 'Internal Server Error';

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else {
      message = exceptionResponse;
    }
    const start = Date.now();
    const duration = Date.now() - start;
    this.logger.error(
      `[${status}] ${request.method} ${request.url} ${duration} ms`,
      JSON.stringify(exceptionResponse),
    );

    return response.status(status).json({
      success: false,
      status,
      message,
    });
  }
}
