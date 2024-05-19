import { Role } from './interfaces';

export const rolesToString = (roles: Role[]) => {
    return roles.map((role: Role) => role.name).join(', ');
}