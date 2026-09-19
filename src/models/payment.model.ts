import { PaymentStatus } from './common.model';

export interface Payment {
    id: string; // Primary Key (e.g. PAY-9001)
    orderId: string; // FK -> Order.id
    amount: number; // Total transaction amount
    status: PaymentStatus;
    provider: 'card' | 'upi' | 'netbanking' | 'cod';
    transactionRef: string;
    failureReason?: string;
    createdAt: string; // ISO 8601 string date
    completedAt?: string; // ISO 8601 string date
}
