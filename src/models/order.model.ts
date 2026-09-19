import { OrderItem, OrderStatus, StatusHistoryItem } from './common.model';

export interface Order {
    id: string; // Primary Key (e.g. ORD-1001)
    customerId: string; // FK -> User.id
    customerName: string;
    customerPhone: string;
    businessId: string; // FK -> Business.id
    businessName: string;
    items: OrderItem[];

    // Financial breakdown
    subtotal: number; // Sum of items (unitPrice * quantity)
    deliveryFee: number; // Excluded from gross platform settlement calculation
    totalAmount: number; // subtotal + deliveryFee (Gross paid by customer)
    commissionRate: number; // Stored snapshot of business commission rate (e.g. 0.15)
    commissionAmount: number; // Platform commission cut calculated on subtotal
    netPayoutAmount: number; // subtotal - commissionAmount (Amount due to business)

    // State and Settlement
    status: OrderStatus;
    isSettled: boolean; // Flag indicating if order net payout has been settled to merchant
    settledAt?: string; // ISO 8601 string date when marked settled

    // Timestamps & Audit
    createdAt: string; // ISO 8601 string date
    updatedAt: string; // ISO 8601 string date
    statusHistory: StatusHistoryItem[];

    // References
    paymentId: string; // FK -> Payment.id
    deliveryId: string; // FK -> Delivery.id
}
