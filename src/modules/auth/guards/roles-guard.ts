import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/modules/users/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  // Reflector is used to access metadata set by decorators
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Retrieve roles metadata defined by the @Roles() decorator.
    // - First checks method-level metadata -> e.g., roles set directly on a route handler:
    //     @Get()
    //     @Roles(UserRole.ADMIN)  // method-level metadata
    //     findAll() {}
    //
    // - If not found, falls back to class-level metadata -> e.g., roles set on the whole controller:
    //     @Controller('users')
    //     @Roles(UserRole.ADMIN)  // class-level metadata
    //     export class UsersController {}
    //
    // - Method-level roles always override class-level roles.
    // - Returns an array of required roles, or undefined if no metadata is set.
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY, [
        context.getHandler(),  // method-level metadata (specific endpoint)
        context.getClass(),    // class-level metadata (entire controller)
      ]
    );

    if (!requiredRoles) return true; // No roles required, allow access

    const { user } = context.switchToHttp().getRequest();
    if (!user) throw new ForbiddenException('User not authenticated.');

    const hasRequiredRole = requiredRoles.includes(user.role);
    if (!hasRequiredRole) throw new ForbiddenException('Insufficient permission.');

    return true; // User has one of the required roles, allow access
  }
}
