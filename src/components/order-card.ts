import { Order } from '../models';
import { getStatusMeta } from '../lib/order-state-machine';
import { formatCurrency } from '../lib/settlement-calculator';

export function renderOrderCard(order: Order): string {
    const meta = getStatusMeta(order.status);
    const formattedDate = new Date(order.createdAt).toLocaleString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const totalItemQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
    const firstItemName = order.items[0]?.productName || 'Items';
    const itemSummary = order.items.length > 1
        ? `${firstItemName} + ${order.items.length - 1} more item(s)`
        : `${firstItemName} (x${order.items[0]?.quantity || 1})`;

    return `
    <article 
      class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
      aria-labelledby="order-title-${order.id}"
    >
      <div>
        <!-- Top header row -->
        <div class="flex items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span id="order-title-${order.id}" class="font-mono font-bold text-slate-900 text-sm tracking-tight">
              #${order.id}
            </span>
            <span class="text-xs text-slate-400 font-mono">• ${formattedDate}</span>
          </div>
          <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full border ${meta.badgeStyle}">
            ${meta.label}
          </span>
        </div>

        <!-- Business & Customer Info -->
        <div class="mb-4 space-y-1">
          <h3 class="font-semibold text-slate-900 text-base line-clamp-1">
            ${order.businessName}
          </h3>
          <p class="text-xs text-slate-600 flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            ${order.customerName} (${order.customerPhone})
          </p>
        </div>

        <!-- Order Items Preview -->
        <div class="bg-slate-50 border border-slate-100 rounded-lg p-3 mb-4 text-xs text-slate-700">
          <div class="flex items-center justify-between text-slate-500 font-medium mb-1">
            <span>Items (${totalItemQuantity})</span>
            <span>Subtotal</span>
          </div>
          <div class="flex items-center justify-between font-semibold text-slate-800">
            <span class="truncate max-w-[200px]">${itemSummary}</span>
            <span>${formatCurrency(order.subtotal)}</span>
          </div>
        </div>
      </div>

      <!-- Card Footer -->
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Total Amount</span>
          <span class="text-base font-bold text-slate-900 font-mono">${formatCurrency(order.totalAmount)}</span>
        </div>

        <a 
          href="#orders/${order.id}" 
          class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          aria-label="View details for order ${order.id}"
        >
          View Details
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>
    </article>
  `;
}
