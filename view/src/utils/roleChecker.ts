export const roles = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    USER: 'user'
} as const;

export type Role = keyof typeof roles;

export const checkRole = (userRole: Role, allowedRoles: Role[]) => allowedRoles.includes(userRole);
