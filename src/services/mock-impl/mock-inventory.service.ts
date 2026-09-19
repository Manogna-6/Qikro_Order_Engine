// MOCK: Mock Inventory Service Implementation
import { InventoryEvent } from '../../models';
import { MOCK_INVENTORY_EVENTS } from '../../mocks';
import { IInventoryService } from '../interfaces';

export class MockInventoryService implements IInventoryService {
    private events: InventoryEvent[] = [...MOCK_INVENTORY_EVENTS];

    private async simulateDelay(ms: number = 200): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async getInventoryEventsByProduct(productId: string): Promise<InventoryEvent[]> {
        await this.simulateDelay(200);
        return this.events.filter(e => e.productId === productId);
    }

    public async logInventoryEvent(event: Omit<InventoryEvent, 'id' | 'timestamp'>): Promise<InventoryEvent> {
        await this.simulateDelay(300);
        const newEvent: InventoryEvent = {
            ...event,
            id: `INV-${Math.floor(3000 + Math.random() * 9000)}`,
            timestamp: new Date().toISOString()
        };
        this.events.push(newEvent);
        return newEvent;
    }
}

export const mockInventoryService = new MockInventoryService();
