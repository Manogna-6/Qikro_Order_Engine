import { Payment } from '../models';

// MOCK: Payment records for mock orders
export const MOCK_PAYMENTS: Payment[] = [
    {
        id: 'PAY-9001',
        orderId: 'ORD-1001', // FK -> Order.id
        amount: 1540.00,
        status: 'captured',
        provider: 'upi',
        transactionRef: 'UPI-REF-8899101',
        createdAt: '2025-02-28T09:15:00.000Z',
        completedAt: '2025-02-28T09:15:30.000Z'
    },
    {
        id: 'PAY-9002',
        orderId: 'ORD-1002',
        amount: 870.00,
        status: 'captured',
        provider: 'card',
        transactionRef: 'CARD-TXN-7733441',
        createdAt: '2025-02-28T08:45:00.000Z',
        completedAt: '2025-02-28T08:45:20.000Z'
    },
    {
        id: 'PAY-9003',
        orderId: 'ORD-1003',
        amount: 1340.00,
        status: 'captured',
        provider: 'upi',
        transactionRef: 'UPI-REF-6622119',
        createdAt: '2025-02-28T07:30:00.000Z',
        completedAt: '2025-02-28T07:30:15.000Z'
    },
    {
        id: 'PAY-9004',
        orderId: 'ORD-1004',
        amount: 800.00,
        status: 'captured',
        provider: 'netbanking',
        transactionRef: 'NB-TXN-5544332',
        createdAt: '2025-02-28T06:10:00.000Z',
        completedAt: '2025-02-28T06:10:45.000Z'
    },
    {
        id: 'PAY-9005',
        orderId: 'ORD-1005',
        amount: 1530.00,
        status: 'captured',
        provider: 'card',
        transactionRef: 'CARD-TXN-9988776',
        createdAt: '2025-02-27T11:00:00.000Z',
        completedAt: '2025-02-27T11:00:10.000Z'
    },
    {
        id: 'PAY-9006',
        orderId: 'ORD-1006',
        amount: 2020.00,
        status: 'captured',
        provider: 'upi',
        transactionRef: 'UPI-REF-3344556',
        createdAt: '2025-02-27T14:00:00.000Z',
        completedAt: '2025-02-27T14:00:25.000Z'
    },
    {
        id: 'PAY-9007',
        orderId: 'ORD-1007',
        amount: 530.00,
        status: 'refunded', // Cancelled order refunded
        provider: 'upi',
        transactionRef: 'UPI-REF-1122334',
        failureReason: 'Order cancelled by customer before dispatch',
        createdAt: '2025-02-26T10:00:00.000Z',
        completedAt: '2025-02-26T10:20:00.000Z'
    },
    {
        id: 'PAY-9008',
        orderId: 'ORD-1008',
        amount: 1700.00,
        status: 'refunded', // Delivery failed refunded
        provider: 'card',
        transactionRef: 'CARD-TXN-4455667',
        failureReason: 'Delivery failed - customer unreachable',
        createdAt: '2025-02-25T16:00:00.000Z',
        completedAt: '2025-02-25T18:30:00.000Z'
    },
    {
        id: 'PAY-9009',
        orderId: 'ORD-1009',
        amount: 770.00,
        status: 'refunded', // Returned order refunded
        provider: 'upi',
        transactionRef: 'UPI-REF-7788990',
        failureReason: 'Customer return accepted',
        createdAt: '2025-02-24T12:00:00.000Z',
        completedAt: '2025-02-24T16:00:00.000Z'
    }
];
