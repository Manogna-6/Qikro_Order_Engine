import { Order, OrderStatus, PaginatedResult, PaginationParams, Business } from '../../models';
import { BusinessSettlementSummary } from '../../lib/settlement-calculator';

export interface IOrderService {
    getOrders(params?: PaginationParams): Promise<PaginatedResult<Order>>;
    getOrderById(id: string): Promise<Order>;
    transitionOrderState(orderId: string, nextStatus: OrderStatus, updatedBy: string, note?: string): Promise<Order>;
    cancelOrder(orderId: string, reason: string): Promise<Order>;
    getSettlementSummary(businessId?: string): Promise<BusinessSettlementSummary[]>;
    markSettled(businessId: string, orderIds?: string[]): Promise<{ settledCount: number; totalAmountSettled: number }>;
    getAllBusinesses(): Promise<Business[]>;
}
