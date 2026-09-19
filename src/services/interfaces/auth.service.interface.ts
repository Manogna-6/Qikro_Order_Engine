import { User } from '../../models';

export interface AuthResponse {
    user: User;
    token: string;
    expiresAt: string;
}

export interface IAuthService {
    requestOtp(phone: string): Promise<{ success: boolean; message: string; mockOtp?: string }>;
    verifyOtp(phone: string, otp: string): Promise<AuthResponse>;
    logout(): Promise<void>;
    getCurrentUser(): Promise<User | null>;
}
