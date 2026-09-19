// MOCK: Mock Order Service Implementation with In-Memory State Persistence
import { Business, Order, OrderStatus, PaginatedResult, PaginationParams } from '../../models';
import { MOCK_BUSINESSES, MOCK_ORDERS, MOCK_PAYMENTS } from '../../mocks';
import { NotFoundError, ValidationError } from '../../lib/errors';
import { transitionOrder } from '../../lib/order-state-machine';
import { BusinessSettlementSummary, calculateBusinessSettlementSummary, roundCurrency } from '../../lib/settlement-calculator';
import { IOrderService } from '../interfaces';

export class MockOrderService implements IOrderService {
    // In-memory persistent state across navigation
    private orders: Order[] = [...MOCK_ORDERS];
    private businesses: Business[] = [...MOCK_BUSINESSES];

    private async simulateDelay(ms: number = 300): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async getOrders(params: PaginationParams = { page: 1, limit: 10 }): Promise<PaginatedResult<Order>> {
        await this.simulateDelay(300);

        let filtered = [...this.orders];

        // Status filtering
        if (params.statusFilter && params.statusFilter !== 'all') {
            filtered = filtered.filter(o => o.status === params.statusFilter);
        }

        // Business ID filtering
        if (params.businessFilter) {
            filtered = filtered.filter(o => o.businessId === params.businessFilter);
        }

        // Search query (Order ID, Customer Name, Customer Phone)
        if (params.search && params.search.trim() !== '') {
            const q = params.search.toLowerCase().trim();
            filtered = filtered.filter(o =>
                o.id.toLowerCase().includes(q) ||
                o.customerName.toLowerCase().includes(q) ||
                o.customerPhone.includes(q) ||
                o.businessName.toLowerCase().includes(q)
            );
        }

        // Sort chronologically descending (newest orders first)
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        const page = params.page || 1;
        const limit = params.limit || 10;
        const total = filtered.length;
        const totalPages = Math.ceil(total / limit) || 1;
        const start = (page - 1) * limit;
        const items = filtered.slice(start, start + limit);

        return {
            items,
            total,
            page,
            totalPages
        };
    }

    public async getOrderById(id: string): Promise<Order> {
        await this.simulateDelay(250);
        const order = this.orders.find(o => o.id.toUpperCase() === id.toUpperCase());
        if (!order) {
            throw new NotFoundError('Order', id);
        }
        return { ...order };
    }

    public async transitionOrderState(
        orderId: string,
        nextStatus: OrderStatus,
        updatedBy: string,
        note?: string
    ): Promise<Order> {
        await this.simulateDelay(400);
        const index = this.orders.findIndex(o => o.id.toUpperCase() === orderId.toUpperCase());
        if (index === -1) {
            throw new NotFoundError('Order', orderId);
        }

        const currentOrder = this.orders[index];
        // Leverage pure domain state machine logic
        const updatedOrder = transitionOrder(currentOrder, nextStatus, updatedBy, note);

        // Mutate in-memory store for session persistence
        this.orders[index] = updatedOrder;

        return { ...updatedOrder };
    }

    public async cancelOrder(orderId: string, reason: string): Promise<Order> {
        if (!reason || reason.trim().length === 0) {
            throw new ValidationError('A cancellation reason must be provided.');
        }
        return this.transitionOrderState(orderId, 'cancelled', 'system', `Cancellation reason: ${reason}`);
    }

    public async getSettlementSummary(businessId?: string): Promise<BusinessSettlementSummary[]> {
        await this.simulateDelay(350);

        const targetBusinesses = businessId
            ? this.businesses.filter(b => b.id === businessId)
            : this.businesses;

        return targetBusinesses.map(b => calculateBusinessSettlementSummary(b, this.orders, MOCK_PAYMENTS));
    }

    public async markSettled(
        businessId: string,
        orderIds?: string[]
    ): Promise<{ settledCount: number; totalAmountSettled: number }> {
        await this.simulateDelay(500);

        const now = new Date().toISOString();
        let count = 0;
        let totalSettled = 0;

        this.orders = this.orders.map(order => {
            const isTargetBusiness = order.businessId === businessId;
            const isTargetOrder = !orderIds || orderIds.includes(order.id);
            const isEligibleStatus = order.status === 'delivered';

            if (isTargetBusiness && isTargetOrder && isEligibleStatus && !order.isSettled) {
                count += 1;
                totalSettled += order.netPayoutAmount;

                return {
                    ...order,
                    isSettled: true,
                    settledAt: now,
                    updatedAt: now
                };
            }
            return order;
        });

        // Update business balances in memory
        const bIndex = this.businesses.findIndex(b => b.id === businessId);
        if (bIndex !== -1) {
            const b = this.businesses[bIndex];
            this.businesses[bIndex] = {
                ...b,
                settledBalance: roundCurrency(b.settledBalance + totalSettled),
                pendingBalance: roundCurrency(Math.max(0, b.pendingBalance - totalSettled)),
                updatedAt: now
            };
        }

        return {
            settledCount: count,
            totalAmountSettled: roundCurrency(totalSettled)
        };
    }

    public async getAllBusinesses(): Promise<Business[]> {
        await this.simulateDelay(200);
        return [...this.businesses];
    }
}

export const mockOrderService = new MockOrderService();
