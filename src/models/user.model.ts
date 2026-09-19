import { Role } from './common.model';

export interface User {
    id: string; // Primary Key
    phone: string; // E.164 formatted phone number or 10-digit number
    name: string;
    email: string;
    role: Role;
    businessId?: string; // FK -> Business.id (Present if role === 'business_owner')
    avatarUrl?: string;
    createdAt: string; // ISO 8601 string date
    updatedAt: string; // ISO 8601 string date
}
