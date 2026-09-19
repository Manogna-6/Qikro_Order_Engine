import { BusinessSettlementSummary, formatCurrency } from '../lib/settlement-calculator';
import { getStatusMeta } from '../lib/order-state-machine';

export function renderSettlementCard(summary: BusinessSettlementSummary, isExpanded: boolean = false): string {
    const isFullySettled = summary.pendingPayout === 0 && summary.settledPayout > 0;
    const commissionPercentage = Math.round(summary.commissionRate * 100);

    return `
    <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden" id="settlement-card-${summary.businessId}">
      <!-- Business Header & Summary Grid -->
      <div class="p-6 border-b border-slate-100">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-slate-900 text-lg">${summary.businessName}</h3>
              <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                ${commissionPercentage}% Commission Cut
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">
              ${summary.eligibleOrdersCount} of ${summary.totalOrdersCount} orders eligible for payout settlement
            </p>
          </div>

          <div class="flex items-center gap-3">
            ${isFullySettled ? `
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                Fully Settled
              </span>
            ` : `
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Pending Release
              </span>
            `}

            ${summary.pendingPayout > 0 ? `
              <button
                type="button"
                data-action="mark-settled"
                data-business-id="${summary.businessId}"
                class="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-indigo-500"
              >
                Release Payout (${formatCurrency(summary.pendingPayout)})
              </button>
            ` : ''}
          </div>
        </div>

        <!-- 4 Stat Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Gross Product Sales -->
          <div class="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Gross Product Revenue
            </span>
            <span class="text-xl font-bold text-slate-900 font-mono">
              ${formatCurrency(summary.grossRevenue)}
            </span>
            <span class="text-[11px] text-slate-400 block mt-1">Excludes delivery fees</span>
          </div>

          <!-- Platform Commission Cut (Slate Neutral - Non alarming) -->
          <div class="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Platform Commission (${commissionPercentage}%)
            </span>
            <span class="text-xl font-bold text-slate-500 font-mono">
              -${formatCurrency(summary.totalCommissionCut)}
            </span>
            <span class="text-[11px] text-slate-400 block mt-1">Platform service fee</span>
          </div>

          <!-- Net Merchant Payout -->
          <div class="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Total Net Payout
            </span>
            <span class="text-xl font-bold text-emerald-600 font-mono">
              ${formatCurrency(summary.totalNetPayout)}
            </span>
            <span class="text-[11px] text-emerald-700 block mt-1 font-medium">Merchant earnings</span>
          </div>

          <!-- Pending vs Settled Split -->
          <div class="bg-slate-50 border border-slate-100 rounded-lg p-4">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Pending Payout
            </span>
            <span class="text-xl font-bold ${summary.pendingPayout > 0 ? 'text-amber-600' : 'text-slate-400'} font-mono">
              ${formatCurrency(summary.pendingPayout)}
            </span>
            <span class="text-[11px] text-slate-500 block mt-1">
              Already settled: <strong class="text-slate-700 font-mono">${formatCurrency(summary.settledPayout)}</strong>
            </span>
          </div>
        </div>
      </div>

      <!-- Expandable Breakdown Bar -->
      <div class="bg-slate-50/70 px-6 py-3 border-b border-slate-100 flex items-center justify-between">
        <button
          type="button"
          data-action="toggle-breakdown"
          data-business-id="${summary.businessId}"
          class="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 transition-colors focus:outline-none"
          aria-expanded="${isExpanded}"
        >
          <svg class="w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
          ${isExpanded ? 'Hide Order Breakdown' : `View Itemized Breakdown (${summary.orderBreakdown.length} Orders)`}
        </button>

        <span class="text-[11px] text-slate-400 font-medium">
          Calculation Rule: Subtotal - Commission Cut = Net Payout
        </span>
      </div>

      <!-- Itemized Order Table (Collapsible) -->
      ${isExpanded ? `
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-100 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th class="px-6 py-3">Order ID</th>
                <th class="px-6 py-3">Customer</th>
                <th class="px-6 py-3">Status</th>
                <th class="px-6 py-3 text-right">Items Subtotal</th>
                <th class="px-6 py-3 text-right">Delivery Fee</th>
                <th class="px-6 py-3 text-right">Commission Cut</th>
                <th class="px-6 py-3 text-right">Net Payout</th>
                <th class="px-6 py-3 text-center">Settlement Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 bg-white">
              ${summary.orderBreakdown.map(order => {
        const statusMeta = getStatusMeta(order.orderStatus as any);
        return `
                  <tr class="hover:bg-slate-50/80 transition-colors ${!order.isEligibleForSettlement ? 'bg-slate-50/40 text-slate-400' : ''}">
                    <td class="px-6 py-3 font-mono font-bold text-slate-900">
                      <a href="#orders/${order.orderId}" class="text-indigo-600 hover:underline">#${order.orderId}</a>
                    </td>
                    <td class="px-6 py-3 font-medium">${order.customerName}</td>
                    <td class="px-6 py-3">
                      <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full border ${statusMeta.badgeStyle}">
                        ${statusMeta.label}
                      </span>
                    </td>
                    <td class="px-6 py-3 text-right font-mono font-medium">${formatCurrency(order.subtotal)}</td>
                    <td class="px-6 py-3 text-right font-mono text-slate-400">
                      ${formatCurrency(order.deliveryFee)}
                      <span class="text-[9px] block text-slate-400">(Excluded)</span>
                    </td>
                    <td class="px-6 py-3 text-right font-mono text-slate-500">
                      -${formatCurrency(order.commissionAmount)}
                    </td>
                    <td class="px-6 py-3 text-right font-mono font-bold ${order.isEligibleForSettlement ? 'text-emerald-600' : 'text-slate-400'}">
                      ${formatCurrency(order.netPayoutAmount)}
                    </td>
                    <td class="px-6 py-3 text-center">
                      ${order.isSettled ? `
                        <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Settled
                        </span>
                      ` : order.isEligibleForSettlement ? `
                        <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          Pending
                        </span>
                      ` : `
                        <span class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-100 text-slate-500 border border-slate-200" title="${order.ineligibilityReason}">
                          Ineligible
                        </span>
                      `}
                    </td>
                  </tr>
                `;
    }).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}
    </div>
  `;
}
