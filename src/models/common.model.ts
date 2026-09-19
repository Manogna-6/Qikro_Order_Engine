/**
 * Common Domain Models & Enums
 * Pure domain shapes, no UI fields.
 */

export type Role = 'customer' | 'business_owner' | 'admin';

export type HappyPathOrderStatus = 'placed' | 'accepted' | 'packing' | 'dispatched' | 'delivered';
export type ExceptionOrderStatus = 'cancelled' | 'failed' | 'returned';
export type OrderStatus = HappyPathOrderStatus | ExceptionOrderStatus;

export type PaymentStatus = 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded';

export type DeliveryStatus = 'unassigned' | 'assigned' | 'in_transit' | 'delivered' | 'returned_to_hub';

export type InventoryChangeType = 'order_placed' | 'order_cancelled' | 'restock' | 'manual_adjustment';

export interface OrderItem {
    productId: string; // FK -> Product.id
    productName: string;
    unitPrice: number; // Stored in minor currency units or standard currency (e.g. INR / USD), non-negative
    quantity: number; // Integer > 0
    totalPrice: number; // unitPrice * quantity
}

export interface StatusHistoryItem {
    status: OrderStatus;
    timestamp: string; // ISO 8601 string date
    note?: string;
    updatedBy: string; // FK -> User.id or system string 'system'
}

export interface ApiResult<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: unknown;
    };
}

export interface PaginationParams {
    page: number;
    limit: number;
    search?: string | undefined;
    statusFilter?: OrderStatus | 'all' | undefined;
    businessFilter?: string | undefined;
}

export interface PaginatedResult<T> {
    items: T[];
    total: number;
    page: number;
    totalPages: number;
}
