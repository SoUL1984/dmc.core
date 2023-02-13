import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

//export const ROLES_KEY = 'role';
//export const Role = (role: string) => SetMetadata(ROLES_KEY, role);

// Декоратор для обязательного поля в dto
// string | Function | Type<unknown> | [Function]
export function Roles(sSummary: string, sType: any, aRoles: string[]) {
  const ROLES_KEY = 'roles';
  const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

  const decorator = applyDecorators(
    ApiOperation({ summary: sSummary }),
    ApiResponse({ status: 200, type: sType }),
    Roles(...aRoles),
  );

  return decorator;
}
