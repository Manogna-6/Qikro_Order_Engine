import { InventoryEvent } from '../../models';

export interface IInventoryService {
    getInventoryEventsByProduct(productId: string): Promise<InventoryEvent[]>;
    logInventoryEvent(event: Omit<InventoryEvent, 'id' | 'timestamp'>): Promise<InventoryEvent>;
}
