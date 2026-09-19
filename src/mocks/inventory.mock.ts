import { InventoryEvent } from '../models';

// MOCK: Inventory audit events
export const MOCK_INVENTORY_EVENTS: InventoryEvent[] = [
    {
        id: 'INV-3001',
        productId: 'PRD-101', // FK -> Product.id
        productName: 'Artisan Woodfired Truffle Pizza',
        businessId: 'BUS-101', // FK -> Business.id
        changeType: 'order_placed',
        quantityDelta: -2,
        remainingStock: 45,
        reason: 'Stock deducted for order placement #ORD-1001',
        timestamp: '2025-02-28T09:15:00.000Z'
    },
    {
        id: 'INV-3002',
        productId: 'PRD-102',
        productName: 'Smoked Salmon Risotto',
        businessId: 'BUS-101',
        changeType: 'order_placed',
        quantityDelta: -1,
        remainingStock: 20,
        reason: 'Stock deducted for order placement #ORD-1002',
        timestamp: '2025-02-28T08:45:00.000Z'
    },
    {
        id: 'INV-3003',
        productId: 'PRD-201',
        productName: 'Hass Avocados Organic Pack (1kg)',
        businessId: 'BUS-102',
        changeType: 'restock',
        quantityDelta: 50,
        remainingStock: 60,
        reason: 'Batch shipment restock from supplier #SHIP-881',
        timestamp: '2025-02-27T08:00:00.000Z'
    },
    {
        id: 'INV-3004',
        productId: 'PRD-201',
        productName: 'Hass Avocados Organic Pack (1kg)',
        businessId: 'BUS-102',
        changeType: 'order_cancelled',
        quantityDelta: +1,
        remainingStock: 61,
        reason: 'Stock returned due to order cancellation #ORD-1007',
        timestamp: '2025-02-26T10:15:00.000Z'
    }
];
