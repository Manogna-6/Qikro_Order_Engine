import { Order } from '../models';

// MOCK: Comprehensive cross-referenced orders in all happy-path and exception states
export const MOCK_ORDERS: Order[] = [
    // 1. PLACED Status
    {
        id: 'ORD-1001',
        customerId: 'USR-004', // FK -> User.id (Priya Mehta)
        customerName: 'Priya Mehta',
        customerPhone: '+919123456789',
        businessId: 'BUS-101', // FK -> Business.id (Gourmet Kitchen)
        businessName: 'Gourmet Kitchen & Bistro',
        items: [
            {
                productId: 'PRD-101', // FK -> Product.id
                productName: 'Artisan Woodfired Truffle Pizza',
                unitPrice: 650.00,
                quantity: 2,
                totalPrice: 1300.00
            },
            {
                productId: 'PRD-103', // FK -> Product.id
                productName: 'Sparkling Hibiscus Kombucha (500ml)',
                unitPrice: 180.00,
                quantity: 1,
                totalPrice: 180.00
            }
        ],
        subtotal: 1480.00,
        deliveryFee: 60.00,
        totalAmount: 1540.00,
        commissionRate: 0.15,
        commissionAmount: 222.00, // 1480 * 0.15
        netPayoutAmount: 1258.00, // 1480 - 222
        status: 'placed',
        isSettled: false,
        createdAt: '2025-02-28T09:15:00.000Z',
        updatedAt: '2025-02-28T09:15:00.000Z',
        paymentId: 'PAY-9001', // FK -> Payment.id
        deliveryId: 'DEL-7001', // FK -> Delivery.id
        statusHistory: [
            {
                status: 'placed',
                timestamp: '2025-02-28T09:15:00.000Z',
                updatedBy: 'USR-004',
                note: 'Order submitted by customer via mobile app.'
            }
        ]
    },

    // 2. ACCEPTED Status
    {
        id: 'ORD-1002',
        customerId: 'USR-005', // FK -> User.id (Vikram Patel)
        customerName: 'Vikram Patel',
        customerPhone: '+919555443322',
        businessId: 'BUS-101', // FK -> Business.id
        businessName: 'Gourmet Kitchen & Bistro',
        items: [
            {
                productId: 'PRD-102', // FK -> Product.id
                productName: 'Smoked Salmon Risotto',
                unitPrice: 820.00,
                quantity: 1,
                totalPrice: 820.00
            }
        ],
        subtotal: 820.00,
        deliveryFee: 50.00,
        totalAmount: 870.00,
        commissionRate: 0.15,
        commissionAmount: 123.00, // 820 * 0.15
        netPayoutAmount: 697.00, // 820 - 123
        status: 'accepted',
        isSettled: false,
        createdAt: '2025-02-28T08:45:00.000Z',
        updatedAt: '2025-02-28T08:50:00.000Z',
        paymentId: 'PAY-9002',
        deliveryId: 'DEL-7002',
        statusHistory: [
            {
                status: 'placed',
                timestamp: '2025-02-28T08:45:00.000Z',
                updatedBy: 'USR-005',
                note: 'Order created.'
            },
            {
                status: 'accepted',
                timestamp: '2025-02-28T08:50:00.000Z',
                updatedBy: 'USR-002',
                note: 'Kitchen confirmed preparation availability.'
            }
        ]
    },

    // 3. PACKING Status
    {
        id: 'ORD-1003',
        customerId: 'USR-004', // FK -> User.id
        customerName: 'Priya Mehta',
        customerPhone: '+919123456789',
        businessId: 'BUS-102', // FK -> Business.id (Fresh Organics)
        businessName: 'Fresh Harvest Organics',
        items: [
            {
                productId: 'PRD-201', // FK -> Product.id
                productName: 'Hass Avocados Organic Pack (1kg)',
                unitPrice: 490.00,
                quantity: 2,
                totalPrice: 980.00
            },
            {
                productId: 'PRD-202', // FK -> Product.id
                productName: 'Raw Cold-Pressed Almond Milk (1L)',
                unitPrice: 320.00,
                quantity: 1,
                totalPrice: 320.00
            }
        ],
        subtotal: 1300.00,
        deliveryFee: 40.00,
        totalAmount: 1340.00,
        commissionRate: 0.10, // 10% for BUS-102
        commissionAmount: 130.00,
        netPayoutAmount: 1170.00,
        status: 'packing',
        isSettled: false,
        createdAt: '2025-02-28T07:30:00.000Z',
        updatedAt: '2025-02-28T08:15:00.000Z',
        paymentId: 'PAY-9003',
        deliveryId: 'DEL-7003',
        statusHistory: [
            { status: 'placed', timestamp: '2025-02-28T07:30:00.000Z', updatedBy: 'USR-004' },
            { status: 'accepted', timestamp: '2025-02-28T07:40:00.000Z', updatedBy: 'USR-003' },
            { status: 'packing', timestamp: '2025-02-28T08:15:00.000Z', updatedBy: 'USR-003', note: 'Packing cold-storage items into insulated crate.' }
        ]
    },

    // 4. DISPATCHED Status
    {
        id: 'ORD-1004',
        customerId: 'USR-005',
        customerName: 'Vikram Patel',
        customerPhone: '+919555443322',
        businessId: 'BUS-102',
        businessName: 'Fresh Harvest Organics',
        items: [
            {
                productId: 'PRD-203',
                productName: 'Organic Hydroponic Strawberries (250g)',
                unitPrice: 250.00,
                quantity: 3,
                totalPrice: 750.00
            }
        ],
        subtotal: 750.00,
        deliveryFee: 50.00,
        totalAmount: 800.00,
        commissionRate: 0.10,
        commissionAmount: 75.00,
        netPayoutAmount: 675.00,
        status: 'dispatched',
        isSettled: false,
        createdAt: '2025-02-28T06:10:00.000Z',
        updatedAt: '2025-02-28T07:20:00.000Z',
        paymentId: 'PAY-9004',
        deliveryId: 'DEL-7004',
        statusHistory: [
            { status: 'placed', timestamp: '2025-02-28T06:10:00.000Z', updatedBy: 'USR-005' },
            { status: 'accepted', timestamp: '2025-02-28T06:20:00.000Z', updatedBy: 'USR-003' },
            { status: 'packing', timestamp: '2025-02-28T06:50:00.000Z', updatedBy: 'USR-003' },
            { status: 'dispatched', timestamp: '2025-02-28T07:20:00.000Z', updatedBy: 'system', note: 'Handed over to SwiftExpress driver Sunil.' }
        ]
    },

    // 5. DELIVERED (Settled = true)
    {
        id: 'ORD-1005',
        customerId: 'USR-004',
        customerName: 'Priya Mehta',
        customerPhone: '+919123456789',
        businessId: 'BUS-101',
        businessName: 'Gourmet Kitchen & Bistro',
        items: [
            {
                productId: 'PRD-101',
                productName: 'Artisan Woodfired Truffle Pizza',
                unitPrice: 650.00,
                quantity: 1,
                totalPrice: 650.00
            },
            {
                productId: 'PRD-102',
                productName: 'Smoked Salmon Risotto',
                unitPrice: 820.00,
                quantity: 1,
                totalPrice: 820.00
            }
        ],
        subtotal: 1470.00,
        deliveryFee: 60.00,
        totalAmount: 1530.00,
        commissionRate: 0.15,
        commissionAmount: 220.50,
        netPayoutAmount: 1249.50,
        status: 'delivered',
        isSettled: true, // Marked as settled
        settledAt: '2025-02-27T18:00:00.000Z',
        createdAt: '2025-02-27T11:00:00.000Z',
        updatedAt: '2025-02-27T12:30:00.000Z',
        paymentId: 'PAY-9005',
        deliveryId: 'DEL-7005',
        statusHistory: [
            { status: 'placed', timestamp: '2025-02-27T11:00:00.000Z', updatedBy: 'USR-004' },
            { status: 'accepted', timestamp: '2025-02-27T11:10:00.000Z', updatedBy: 'USR-002' },
            { status: 'packing', timestamp: '2025-02-27T11:30:00.000Z', updatedBy: 'USR-002' },
            { status: 'dispatched', timestamp: '2025-02-27T11:50:00.000Z', updatedBy: 'system' },
            { status: 'delivered', timestamp: '2025-02-27T12:30:00.000Z', updatedBy: 'system', note: 'Customer signed delivery OTP verification.' }
        ]
    },

    // 6. DELIVERED (Settled = false, Awaiting Settlement)
    {
        id: 'ORD-1006',
        customerId: 'USR-005',
        customerName: 'Vikram Patel',
        customerPhone: '+919555443322',
        businessId: 'BUS-101',
        businessName: 'Gourmet Kitchen & Bistro',
        items: [
            {
                productId: 'PRD-101',
                productName: 'Artisan Woodfired Truffle Pizza',
                unitPrice: 650.00,
                quantity: 3,
                totalPrice: 1950.00
            }
        ],
        subtotal: 1950.00,
        deliveryFee: 70.00,
        totalAmount: 2020.00,
        commissionRate: 0.15,
        commissionAmount: 292.50,
        netPayoutAmount: 1657.50,
        status: 'delivered',
        isSettled: false, // Pending settlement batch
        createdAt: '2025-02-27T14:00:00.000Z',
        updatedAt: '2025-02-27T15:20:00.000Z',
        paymentId: 'PAY-9006',
        deliveryId: 'DEL-7006',
        statusHistory: [
            { status: 'placed', timestamp: '2025-02-27T14:00:00.000Z', updatedBy: 'USR-005' },
            { status: 'accepted', timestamp: '2025-02-27T14:10:00.000Z', updatedBy: 'USR-002' },
            { status: 'packing', timestamp: '2025-02-27T14:30:00.000Z', updatedBy: 'USR-002' },
            { status: 'dispatched', timestamp: '2025-02-27T14:45:00.000Z', updatedBy: 'system' },
            { status: 'delivered', timestamp: '2025-02-27T15:20:00.000Z', updatedBy: 'system' }
        ]
    },

    // 7. EXCEPTION: CANCELLED (Before dispatch)
    {
        id: 'ORD-1007',
        customerId: 'USR-004',
        customerName: 'Priya Mehta',
        customerPhone: '+919123456789',
        businessId: 'BUS-102',
        businessName: 'Fresh Harvest Organics',
        items: [
            {
                productId: 'PRD-201',
                productName: 'Hass Avocados Organic Pack (1kg)',
                unitPrice: 490.00,
                quantity: 1,
                totalPrice: 490.00
            }
        ],
        subtotal: 490.00,
        deliveryFee: 40.00,
        totalAmount: 530.00,
        commissionRate: 0.10,
        commissionAmount: 0.00, // Zero commission for cancelled orders
        netPayoutAmount: 0.00, // Zero payout
        status: 'cancelled',
        isSettled: false,
        createdAt: '2025-02-26T10:00:00.000Z',
        updatedAt: '2025-02-26T10:15:00.000Z',
        paymentId: 'PAY-9007',
        deliveryId: 'DEL-7007',
        statusHistory: [
            { status: 'placed', timestamp: '2025-02-26T10:00:00.000Z', updatedBy: 'USR-004' },
            { status: 'cancelled', timestamp: '2025-02-26T10:15:00.000Z', updatedBy: 'USR-004', note: 'Customer requested cancellation prior to packing.' }
        ]
    },

    // 8. EXCEPTION: FAILED Delivery
    {
        id: 'ORD-1008',
        customerId: 'USR-005',
        customerName: 'Vikram Patel',
        customerPhone: '+919555443322',
        businessId: 'BUS-101',
        businessName: 'Gourmet Kitchen & Bistro',
        items: [
            {
                productId: 'PRD-102',
                productName: 'Smoked Salmon Risotto',
                unitPrice: 820.00,
                quantity: 2,
                totalPrice: 1640.00
            }
        ],
        subtotal: 1640.00,
        deliveryFee: 60.00,
        totalAmount: 1700.00,
        commissionRate: 0.15,
        commissionAmount: 0.00,
        netPayoutAmount: 0.00,
        status: 'failed',
        isSettled: false,
        createdAt: '2025-02-25T16:00:00.000Z',
        updatedAt: '2025-02-25T18:00:00.000Z',
        paymentId: 'PAY-9008',
        deliveryId: 'DEL-7008',
        statusHistory: [
            { status: 'placed', timestamp: '2025-02-25T16:00:00.000Z', updatedBy: 'USR-005' },
            { status: 'accepted', timestamp: '2025-02-25T16:10:00.000Z', updatedBy: 'USR-002' },
            { status: 'packing', timestamp: '2025-02-25T16:30:00.000Z', updatedBy: 'USR-002' },
            { status: 'dispatched', timestamp: '2025-02-25T17:00:00.000Z', updatedBy: 'system' },
            { status: 'failed', timestamp: '2025-02-25T18:00:00.000Z', updatedBy: 'system', note: 'Customer unreachable after 3 delivery attempts.' }
        ]
    },

    // 9. EXCEPTION: RETURNED (After delivery)
    {
        id: 'ORD-1009',
        customerId: 'USR-004',
        customerName: 'Priya Mehta',
        customerPhone: '+919123456789',
        businessId: 'BUS-101',
        businessName: 'Gourmet Kitchen & Bistro',
        items: [
            {
                productId: 'PRD-103',
                productName: 'Sparkling Hibiscus Kombucha (500ml)',
                unitPrice: 180.00,
                quantity: 4,
                totalPrice: 720.00
            }
        ],
        subtotal: 720.00,
        deliveryFee: 50.00,
        totalAmount: 770.00,
        commissionRate: 0.15,
        commissionAmount: 0.00,
        netPayoutAmount: 0.00,
        status: 'returned',
        isSettled: false,
        createdAt: '2025-02-24T12:00:00.000Z',
        updatedAt: '2025-02-24T15:30:00.000Z',
        paymentId: 'PAY-9009',
        deliveryId: 'DEL-7009',
        statusHistory: [
            { status: 'placed', timestamp: '2025-02-24T12:00:00.000Z', updatedBy: 'USR-004' },
            { status: 'accepted', timestamp: '2025-02-24T12:15:00.000Z', updatedBy: 'USR-002' },
            { status: 'packing', timestamp: '2025-02-24T12:45:00.000Z', updatedBy: 'USR-002' },
            { status: 'dispatched', timestamp: '2025-02-24T13:15:00.000Z', updatedBy: 'system' },
            { status: 'delivered', timestamp: '2025-02-24T14:00:00.000Z', updatedBy: 'system' },
            { status: 'returned', timestamp: '2025-02-24T15:30:00.000Z', updatedBy: 'USR-004', note: 'Item seal broken on delivery. Package returned.' }
        ]
    }
];
