import { Delivery } from '../models';

// MOCK: Delivery tracking records
export const MOCK_DELIVERIES: Delivery[] = [
    {
        id: 'DEL-7001',
        orderId: 'ORD-1001', // FK -> Order.id
        partnerName: 'SwiftExpress Logistics',
        trackingNumber: 'SE-990011-IN',
        status: 'unassigned',
        estimatedDeliveryTime: '2025-02-28T11:00:00.000Z',
        deliveryAddress: {
            street: 'Flat 402, Sunshine Apartments, Worli',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400018',
            landmark: 'Near Worli Sea Link Toll'
        }
    },
    {
        id: 'DEL-7002',
        orderId: 'ORD-1002',
        partnerName: 'SwiftExpress Logistics',
        trackingNumber: 'SE-990012-IN',
        status: 'assigned',
        estimatedDeliveryTime: '2025-02-28T10:30:00.000Z',
        agentName: 'Ramesh Singh',
        agentPhone: '+919811223344',
        assignedAt: '2025-02-28T08:52:00.000Z',
        deliveryAddress: {
            street: 'House #14, Green Valley Estate, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400050'
        }
    },
    {
        id: 'DEL-7003',
        orderId: 'ORD-1003',
        partnerName: 'HyperLocal Courier',
        trackingNumber: 'HL-881122-IN',
        status: 'assigned',
        estimatedDeliveryTime: '2025-02-28T10:00:00.000Z',
        agentName: 'Karan Nair',
        agentPhone: '+919744556677',
        assignedAt: '2025-02-28T08:20:00.000Z',
        deliveryAddress: {
            street: 'Flat 402, Sunshine Apartments, Worli',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400018'
        }
    },
    {
        id: 'DEL-7004',
        orderId: 'ORD-1004',
        partnerName: 'HyperLocal Courier',
        trackingNumber: 'HL-881123-IN',
        status: 'in_transit',
        estimatedDeliveryTime: '2025-02-28T08:30:00.000Z',
        agentName: 'Sunil Rao',
        agentPhone: '+919633221100',
        assignedAt: '2025-02-28T06:55:00.000Z',
        dispatchedAt: '2025-02-28T07:20:00.000Z',
        deliveryAddress: {
            street: 'House #14, Green Valley Estate, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400050'
        }
    },
    {
        id: 'DEL-7005',
        orderId: 'ORD-1005',
        partnerName: 'SwiftExpress Logistics',
        trackingNumber: 'SE-990005-IN',
        status: 'delivered',
        estimatedDeliveryTime: '2025-02-27T12:30:00.000Z',
        agentName: 'Ramesh Singh',
        agentPhone: '+919811223344',
        assignedAt: '2025-02-27T11:15:00.000Z',
        dispatchedAt: '2025-02-27T11:50:00.000Z',
        deliveredAt: '2025-02-27T12:30:00.000Z',
        deliveryAddress: {
            street: 'Flat 402, Sunshine Apartments, Worli',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400018'
        }
    },
    {
        id: 'DEL-7006',
        orderId: 'ORD-1006',
        partnerName: 'SwiftExpress Logistics',
        trackingNumber: 'SE-990006-IN',
        status: 'delivered',
        estimatedDeliveryTime: '2025-02-27T15:30:00.000Z',
        agentName: 'Sunil Rao',
        agentPhone: '+919633221100',
        assignedAt: '2025-02-27T14:15:00.000Z',
        dispatchedAt: '2025-02-27T14:45:00.000Z',
        deliveredAt: '2025-02-27T15:20:00.000Z',
        deliveryAddress: {
            street: 'House #14, Green Valley Estate, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400050'
        }
    },
    {
        id: 'DEL-7007',
        orderId: 'ORD-1007',
        partnerName: 'HyperLocal Courier',
        trackingNumber: 'HL-881107-IN',
        status: 'unassigned',
        estimatedDeliveryTime: '2025-02-26T12:00:00.000Z',
        deliveryAddress: {
            street: 'Flat 402, Sunshine Apartments, Worli',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400018'
        }
    },
    {
        id: 'DEL-7008',
        orderId: 'ORD-1008',
        partnerName: 'SwiftExpress Logistics',
        trackingNumber: 'SE-990008-IN',
        status: 'returned_to_hub',
        estimatedDeliveryTime: '2025-02-25T17:30:00.000Z',
        agentName: 'Ramesh Singh',
        agentPhone: '+919811223344',
        assignedAt: '2025-02-25T16:15:00.000Z',
        dispatchedAt: '2025-02-25T17:00:00.000Z',
        deliveryAddress: {
            street: 'House #14, Green Valley Estate, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400050'
        }
    },
    {
        id: 'DEL-7009',
        orderId: 'ORD-1009',
        partnerName: 'SwiftExpress Logistics',
        trackingNumber: 'SE-990009-IN',
        status: 'returned_to_hub',
        estimatedDeliveryTime: '2025-02-24T14:00:00.000Z',
        agentName: 'Sunil Rao',
        agentPhone: '+919633221100',
        assignedAt: '2025-02-24T12:30:00.000Z',
        dispatchedAt: '2025-02-24T13:15:00.000Z',
        deliveredAt: '2025-02-24T14:00:00.000Z',
        deliveryAddress: {
            street: 'Flat 402, Sunshine Apartments, Worli',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400018'
        }
    }
];
