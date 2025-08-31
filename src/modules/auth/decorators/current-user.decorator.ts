import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // The authenticated user, attached to `request.user` by a prior auth guard (e.g., JwtAuthGuard)
  }
)
