import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/enums/roles.enum';

export const ROLES_KEY = 'type';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
