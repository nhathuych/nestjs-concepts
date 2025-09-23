import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, body, query, ip } = request;

    let logRequest = `Started ${method} "${url}" for ${ip}`;
    if (query && Object.keys(query).length > 0) logRequest += `\n  query: ${JSON.stringify(query)}`;
    if (body && Object.keys(body).length > 0) logRequest += `\n  body: ${JSON.stringify(body)}`;

    this.logger.log(logRequest);

    return next.handle().pipe(
      tap({
        next: (data) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          this.logger.log(`Completed ${response.statusCode} in ${duration}ms\n`);
        },
      })
    );
  }
}
