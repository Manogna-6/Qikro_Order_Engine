// MOCK: Mock Authentication Service Implementation
import { User } from '../../models';
import { MOCK_USERS } from '../../mocks';
import { InvalidOtpError, OtpExpiredError } from '../../lib/errors';
import { sessionStore } from '../../state/session.store';
import { AuthResponse, IAuthService } from '../interfaces';

interface ActiveOtpRequest {
    phone: string;
    otp: string;
    createdAt: number;
}

export class MockAuthService implements IAuthService {
    private activeOtpStore: Map<string, ActiveOtpRequest> = new Map();
    private readonly OTP_TTL_MS = 2 * 60 * 1000; // 2 minutes OTP expiration window

    private async simulateDelay(ms: number = 350): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * MOCK: Request OTP for phone number
     * Accepts any 10-digit or E.164 phone number.
     * Hardcoded mock OTP is always '123456' for predictable demo testing.
     */
    public async requestOtp(phone: string): Promise<{ success: boolean; message: string; mockOtp: string }> {
        await this.simulateDelay(400);

        const cleanPhone = phone.replace(/[^0-9+]/g, '');
        if (!cleanPhone || cleanPhone.length < 10) {
            throw new InvalidOtpError('Please enter a valid phone number (at least 10 digits).');
        }

        // Standard demo mock OTP is '123456'
        const mockOtp = '123456';
        this.activeOtpStore.set(cleanPhone, {
            phone: cleanPhone,
            otp: mockOtp,
            createdAt: Date.now()
        });

        return {
            success: true,
            message: `OTP sent successfully to ${phone}.`,
            mockOtp
        };
    }

    /**
     * MOCK: Verify OTP code and establish user session
     */
    public async verifyOtp(phone: string, otp: string): Promise<AuthResponse> {
        await this.simulateDelay(500);

        const cleanPhone = phone.replace(/[^0-9+]/g, '');
        const otpRequest = this.activeOtpStore.get(cleanPhone);

        // Business Rule check: OTP Expiry (2 mins)
        if (otpRequest && Date.now() - otpRequest.createdAt > this.OTP_TTL_MS) {
            this.activeOtpStore.delete(cleanPhone);
            throw new OtpExpiredError('OTP code has expired after 2 minutes. Please request a new code.');
        }

        // Verification check: Standard mock OTP '123456' or matching requested code
        if (otp !== '123456' && (!otpRequest || otpRequest.otp !== otp)) {
            throw new InvalidOtpError('Invalid 6-digit OTP code entered. Hint: Use demo OTP 123456.');
        }

        // Find or fallback mock user matching phone or default to admin / merchant / customer
        let matchedUser = MOCK_USERS.find(u => u.phone === cleanPhone || u.phone.includes(cleanPhone.slice(-10)));

        if (!matchedUser) {
            // Default fallback demo user if typed a random number
            matchedUser = {
                id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
                phone: cleanPhone,
                name: 'Demo Merchant User',
                email: 'demo.merchant@platform.com',
                role: 'business_owner',
                businessId: 'BUS-101',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
        }

        // Generate JWT-shaped mock token string
        const mockHeader = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const mockPayload = btoa(JSON.stringify({
            sub: matchedUser.id,
            role: matchedUser.role,
            name: matchedUser.name,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor((Date.now() + 8 * 60 * 60 * 1000) / 1000) // 8 hours session
        }));
        const mockSignature = 'MockSignature_X99A_b722c1';
        const mockToken = `${mockHeader}.${mockPayload}.${mockSignature}`;

        const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();

        // Update in-memory session store
        sessionStore.setSession(matchedUser, mockToken, expiresAt);

        return {
            user: matchedUser,
            token: mockToken,
            expiresAt
        };
    }

    public async logout(): Promise<void> {
        await this.simulateDelay(200);
        sessionStore.clearSession();
    }

    public async getCurrentUser(): Promise<User | null> {
        return sessionStore.getCurrentUser();
    }
}

export const mockAuthService = new MockAuthService();
