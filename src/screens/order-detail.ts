import { Order, OrderStatus, Payment, Delivery } from '../models';
import { api } from '../services/api-client';
import { getStatusMeta, getValidNextStates, isTerminalState } from '../lib/order-state-machine';
import { formatCurrency } from '../lib/settlement-calculator';
import { renderStatusStepper } from '../components/status-stepper';
import { renderOrderDetailSkeleton } from '../components/loading-skeleton';
import { renderErrorBanner } from '../components/error-banner';
import { renderEmptyState } from '../components/empty-state';
import { sessionStore } from '../state/session.store';

export class OrderDetailScreen {
  private container: HTMLElement;
  private orderId: string;
  private order: Order | null = null;
  private payment: Payment | null = null;
  private delivery: Delivery | null = null;
  private isLoading: boolean = true;
  private isActionSubmitting: boolean = false;
  private errorMessage: string | null = null;

  constructor(container: HTMLElement, orderId: string) {
    this.container = container;
    this.orderId = orderId;
  }

  public async loadData(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;
    this.render();

    try {
      this.order = await api.orders.getOrderById(this.orderId);

      try {
        this.payment = await api.payments.getPaymentByOrderId(this.orderId);
      } catch {
        this.payment = null;
      }

      try {
        this.delivery = await api.deliveries.getDeliveryByOrderId(this.orderId);
      } catch {
        this.delivery = null;
      }
    } catch (err: any) {
      this.errorMessage = err.message || `Failed to load order #${this.orderId}.`;
    } finally {
      this.isLoading = false;
      this.render();
    }
  }

