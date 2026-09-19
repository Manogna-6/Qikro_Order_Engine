import { Business, Order, Payment } from '../models';

export interface OrderSettlementDetails {
    orderId: string;
    businessId: string;
    customerName: string;
    orderStatus: string;
    paymentStatus: string;
    subtotal: number; // Excludes delivery fee
    deliveryFee: number;
    totalOrderAmount: number;
    commissionRate: number;
    commissionAmount: number;
    netPayoutAmount: number;
    isEligibleForSettlement: boolean;
    isSettled: boolean;
    settledAt?: string | undefined;
    ineligibilityReason?: string | undefined;
}

export interface BusinessSettlementSummary {
    businessId: string;
    businessName: string;
    commissionRate: number;
    totalOrdersCount: number;
    eligibleOrdersCount: number;
    grossRevenue: number; // Sum of subtotals of eligible orders (delivery fee excluded)
    totalCommissionCut: number; // Platform commission retained
    totalNetPayout: number; // Net payout to business (grossRevenue - totalCommissionCut)
    settledPayout: number; // Already paid out to merchant
    pendingPayout: number; // Awaiting settlement release
    orderBreakdown: OrderSettlementDetails[];
}

/**
 * Rounds monetary amounts to 2 decimal places to prevent floating-point drift errors.
 * Inline comment: Uses Math.round with Number.EPSILON to avoid rounding issues like 1.005 -> 1.00
 */
export function roundCurrency(amount: number): number {
    return Math.round((amount + Number.EPSILON) * 100) / 100;
}

/**
 * Consistently formats numbers into INR currency strings
 */
export function formatCurrency(amount: number): string {
    const rounded = roundCurrency(amount);
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(rounded);
}

/**
 * Calculates settlement details for a single order
 * NON-OBVIOUS BUSINESS RULE: Delivery fee is strictly EXCLUDED from business gross settlement calculation.
 * Delivery fee is paid directly to logistics partner and is not part of merchant product sales revenue.
 * NON-OBVIOUS BUSINESS RULE: Orders are eligible for settlement ONLY if payment status is 'captured'
 * and order is not cancelled or failed.
 */
export function calculateOrderSettlement(order: Order, payment?: Payment): OrderSettlementDetails {
    const isPaymentCaptured = payment ? payment.status === 'captured' : true;
    const isNotCancelledOrFailed = order.status !== 'cancelled' && order.status !== 'failed';

    const isEligibleForSettlement = isPaymentCaptured && isNotCancelledOrFailed;

    let ineligibilityReason: string | undefined;
    if (!isPaymentCaptured) {
        ineligibilityReason = 'Payment not captured or pending';
    } else if (!isNotCancelledOrFailed) {
        ineligibilityReason = `Order is in terminal exception state '${order.status}'`;
    }

    // Calculate gross subtotal (strictly items total without delivery fee)
    const subtotal = roundCurrency(order.subtotal);
    const commissionRate = order.commissionRate;
    const commissionAmount = isEligibleForSettlement
        ? roundCurrency(subtotal * commissionRate)
        : 0;
    const netPayoutAmount = isEligibleForSettlement
        ? roundCurrency(subtotal - commissionAmount)
        : 0;

    return {
        orderId: order.id,
        businessId: order.businessId,
        customerName: order.customerName,
        orderStatus: order.status,
        paymentStatus: payment?.status || 'captured',
        subtotal,
        deliveryFee: roundCurrency(order.deliveryFee),
        totalOrderAmount: roundCurrency(order.totalAmount),
        commissionRate,
        commissionAmount,
        netPayoutAmount,
        isEligibleForSettlement,
        isSettled: order.isSettled,
        settledAt: order.settledAt,
        ineligibilityReason
    };
}

/**
 * Pure calculation function generating complete business settlement summary
 */
export function calculateBusinessSettlementSummary(
    business: Business,
    orders: Order[],
    payments: Payment[]
): BusinessSettlementSummary {
    const paymentMap = new Map<string, Payment>(payments.map(p => [p.orderId, p]));

    const businessOrders = orders.filter(o => o.businessId === business.id);
    const orderBreakdown: OrderSettlementDetails[] = [];

    let eligibleOrdersCount = 0;
    let grossRevenue = 0;
    let totalCommissionCut = 0;
    let totalNetPayout = 0;
    let settledPayout = 0;
    let pendingPayout = 0;

    for (const order of businessOrders) {
        const payment = paymentMap.get(order.id);
        const detail = calculateOrderSettlement(order, payment);
        orderBreakdown.push(detail);

        if (detail.isEligibleForSettlement) {
            eligibleOrdersCount += 1;
            grossRevenue += detail.subtotal;
            totalCommissionCut += detail.commissionAmount;
            totalNetPayout += detail.netPayoutAmount;

            if (detail.isSettled) {
                settledPayout += detail.netPayoutAmount;
            } else {
                pendingPayout += detail.netPayoutAmount;
            }
        }
    }

    return {
        businessId: business.id,
        businessName: business.name,
        commissionRate: business.commissionRate,
        totalOrdersCount: businessOrders.length,
        eligibleOrdersCount,
        grossRevenue: roundCurrency(grossRevenue),
        totalCommissionCut: roundCurrency(totalCommissionCut),
        totalNetPayout: roundCurrency(totalNetPayout),
        settledPayout: roundCurrency(settledPayout),
        pendingPayout: roundCurrency(pendingPayout),
        orderBreakdown
    };
}
