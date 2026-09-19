import { DeliveryStatus } from './common.model';

export interface Delivery {
    id: string; // Primary Key (e.g. DEL-7001)
    orderId: string; // FK -> Order.id
    partnerName: string; // e.g. "SwiftExpress Logistics"
    trackingNumber: string; // e.g. "TRACK-88992"
    status: DeliveryStatus;
    estimatedDeliveryTime: string; // ISO 8601 string date
    agentName?: string;
    agentPhone?: string;
    deliveryAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        landmark?: string;
    };
    assignedAt?: string; // ISO 8601 string date
    dispatchedAt?: string; // ISO 8601 string date
    deliveredAt?: string; // ISO 8601 string date
}
