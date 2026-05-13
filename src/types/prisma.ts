export type Role = 'ADMIN' | 'DEVELOPER' | 'REVIEWER';
export const Role = {
    ADMIN: 'ADMIN' as const,
    DEVELOPER: 'DEVELOPER' as const,
    REVIEWER: 'REVIEWER' as const,
};

export type PrStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export const PrStatus = {
    PENDING: 'PENDING' as const,
    APPROVED: 'APPROVED' as const,
    REJECTED: 'REJECTED' as const,
};