  public render(): void {
    if (this.isLoading) {
      this.container.innerHTML = renderOrderDetailSkeleton();
      return;
    }

    if (this.errorMessage || !this.order) {
      this.container.innerHTML = `
        <div class="space-y-4">
          <a href="#orders" class="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline">
            ← Back to Orders Engine
          </a>
          ${renderErrorBanner({
        title: 'Order Detail Error',
        message: this.errorMessage || `Order #${this.orderId} was not found.`,
        onRetry: () => this.loadData()
      })}
          ${!this.order ? renderEmptyState({
        title: 'Order Not Found',
        description: `The requested order ID #${this.orderId} does not exist in the domain engine.`,
        actionText: 'Back to Orders List'
      }) : ''}
        </div>
      `;
      this.attachEvents();
      return;
    }

    const order = this.order;
    const meta = getStatusMeta(order.status);
    const validNextStates = getValidNextStates(order.status);
    const isTerminal = isTerminalState(order.status);

    const formattedCreatedDate = new Date(order.createdAt).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    this.container.innerHTML = `
      <div class="space-y-6 max-w-5xl mx-auto">
        <!-- Breadcrumbs Navigation -->
        <nav class="flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
          <a href="#orders" class="hover:text-indigo-600 transition-colors font-medium">Orders Engine</a>
          <span class="text-slate-300">/</span>
          <span class="font-mono text-slate-900 font-bold">#${order.id}</span>
        </nav>

        <!-- Header Title Bar -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-3">
              <h1 class="text-2xl font-bold font-mono text-slate-900 tracking-tight">
                Order #${order.id}
              </h1>
              <span class="px-3 py-1 text-xs font-semibold rounded-full border ${meta.badgeStyle}">
                ${meta.label}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              Created on <strong class="text-slate-700">${formattedCreatedDate}</strong> • Business: <strong class="text-slate-700">${order.businessName}</strong>
            </p>
          </div>

          <div class="text-start sm:text-end">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Order Amount</span>
            <span class="text-2xl font-bold text-slate-900 font-mono">${formatCurrency(order.totalAmount)}</span>
          </div>
        </div>

        <!-- Action Error Banner -->
        ${this.errorMessage ? renderErrorBanner({
      title: 'Transition Failed',
      message: this.errorMessage,
      onDismiss: () => {
        this.errorMessage = null;
        this.render();
      }
    }) : ''}

        <!-- Order State Stepper -->
        ${renderStatusStepper(order)}

        <!-- Admin / Merchant State Machine Action Control Panel -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h3 class="font-semibold text-slate-900 text-sm">State Machine Control Panel</h3>
              <p class="text-xs text-slate-500">Allowed status transitions strictly dictated by business logic graph</p>
            </div>
            <span class="text-xs font-mono text-slate-400">Current State: [ ${order.status.toUpperCase()} ]</span>
          </div>

          ${isTerminal ? `
            <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <span class="text-xs font-semibold text-slate-700 block">
                🔒 Order is in terminal state <strong class="uppercase text-slate-900">${order.status}</strong>.
              </span>
              <p class="text-[11px] text-slate-500 mt-0.5">
                No further state machine transitions are allowed for this lifecycle instance.
              </p>
            </div>
          ` : `
            <div class="space-y-3">
              <span class="text-xs font-semibold text-slate-700 block">
                Available Next State Transitions:
              </span>
              <div class="flex flex-wrap gap-3">
                ${validNextStates.map(nextState => {
      const nextMeta = getStatusMeta(nextState);
      const isCancel = nextState === 'cancelled';

      return `
                    <button
                      type="button"
                      data-action="transition-btn"
                      data-target-status="${nextState}"
                      ${this.isActionSubmitting ? 'disabled' : ''}
                      class="px-4 py-2 text-xs font-bold rounded-lg shadow-sm transition-all focus:ring-2 disabled:opacity-50 flex items-center gap-1.5 ${isCancel
          ? 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500'
          : 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500'
        }"
                    >
                      ${this.isActionSubmitting ? `
                        <svg class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      ` : ''}
                      Transition to "${nextMeta.label}"
                    </button>
                  `;
    }).join('')}
              </div>
            </div>
          `}
        </div>

        <!-- 2 Column Details Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Left 2 Cols: Order Items Table -->
          <div class="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 class="font-semibold text-slate-900 text-base mb-4">
              Itemized Order Summary (${order.items.reduce((s, i) => s + i.quantity, 0)} items)
            </h3>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-slate-700">
                <thead class="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th class="px-4 py-3">Product Name</th>
                    <th class="px-4 py-3 text-right">Unit Price</th>
                    <th class="px-4 py-3 text-center">Qty</th>
                    <th class="px-4 py-3 text-right">Line Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${order.items.map(item => `
                    <tr>
                      <td class="px-4 py-3 font-semibold text-slate-900">${item.productName}</td>
                      <td class="px-4 py-3 text-right font-mono">${formatCurrency(item.unitPrice)}</td>
                      <td class="px-4 py-3 text-center font-mono font-bold">${item.quantity}</td>
                      <td class="px-4 py-3 text-right font-mono font-bold text-slate-900">${formatCurrency(item.totalPrice)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Financial Breakdown Table -->
            <div class="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs max-w-xs ms-auto">
              <div class="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span class="font-mono font-semibold">${formatCurrency(order.subtotal)}</span>
              </div>
              <div class="flex justify-between text-slate-600">
                <span>Delivery Logistics Fee</span>
                <span class="font-mono font-semibold">${formatCurrency(order.deliveryFee)}</span>
              </div>
              <div class="flex justify-between text-slate-500 text-[11px]">
                <span>Platform Commission (${Math.round(order.commissionRate * 100)}%)</span>
                <span class="font-mono">-${formatCurrency(order.commissionAmount)}</span>
              </div>
              <div class="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                <span>Total Amount Paid</span>
                <span class="font-mono">${formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          <!-- Right Col: Payment & Logistics Cards -->
          <div class="space-y-6">
            <!-- Payment Card -->
            <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 class="font-semibold text-slate-900 text-sm">Payment Details</h3>
                <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  ${this.payment?.provider || 'UPI'}
                </span>
              </div>
              
              <div class="space-y-3 text-xs">
                <div>
                  <span class="text-slate-400 block text-[11px]">Transaction Ref ID</span>
                  <span class="font-mono font-bold text-slate-900">${this.payment?.transactionRef || 'N/A'}</span>
                </div>
                <div>
                  <span class="text-slate-400 block text-[11px]">Payment Status</span>
                  <span class="font-semibold capitalize text-emerald-600">${this.payment?.status || 'captured'}</span>
                </div>
                <div>
                  <span class="text-slate-400 block text-[11px]">Amount Captured</span>
                  <span class="font-mono font-bold text-slate-900">${formatCurrency(this.payment?.amount || order.totalAmount)}</span>
                </div>
              </div>
            </div>

            <!-- Delivery Logistics Card -->
            <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 class="font-semibold text-slate-900 text-sm">Delivery Partner</h3>
                <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  ${this.delivery?.partnerName || 'Logistics'}
                </span>
              </div>

              <div class="space-y-3 text-xs">
                <div>
                  <span class="text-slate-400 block text-[11px]">Tracking Number</span>
                  <span class="font-mono font-bold text-indigo-600">${this.delivery?.trackingNumber || 'SE-990011'}</span>
                </div>
                <div>
                  <span class="text-slate-400 block text-[11px]">Delivery Driver Agent</span>
                  <span class="font-semibold text-slate-800">${this.delivery?.agentName || 'Assigned Driver'} (${this.delivery?.agentPhone || '+919811223344'})</span>
                </div>
                <div>
                  <span class="text-slate-400 block text-[11px]">Destination Address</span>
                  <span class="text-slate-700 leading-snug block">
                    ${this.delivery?.deliveryAddress.street}, ${this.delivery?.deliveryAddress.city} - ${this.delivery?.deliveryAddress.postalCode}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents(): void {
    const transitionBtns = this.container.querySelectorAll('[data-action="transition-btn"]');
    transitionBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const nextStatus = (e.currentTarget as HTMLElement).getAttribute('data-target-status') as OrderStatus;
        if (nextStatus) {
          await this.executeTransition(nextStatus);
        }
      });
    });

    const emptyBtn = this.container.querySelector('[data-action="empty-state-btn"]');
    if (emptyBtn) {
      emptyBtn.addEventListener('click', () => {
        window.location.hash = '#orders';
      });
    }
  }

  private async executeTransition(nextStatus: OrderStatus): Promise<void> {
    this.isActionSubmitting = true;
    this.errorMessage = null;
    this.render();

    try {
      const currentUser = sessionStore.getCurrentUser();
      const updatedBy = currentUser?.id || 'system';

      let note: string | undefined;
      if (nextStatus === 'cancelled') {
        note = prompt('Please enter a cancellation note (optional):') || 'Cancelled by admin/merchant via control panel';
      }

      this.order = await api.orders.transitionOrderState(this.orderId, nextStatus, updatedBy, note);
    } catch (err: any) {
      this.errorMessage = err.message || `Failed to transition order state to '${nextStatus}'.`;
    } finally {
      this.isActionSubmitting = false;
      this.render();
    }
  }
}
