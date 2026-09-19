// MOCK: Mock Delivery Service Implementation
import { Delivery } from '../../models';
import { MOCK_DELIVERIES } from '../../mocks';
import { NotFoundError } from '../../lib/errors';
import { IDeliveryService } from '../interfaces';

export class MockDeliveryService implements IDeliveryService {
    private async simulateDelay(ms: number = 200): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async getDeliveryByOrderId(orderId: string): Promise<Delivery> {
        await this.simulateDelay(200);
        const delivery = MOCK_DELIVERIES.find(d => d.orderId.toUpperCase() === orderId.toUpperCase());
        if (!delivery) {
            throw new NotFoundError('Delivery for Order', orderId);
        }
        return { ...delivery };
    }
}

export const mockDeliveryService = new MockDeliveryService();
