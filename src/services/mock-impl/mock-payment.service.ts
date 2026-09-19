// MOCK: Mock Payment Service Implementation
import { Payment } from '../../models';
import { MOCK_PAYMENTS } from '../../mocks';
import { NotFoundError } from '../../lib/errors';
import { IPaymentService } from '../interfaces';

export class MockPaymentService implements IPaymentService {
    private async simulateDelay(ms: number = 200): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async getPaymentByOrderId(orderId: string): Promise<Payment> {
        await this.simulateDelay(200);
        const payment = MOCK_PAYMENTS.find(p => p.orderId.toUpperCase() === orderId.toUpperCase());
        if (!payment) {
            throw new NotFoundError('Payment for Order', orderId);
        }
        return { ...payment };
    }

    public async getAllPayments(): Promise<Payment[]> {
        await this.simulateDelay(250);
        return [...MOCK_PAYMENTS];
    }
}

export const mockPaymentService = new MockPaymentService();
