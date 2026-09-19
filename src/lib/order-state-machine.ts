import { Order, OrderStatus, StatusHistoryItem } from '../models';
import { InvalidTransitionError } from './errors';

/**
 * Order State Transition Rules Graph
 * Business Rule: Cancellation is strictly allowed ONLY before dispatch.
 * Business Rule: Returns are strictly allowed ONLY after delivery.
 * Business Rule: Cancelled, Failed, and Returned are terminal exception states.
 */
const TRANSITION_GRAPH: Record<OrderStatus, OrderStatus[]> = {
    placed: ['accepted', 'cancelled'],
    accepted: ['packing', 'cancelled'],
    packing: ['dispatched', 'cancelled'],
    dispatched: ['delivered', 'failed'],
    delivered: ['returned'],
    cancelled: [], // Terminal State
    failed: [],    // Terminal State
    returned: []   // Terminal State
};

export function getHappyPathSequence(): OrderStatus[] {
    return ['placed', 'accepted', 'packing', 'dispatched', 'delivered'];
}

export function canTransition(currentStatus: OrderStatus, nextStatus: OrderStatus): boolean {
    const allowedNext = TRANSITION_GRAPH[currentStatus] || [];
    return allowedNext.includes(nextStatus);
}

export function getValidNextStates(currentStatus: OrderStatus): OrderStatus[] {
    return TRANSITION_GRAPH[currentStatus] || [];
}

export function isTerminalState(status: OrderStatus): boolean {
    return (TRANSITION_GRAPH[status] || []).length === 0;
}

/**
 * Calculates completion percentage (0 - 100) for visual progress indicators
 */
export function getStatusProgress(status: OrderStatus): number {
    switch (status) {
        case 'placed': return 20;
        case 'accepted': return 40;
        case 'packing': return 60;
        case 'dispatched': return 80;
        case 'delivered': return 100;
        case 'cancelled': return 0;
        case 'failed': return 0;
        case 'returned': return 100;
        default: return 0;
    }
}

export interface StatusMeta {
    label: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
    badgeStyle: string;
    description: string;
}

/**
 * UI Metadata helper mapping status to design system token classes
 */
export function getStatusMeta(status: OrderStatus): StatusMeta {
    switch (status) {
        case 'placed':
            return {
                label: 'Order Placed',
                bgClass: 'bg-blue-50',
                textClass: 'text-blue-700',
                borderClass: 'border-blue-200',
                badgeStyle: 'bg-blue-50 text-blue-700 border border-blue-200',
                description: 'Customer has placed the order. Awaiting merchant confirmation.'
            };
        case 'accepted':
            return {
                label: 'Accepted',
                bgClass: 'bg-indigo-50',
                textClass: 'text-indigo-700',
                borderClass: 'border-indigo-200',
                badgeStyle: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
                description: 'Merchant accepted the order and sent to kitchen/warehouse.'
            };
        case 'packing':
            return {
                label: 'Packing',
                bgClass: 'bg-amber-50',
                textClass: 'text-amber-700',
                borderClass: 'border-amber-200',
                badgeStyle: 'bg-amber-50 text-amber-700 border border-amber-200',
                description: 'Items are being packed and verified for dispatch.'
            };
        case 'dispatched':
            return {
                label: 'Dispatched',
                bgClass: 'bg-sky-50',
                textClass: 'text-sky-700',
                borderClass: 'border-sky-200',
                badgeStyle: 'bg-sky-50 text-sky-700 border border-sky-200',
                description: 'Order handed over to delivery partner and in transit.'
            };
        case 'delivered':
            return {
                label: 'Delivered',
                bgClass: 'bg-emerald-50',
                textClass: 'text-emerald-700',
                borderClass: 'border-emerald-200',
                badgeStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
                description: 'Order successfully delivered to customer address.'
            };
        case 'cancelled':
            return {
                label: 'Cancelled',
                bgClass: 'bg-red-50',
                textClass: 'text-red-700',
                borderClass: 'border-red-200',
                badgeStyle: 'bg-red-50 text-red-700 border border-red-200',
                description: 'Order was cancelled prior to dispatch. Refund initiated if applicable.'
            };
        case 'failed':
            return {
                label: 'Delivery Failed',
                bgClass: 'bg-rose-50',
                textClass: 'text-rose-700',
                borderClass: 'border-rose-200',
                badgeStyle: 'bg-rose-50 text-rose-700 border border-rose-200',
                description: 'Delivery attempt failed due to customer absence or address issue.'
            };
        case 'returned':
            return {
                label: 'Returned',
                bgClass: 'bg-purple-50',
                textClass: 'text-purple-700',
                borderClass: 'border-purple-200',
                badgeStyle: 'bg-purple-50 text-purple-700 border border-purple-200',
                description: 'Customer requested return post-delivery. Package returned to warehouse.'
            };
    }
}

/**
 * Pure, immutable function to transition an order to a new valid state.
 * Throws InvalidTransitionError if transition is not allowed.
 */
export function transitionOrder(
    order: Order,
    nextStatus: OrderStatus,
    updatedBy: string,
    note?: string
): Order {
    if (!canTransition(order.status, nextStatus)) {
        throw new InvalidTransitionError(order.status, nextStatus);
    }

    const now = new Date().toISOString();

    const newHistoryItem: StatusHistoryItem = {
        status: nextStatus,
        timestamp: now,
        updatedBy,
        note: note || `Order status updated from '${order.status}' to '${nextStatus}'`
    };

    return {
        ...order,
        status: nextStatus,
        updatedAt: now,
        statusHistory: [...order.statusHistory, newHistoryItem]
    };
}
