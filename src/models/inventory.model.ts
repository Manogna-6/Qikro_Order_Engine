import { InventoryChangeType } from './common.model';

export interface InventoryEvent {
    id: string; // Primary Key (e.g. INV-3001)
    productId: string; // FK -> Product.id
    productName: string;
    businessId: string; // FK -> Business.id
    changeType: InventoryChangeType;
    quantityDelta: number; // e.g. -2 for order placement, +10 for restock
    remainingStock: number;
    reason: string;
    timestamp: string; // ISO 8601 string date
}
