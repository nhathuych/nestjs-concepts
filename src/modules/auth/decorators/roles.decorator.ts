import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/modules/users/user.entity';

export const ROLES_KEY = 'roles';

/**
 * Custom decorator to specify which user roles are allowed to access a given route.
 *
 * Usage examples:
 * ```ts
 * @Roles(UserRole.USER)
 * @Roles(UserRole.ADMIN)
 * @Roles(UserRole.ADMIN, UserRole.USER)
 * ```
 *
 * When applied, this decorator attaches a `roles` metadata key to the route handler.
 * The `RolesGuard` can then read this metadata and check whether `request.user.role` matches one of the allowed roles.
 *
 * @param roles List of allowed roles (UserRole enum).
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
